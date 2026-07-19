/**
 * @file reviews.ts
 * @description Endpoints para crear y obtener reseñas. POST otorga 10 puntos automáticamente.
 * @route GET /api/reviews?business_id=1
 * @route POST /api/reviews
 * @dependencies src/lib/db, src/lib/auth
 *
 * NOTA: Ajustado al esquema real:
 *   - reviews: id, reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, restaurant_id
 *   - restaurants: ..., rating (decimal), reviews (json array de ids de reviews)
 *
 * Supuestos que hice (revísalos):
 *   1. `reviewUser` guarda el NOMBRE del usuario (no su id), así que hago un SELECT a `users`
 *      para traer el nombre. Asumí que la columna se llama `name`. Si se llama distinto
 *      (ej. `username`), cámbialo en la query de `users`.
 *   2. `reviewId` es NOT NULL sin default en la BD, así que se genera con crypto.randomUUID()
 *      ANTES del insert y se manda directo en el INSERT (no se puede llenar después, porque
 *      el insert fallaría primero por el NOT NULL).
 *   3. `reviewSlug` lo lleno con el slug del restaurante (denormalizado), tomado de la
 *      tabla `restaurants`.
 *   4. Como no hay `customer_id` en `reviews`, no puedo detectar de forma confiable si un
 *      usuario ya reseñó ese restaurante (solo podría comparar por `reviewUser`, que no es
 *      único). Dejé el POST como "siempre inserta". Si quieres evitar reseñas duplicadas por
 *      usuario, lo ideal sería agregar una columna `customer_id` a `reviews`.
 *   5. `restaurants.reviews` (json) lo trato como un array de ids de reviews y le hago push
 *      del nuevo id tras insertar.
 *   6. `reviewItem` (array de { item, total }) NO aparece en la captura de la tabla `reviews`.
 *      Asumo que necesitas una columna `reviewItem JSON NULL` en `reviews` para guardarlo.
 *      Si ya existe con otro nombre, ajusta las queries. El POST y el GET ya lo soportan
 *      como opcional (si no se envía, se guarda NULL y se devuelve como array vacío).
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

interface ReviewItem {
  item: string;
  total: number;
}

interface Review {
  reviewId: string;
  reviewSlug: string;
  reviewStar: number;
  reviewText: string;
  reviewUser: string;
  reviewDate: Date;
  reviewItem?: ReviewItem[];
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get('auth_token')?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'No autenticado' }),
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { status: 401 }
      );
    }

    const { restaurantSlug, rating, content, reviewItem } = await request.json() as {
      restaurantSlug: string;
      rating: number;
      content: string;
      reviewItem?: ReviewItem[];
    };

    if (!restaurantSlug || !rating || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos' }),
        { status: 400 }
      );
    }

    // Verificar que el usuario existe y traer su nombre (para reviewUser)
    const [users] = await pool.execute(
      'SELECT id, name FROM users WHERE id = ?',
      [payload.id]
    ) as any[];

    if (!users.length) {
      return new Response(
        JSON.stringify({ error: 'Cliente no encontrado' }),
        { status: 404 }
      );
    }
    const reviewUser = users[0].name;

    // Verificar que el restaurante existe (resolvemos el id a partir del slug) y traer sus reviews actuales
    const [restaurants] = await pool.execute(
      'SELECT id, slug, reviews FROM restaurants WHERE slug = ?',
      [restaurantSlug]
    ) as any[];

    if (!restaurants.length) {
      return new Response(
        JSON.stringify({ error: 'Restaurante no encontrado' }),
        { status: 404 }
      );
    }
    const restaurant = restaurants[0];
    const business_id = restaurant.id;

    // reviewId debe ir en el INSERT porque la columna es NOT NULL sin default.
    // Como todavía no existe el id autoincremental, generamos un identificador único aparte.
    const reviewId = crypto.randomUUID();

    // Insertar la reseña
    const [insertResult] = await pool.execute(
      `INSERT INTO reviews (reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, restaurant_id, reviewItem)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [
        reviewId,
        restaurant.slug,
        rating,
        content ?? '',
        reviewUser,
        business_id,
        reviewItem && reviewItem.length ? JSON.stringify(reviewItem) : null
      ]
    ) as any[];

    const newReviewId = insertResult.insertId;

    // Actualizar el array json `reviews` en restaurants
    let currentReviews: number[] = [];
    if (restaurant.reviews) {
      try {
        currentReviews = typeof restaurant.reviews === 'string'
          ? JSON.parse(restaurant.reviews)
          : restaurant.reviews;
      } catch {
        currentReviews = [];
      }
    }
    currentReviews.push(newReviewId);

    // Actualizar promedio de rating del negocio
    const [avgResult] = await pool.execute(
      'SELECT AVG(reviewStar) as avg_rating FROM reviews WHERE restaurant_id = ?',
      [business_id]
    ) as any[];

    await pool.execute(
      'UPDATE restaurants SET rating = ?, reviews = ? WHERE id = ?',
      [avgResult[0].avg_rating, JSON.stringify(currentReviews), business_id]
    );

    // Otorgar puntos al cliente (10 puntos por reseña)
    await pool.execute(
      'UPDATE users SET totalPoints = totalPoints + 10 WHERE id = ?',
      [payload.id]
    );
    await pool.execute(
      'UPDATE users SET totalReviews = totalReviews + 1 WHERE id = ?',
      [payload.id]
    );
    return new Response(
      JSON.stringify({ message: 'Reseña creada exitosamente', reviewId }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al crear reseña:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug'); // antes: 'business_slug' — no coincide con lo que envía el componente

    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'slug requerido' }),
        { status: 400 }
      );
    }

    // 1. Buscar el restaurante por slug y traer su array de ids de reviews
    const [restaurants] = await pool.execute(
      'SELECT id, reviews FROM restaurants WHERE slug = ?',
      [slug]
    ) as any[];

    if (!restaurants.length) {
      return new Response(
        JSON.stringify({ error: 'Restaurante no encontrado' }),
        { status: 404 }
      );
    }

    let reviewIds: number[] = [];
    if (restaurants[0].reviews) {
      try {
        reviewIds = typeof restaurants[0].reviews === 'string'
          ? JSON.parse(restaurants[0].reviews)
          : restaurants[0].reviews;
      } catch {
        reviewIds = [];
      }
    }

    if (!reviewIds.length) {
      return new Response(JSON.stringify({ reviews: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Traer esas reviews puntuales por id
    const placeholders = reviewIds.map(() => '?').join(', ');
    const [rows] = await pool.execute(
      `SELECT reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, reviewItem
       FROM reviews
       WHERE id IN (${placeholders})
       ORDER BY reviewDate DESC`,
      reviewIds
    ) as any[];

    const reviews: Review[] = rows.map((row: any) => ({
      reviewId: String(row.reviewId),
      reviewSlug: row.reviewSlug,
      reviewStar: row.reviewStar,
      reviewText: row.reviewText,
      reviewUser: row.reviewUser,
      reviewDate: row.reviewDate,
      reviewItem: row.reviewItem
        ? (typeof row.reviewItem === 'string' ? JSON.parse(row.reviewItem) : row.reviewItem)
        : []
    }));

    return new Response(JSON.stringify({ reviews }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};