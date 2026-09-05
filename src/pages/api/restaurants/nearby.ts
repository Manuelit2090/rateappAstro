import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { parseCoordinate } from '../../../lib/geocoding';

const MIN_DISTANCE_KM = 2;
const MAX_DISTANCE_KM = 8;

function parseJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string' || !value.trim()) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const rawLat = url.searchParams.get('lat');
    const rawLon = url.searchParams.get('lon');
    const hasOnlyRequiredParameters = [...url.searchParams.keys()]
      .every((parameter) => parameter === 'lat' || parameter === 'lon');

    if (
      !hasOnlyRequiredParameters ||
      rawLat === null ||
      rawLon === null ||
      url.searchParams.getAll('lat').length !== 1 ||
      url.searchParams.getAll('lon').length !== 1
    ) {
      return new Response(
        JSON.stringify({
          error: 'Sólo se aceptan los parámetros obligatorios lat y lon.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const lat = parseCoordinate(rawLat, -90, 90);
    const lon = parseCoordinate(rawLon, -180, 180);
    if (lat === null || lon === null) {
      return new Response(
        JSON.stringify({
          error: 'Coordenadas válidas requeridas. Parámetros obligatorios: lat y lon.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fórmula de Haversine para distancia
    const [restaurants] = await pool.execute(
      `SELECT 
        id, name, slug, cuisine, category, description,
        image, rating, reviews, priceRange, promoted,
        phone, email, address, lat, lon,
        (6371 * acos(cos(radians(?)) * cos(radians(lat)) * 
        cos(radians(lon) - radians(?)) + sin(radians(?)) * 
        sin(radians(lat)))) AS distance
       FROM restaurants
       WHERE lat IS NOT NULL AND lon IS NOT NULL
       HAVING distance BETWEEN ? AND ?
       ORDER BY distance ASC
       LIMIT 50`,
      [lat, lon, lat, MIN_DISTANCE_KM, MAX_DISTANCE_KM]
    ) as any[];

    const normalizedRestaurants = (restaurants as any[]).map((restaurant) => ({
      ...restaurant,
      rating: Number(restaurant.rating) || 0,
      distance: Number(restaurant.distance),
      reviews: parseJsonArray(restaurant.reviews),
      tags: typeof restaurant.tags === 'string'
        ? restaurant.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        : Array.isArray(restaurant.tags) ? restaurant.tags : [],
    }));

    return new Response(JSON.stringify({
      restaurants: normalizedRestaurants,
      minDistanceKm: MIN_DISTANCE_KM,
      maxDistanceKm: MAX_DISTANCE_KM,
    }), {
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
