import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { parseCoordinate } from '../../../lib/geocoding';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const latitude = parseCoordinate(lat, -90, 90);
    const longitude = parseCoordinate(lon, -180, 180);
    const radius = Number.parseFloat(url.searchParams.get('radius') || '10');

    if (latitude === null || longitude === null || !Number.isFinite(radius) || radius <= 0) {
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
       FROM restaurants 
       WHERE deleted_at IS NULL
       HAVING distance <= ?
       ORDER BY distance ASC
       LIMIT 50`,
      [latitude, longitude, latitude, radius]
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
