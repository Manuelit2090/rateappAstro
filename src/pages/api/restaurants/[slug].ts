import type { APIRoute } from 'astro';
import pool from '../../../lib/db';

export const GET: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;

    const [restaurants] = await pool.execute(
      'SELECT * FROM businesses WHERE slug = ? AND deleted_at IS NULL',
      [slug]
    ) as any[];

    if (!restaurants.length) {
      return new Response(
        JSON.stringify({ error: 'Restaurante no encontrado' }),
        { status: 404 }
      );
    }

    const restaurant = restaurants[0];

    // Obtener reseñas recientes
    const [reviews] = await pool.execute(
      `SELECT r.id, r.rating, r.title, r.content, r.created_at, 
              c.name as author
       FROM reviews r
       JOIN users c ON r.customer_id = c.id
       WHERE r.business_id = ? AND r.deleted_at IS NULL
       ORDER BY r.created_at DESC
       LIMIT 10`,
      [restaurant.id]
    ) as any[];

    return new Response(
      JSON.stringify({ restaurant: { ...restaurant, recent_reviews: reviews } }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error al obtener restaurante:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
