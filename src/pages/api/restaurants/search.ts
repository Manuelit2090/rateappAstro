/**
 * @file search.ts
 * @description Endpoint GET para búsqueda de restaurantes con filtros y paginación.
 * @route GET /api/restaurants/search?q=query&category=cat&page=1
 * @dependencies src/lib/db
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category');
    const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM restaurants WHERE 1=1';
    const params: any[] = [];

    if (q) {
      query += ' AND (name LIKE ? OR description LIKE ? OR cuisine LIKE ?)';
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    // Al concatenar limit y offset directamente como números enteros seguros,
    // evitamos que el prepared statement de MySQL falle por tipos de datos.
    query += ` ORDER BY rating DESC LIMIT ${limit} OFFSET ${offset}`;

    const [restaurants] = await pool.execute(query, params) as any[];

    return new Response(JSON.stringify({ restaurants, page, limit }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};