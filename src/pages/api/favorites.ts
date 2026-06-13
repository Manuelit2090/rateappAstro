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

    const { business_id } = await request.json();

    if (!business_id) {
      return new Response(
        JSON.stringify({ error: 'business_id requerido' }),
        { status: 400 }
      );
    }

    // Verificar si ya está en favoritos
    const [existing] = await pool.execute(
      'SELECT id FROM customer_favorites WHERE customer_id = ? AND business_id = ?',
      [payload.id, business_id]
    ) as any[];

    if (existing.length > 0) {
      // Si ya existe, eliminar
      await pool.execute(
        'DELETE FROM customer_favorites WHERE customer_id = ? AND business_id = ?',
        [payload.id, business_id]
      );
      return new Response(
        JSON.stringify({ message: 'Eliminado de favoritos', favorite: false }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Si no existe, agregar
      await pool.execute(
        `INSERT INTO customer_favorites (customer_id, business_id, created_at) 
         VALUES (?, ?, NOW())`,
        [payload.id, business_id]
      );
      return new Response(
        JSON.stringify({ message: 'Agregado a favoritos', favorite: true }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error al cambiar favorito:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};

export const GET: APIRoute = async ({ cookies }) => {
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

    const [favorites] = await pool.execute(
      `SELECT b.* FROM customer_favorites cf
       JOIN businesses b ON cf.business_id = b.id
       WHERE cf.customer_id = ? AND b.deleted_at IS NULL`,
      [payload.id]
    ) as any[];

    return new Response(JSON.stringify({ favorites }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
