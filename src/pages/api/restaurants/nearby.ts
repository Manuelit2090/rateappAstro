import type { APIRoute } from 'astro';
import pool from '../../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const radius = url.searchParams.get('radius') || '10'; // km

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Coordenadas (lat, lon) requeridas' }),
        { status: 400 }
      );
    }

    // Fórmula de Haversine para distancia
    const [restaurants] = await pool.execute(
      `SELECT 
        id, uuid, name, slug, cuisine, category, description, 
        image_url, avg_rating, review_count, price_range, 
        phone, email, address, latitude, longitude,
        (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * 
        cos(radians(longitude) - radians(?)) + sin(radians(?)) * 
        sin(radians(latitude)))) AS distance
       FROM businesses 
       WHERE deleted_at IS NULL
       HAVING distance <= ?
       ORDER BY distance ASC
       LIMIT 50`,
      [lat, lon, lat, radius]
    ) as any[];

    return new Response(JSON.stringify({ restaurants }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
