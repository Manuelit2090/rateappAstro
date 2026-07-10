/**
 * @file coupons.ts
 * @description Endpoints para listar y canjear cupones. POST realiza transacción atómica de puntos.
 * @route GET /api/coupons
 * @route POST /api/coupons
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export const GET: APIRoute = async () => {
  try {
    const [coupons] = await pool.execute(
      'SELECT id, code, description, points_required, discount_percentage, uses_left FROM coupons WHERE deleted_at IS NULL AND active = 1'
    ) as any[];

    return new Response(JSON.stringify({ coupons }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al obtener cupones:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};

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

    const { coupon_id } = await request.json();

    if (!coupon_id) {
      return new Response(
        JSON.stringify({ error: 'coupon_id requerido' }),
        { status: 400 }
      );
    }

    // Obtener cupón
    const [coupons] = await pool.execute(
      'SELECT * FROM coupons WHERE id = ? AND deleted_at IS NULL AND active = 1',
      [coupon_id]
    ) as any[];

    if (!coupons.length) {
      return new Response(
        JSON.stringify({ error: 'Cupón no encontrado' }),
        { status: 404 }
      );
    }

    const coupon = coupons[0];

    if (coupon.uses_left <= 0) {
      return new Response(
        JSON.stringify({ error: 'Cupón agotado' }),
        { status: 410 }
      );
    }

    // Obtener puntos del cliente
    const [users] = await pool.execute(
      'SELECT totalPoints FROM users WHERE id = ?',
      [payload.id]
    ) as any[];

    if (!users.length) {
      return new Response(
        JSON.stringify({ error: 'Usuario no encontrado' }),
        { status: 404 }
      );
    }

    const customer = users[0];

    if (customer.totalPoints < coupon.points_required) {
      return new Response(
        JSON.stringify({ 
          error: `Puntos insuficientes. Necesitas ${coupon.points_required}, tienes ${customer.totalPoints}` 
        }),
        { status: 402 }
      );
    }

    // Iniciar transacción
    const connection = await pool.getConnection() as any;
    
    try {
      await connection.beginTransaction();

      // Deducir puntos
      await connection.execute(
        'UPDATE users SET totalPoints = totalPoints - ? WHERE id = ?',
        [coupon.points_required, payload.id]
      );

      // Registrar canjeo
      await connection.execute(
        `INSERT INTO customer_redemptions (customer_id, coupon_id, created_at) 
         VALUES (?, ?, NOW())`,
        [payload.id, coupon_id]
      );

      // Actualizar usos disponibles
      await connection.execute(
        'UPDATE coupons SET uses_left = uses_left - 1 WHERE id = ?',
        [coupon_id]
      );

      await connection.commit();
      connection.release();

      return new Response(
        JSON.stringify({ 
          message: 'Cupón canjeado exitosamente',
          coupon_code: coupon.code,
          discount: coupon.discount_percentage + '%'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error al canjear cupón:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
