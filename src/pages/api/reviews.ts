/**
 * @file reviews.ts
 * @description Endpoints para crear y obtener reseñas. POST otorga 10 puntos automáticamente.
 * @route GET /api/reviews?business_id=1
 * @route POST /api/reviews
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

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

    const { business_id, rating, title, content } = await request.json();

    if (!business_id || !rating || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos' }),
        { status: 400 }
      );
    }

    // Verificar que el cliente existe
    const [customers] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [payload.id]
    ) as any[];

    if (!customers.length) {
      return new Response(
        JSON.stringify({ error: 'Cliente no encontrado' }),
        { status: 404 }
      );
    }

    // Crear o actualizar reseña
    const [existing] = await pool.execute(
      'SELECT id FROM reviews WHERE customer_id = ? AND business_id = ?',
      [payload.id, business_id]
    ) as any[];

    if (existing.length > 0) {
      await pool.execute(
        `UPDATE reviews SET rating = ?, title = ?, content = ?, updated_at = NOW() 
         WHERE customer_id = ? AND business_id = ?`,
        [rating, title, content, payload.id, business_id]
      );
    } else {
      await pool.execute(
        `INSERT INTO reviews (customer_id, business_id, rating, title, content, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [payload.id, business_id, rating, title, content]
      );
    }

    // Actualizar promedio de rating del negocio
    const [avgResult] = await pool.execute(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE business_id = ? AND deleted_at IS NULL',
      [business_id]
    ) as any[];

    await pool.execute(
      'UPDATE businesses SET avg_rating = ? WHERE id = ?',
      [avgResult[0].avg_rating, business_id]
    );

    // Otorgar puntos al cliente (10 puntos por reseña)
    await pool.execute(
      'UPDATE users SET totalPoints = totalPoints + 10 WHERE id = ?',
      [payload.id]
    );

    return new Response(
      JSON.stringify({ message: 'Reseña creada exitosamente' }),
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

    const [reviews] = await pool.execute(
      `SELECT r.id, r.rating, r.title, r.content, r.created_at, 
              c.name as author
       FROM reviews r
       JOIN users c ON r.customer_id = c.id
       WHERE r.business_id = ?
       ORDER BY r.created_at DESC`,
      [businessId]
    ) as any[];

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
