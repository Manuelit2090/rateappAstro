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

const REVIEW_POINTS_REWARD = 10;

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function userHasReviewedRestaurant(userId: number, restaurantId: number): Promise<boolean> {
  try {
    const [rows] = await pool.execute(
      'SELECT COUNT(*) AS total FROM reviews WHERE reviewUser = ? AND restaurant_id = ?',
      [String(userId), restaurantId]
    ) as any[];

    const total = Number(rows?.[0]?.total ?? 0);
    return total > 0;
  } catch (error) {
    console.error('Error validando reseñas previas del usuario:', error);
    throw error;
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get('auth_token')?.value;

    if (!token) {
      return jsonError('No autenticado', 401);
    }

    const payload = verifyToken(token);
    if (!payload) {
      return jsonError('Token inválido', 401);
    }

    const jsonBody = await request.json().catch(() => null);
    if (!jsonBody || typeof jsonBody !== 'object') {
      return jsonError('JSON inválido', 400);
    }

    const { business_id, rating, content, reviewItem } = jsonBody as {
      business_id?: unknown;
      rating?: unknown;
      content?: unknown;
      reviewItem?: unknown;
    };

    const businessId = Number(business_id);
    const numericRating = Number(rating);

    if (!Number.isInteger(businessId) || businessId <= 0 || !Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return jsonError('Datos inválidos', 400);
    }

    const safeContent = typeof content === 'string'
      ? content
      : typeof content === 'number' || typeof content === 'boolean'
        ? String(content)
        : '';

    const safeReviewItem = Array.isArray(reviewItem)
      ? reviewItem.filter((item: any) => item && typeof item.item === 'string' && typeof item.total === 'number')
      : [];

    const [users] = await pool.execute(
      'SELECT id, name FROM users WHERE id = ?',
      [payload.id]
    ) as any[];

    if (!users.length) {
      return jsonError('Cliente no encontrado', 404);
    }

    const reviewUser = users[0].name;

    const [restaurants] = await pool.execute(
      'SELECT id, slug, reviews FROM restaurants WHERE id = ?',
      [businessId]
    ) as any[];

    if (!restaurants.length) {
      return jsonError('Restaurante no encontrado', 404);
    }

    const restaurant = restaurants[0];
    const hasPreviousReview = await userHasReviewedRestaurant(payload.id, businessId);

    const [insertResult] = await pool.execute(
      `INSERT INTO reviews (reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, restaurant_id, reviewItem)
       VALUES (?, ?, ?, ?, NOW(), ?, ?)
      `,
      [
        restaurant.slug,
        numericRating,
        safeContent,
        reviewUser,
        businessId,
        safeReviewItem.length ? JSON.stringify(safeReviewItem) : null,
      ]
    ) as any[];

    const newReviewId = insertResult.insertId;

    await pool.execute(
      'UPDATE reviews SET reviewId = ? WHERE id = ?',
      [String(newReviewId), newReviewId]
    );

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

    const [avgResult] = await pool.execute(
      'SELECT AVG(reviewStar) as avg_rating FROM reviews WHERE restaurant_id = ?',
      [businessId]
    ) as any[];

    await pool.execute(
      'UPDATE restaurants SET rating = ?, reviews = ? WHERE id = ?',
      [avgResult[0].avg_rating, JSON.stringify(currentReviews), businessId]
    );

    if (!hasPreviousReview) {
      await pool.execute(
        'UPDATE users SET totalPoints = totalPoints + ?, totalReviews = totalReviews + 1 WHERE id = ?',
        [REVIEW_POINTS_REWARD, payload.id]
      );
    }

    return new Response(
      JSON.stringify({
        message: hasPreviousReview
          ? 'Reseña guardada correctamente. No se otorgaron puntos porque ya existe una reseña previa para este restaurante.'
          : 'Reseña creada exitosamente',
        reviewId: newReviewId,
        awardedPoints: hasPreviousReview ? 0 : REVIEW_POINTS_REWARD,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al crear reseña:', error);
    return jsonError('Error interno del servidor', 500);
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