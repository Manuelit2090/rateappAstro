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
 *   2. `reviewId` lo lleno con el mismo id autoincremental convertido a string (podrías
 *      usar otro formato, ej. un slug único, si lo prefieres).
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
import pool from '../../lib/db';
import { verifyToken } from '../../lib/auth';

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

    const { business_id, rating, content, reviewItem } = await request.json() as {
      business_id: number;
      rating: number;
      content: string;
      reviewItem?: ReviewItem[];
    };

    if (!business_id || !rating || rating < 1 || rating > 5) {
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

    // Verificar que el restaurante existe y traer su slug + reviews actuales
    const [restaurants] = await pool.execute(
      'SELECT id, slug, reviews FROM restaurants WHERE id = ?',
      [business_id]
    ) as any[];

    if (!restaurants.length) {
      return new Response(
        JSON.stringify({ error: 'Restaurante no encontrado' }),
        { status: 404 }
      );
    }
    const restaurant = restaurants[0];

    // Insertar la reseña
    const [insertResult] = await pool.execute(
      `INSERT INTO reviews (reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, restaurant_id, reviewItem)
       VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
      [
        restaurant.slug,
        rating,
        content ?? '',
        reviewUser,
        business_id,
        reviewItem && reviewItem.length ? JSON.stringify(reviewItem) : null
      ]
    ) as any[];

    const newReviewId = insertResult.insertId;

    // Guardar reviewId (string) en la propia fila
    await pool.execute(
      'UPDATE reviews SET reviewId = ? WHERE id = ?',
      [String(newReviewId), newReviewId]
    );

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

    return new Response(
      JSON.stringify({ message: 'Reseña creada exitosamente', reviewId: newReviewId }),
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
    const businessId = url.searchParams.get('business_id');

    if (!businessId) {
      return new Response(
        JSON.stringify({ error: 'business_id requerido' }),
        { status: 400 }
      );
    }

    const [rows] = await pool.execute(
      `SELECT reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, reviewItem
       FROM reviews
       WHERE restaurant_id = ?
       ORDER BY reviewDate DESC`,
      [businessId]
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