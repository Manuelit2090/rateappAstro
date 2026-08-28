/**
 * @file shop.ts
 * @description Endpoints para listar, crear, eliminar y canjear cupones de la tienda.
 *  - GET /api/shop -> lista artículos con info del restaurante
 *  - POST /api/shop -> crea o canjea dependiendo de la action
 *  - DELETE /api/shop -> elimina un cupón del restaurante autenticado
 */

import type { APIRoute } from 'astro';
import pool from '../../lib/db';
import { verifyToken } from '../../lib/auth';

function generateCode(userId: number | string) {
  return `SHOP-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${userId}`;
}

function normalizeCouponList(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const restaurantId = url.searchParams.get('restaurantId');

    const query = restaurantId
      ? `SELECT s.idCoupons AS id, s.description, s.price, s.category, s.restaurantId, s.expirationDate, s.createdAt,
          r.id AS restaurant_id, r.name AS restaurant_name, r.image AS restaurant_image, r.slug as restaurant_slug
         FROM shop s
         LEFT JOIN restaurants r ON r.id = s.restaurantId
         WHERE s.restaurantId = ?
         ORDER BY s.createdAt DESC`
      : `SELECT s.idCoupons AS id, s.description, s.price, s.category, s.restaurantId, s.expirationDate, s.createdAt,
          r.id AS restaurant_id, r.name AS restaurant_name, r.image AS restaurant_image, r.slug as restaurant_slug
         FROM shop s
         LEFT JOIN restaurants r ON r.id = s.restaurantId
         WHERE (s.expirationDate IS NULL OR s.expirationDate > NOW())
         ORDER BY s.createdAt DESC`;

    const [rows] = await pool.execute(query, restaurantId ? [restaurantId] : []) as any[];

    return new Response(JSON.stringify({ items: rows || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error obtener shop items:', error);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const action = body.action || '';

    const token = cookies.get('auth_token')?.value;
    if (!token) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });

    if (action === 'create') {
      const { description, price, category, restaurantId, expirationDate } = body;

      if (!description || !price || !category || !restaurantId) {
        return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const restaurantIdNumber = Number(restaurantId);
      if (Number.isNaN(restaurantIdNumber) || restaurantIdNumber <= 0) {
        return new Response(JSON.stringify({ error: 'restaurantId inválido' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const [result] = await pool.execute(
        'INSERT INTO shop (description, price, category, restaurantId, expirationDate, createdAt) VALUES (?, ?, ?, ?, ?, NOW())',
        [String(description).trim(), Number(price), String(category).trim(), restaurantIdNumber, expirationDate || null]
      ) as any[];

      return new Response(JSON.stringify({
        success: true,
        id: result.insertId,
        coupon: { id: result.insertId, description, price: Number(price), category, restaurantId: restaurantIdNumber }
      }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    if (action === 'redeemCode') {
      const { code, restaurantId } = body;
      const couponCode = String(code || '').trim().toUpperCase();
      const restaurantIdNumber = Number(restaurantId);

      if (!couponCode || !/^(SHOP-[A-Z0-9]+-\d+)$/.test(couponCode)) {
        return new Response(JSON.stringify({ error: 'Formato de código incorrecto. Debe ser SHOP-XXXX-USERID' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      if (!Number.isInteger(restaurantIdNumber) || restaurantIdNumber <= 0) {
        return new Response(JSON.stringify({ error: 'restaurantId inválido' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const userId = Number(couponCode.split('-').pop());
      if (!Number.isInteger(userId) || userId <= 0) {
        return new Response(JSON.stringify({ error: 'El código no incluye un userId válido' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const [users] = await pool.execute('SELECT id, cuponsBuy FROM users WHERE id = ?', [userId]) as any[];
      const user = users?.[0];
      if (!user) {
        return new Response(JSON.stringify({ error: 'No existe un usuario con ese código' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      const coupons = normalizeCouponList(user.cuponsBuy);
      const match = coupons.find((coupon: any) => String(coupon.code).toUpperCase() === couponCode);

      if (!match) {
        return new Response(JSON.stringify({ error: 'El usuario no tiene ese cupón registrado' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }

      if (String(match.state).toLowerCase() !== 'unexchanged') {
        return new Response(JSON.stringify({ error: 'Este cupón ya fue canjeado' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
      }

      if (String(match.restaurantId ?? match.restaurant_id ?? match.restaurant ?? '') !== String(restaurantIdNumber)) {
        return new Response(JSON.stringify({ error: 'Este cupón no pertenece a este restaurante' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
      }

      const updatedCoupons = coupons.map((coupon: any) => {
        if (String(coupon.code).toUpperCase() === couponCode) {
          return { ...coupon, state: 'exchanged' };
        }
        return coupon;
      });

      await pool.execute('UPDATE users SET cuponsBuy = ? WHERE id = ?', [JSON.stringify(updatedCoupons), userId]);

      return new Response(JSON.stringify({
        success: true,
        message: 'Cupón canjeado correctamente',
        coupon: { code: couponCode, restaurantId: restaurantIdNumber, userId }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (action !== 'redeem') {
      return new Response(JSON.stringify({ error: 'Acción no soportada' }), { status: 400 });
    }

    const { shop_id } = body;
    if (!shop_id) return new Response(JSON.stringify({ error: 'shop_id requerido' }), { status: 400 });

    const [items] = await pool.execute('SELECT * FROM shop WHERE idCoupons = ? LIMIT 1', [shop_id]) as any[];
    const item = items?.[0];
    if (!item) return new Response(JSON.stringify({ error: 'Item no encontrado' }), { status: 404 });

    if (item.expirationDate && new Date(item.expirationDate) <= new Date()) {
      return new Response(JSON.stringify({ error: 'Item expirado' }), { status: 410 });
    }

    const [users] = await pool.execute('SELECT id, totalPoints, cuponsBuy FROM users WHERE id = ?', [payload.id]) as any[];
    const user = users?.[0];
    if (!user) return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });

    if ((user.totalPoints ?? 0) < item.price) {
      return new Response(JSON.stringify({ error: 'Puntos insuficientes', needed: item.price, current: user.totalPoints }), { status: 402 });
    }

    const connection = await pool.getConnection() as any;
    try {
      await connection.beginTransaction();
      await connection.execute('UPDATE users SET totalPoints = totalPoints - ? WHERE id = ?', [item.price, payload.id]);

      const currentCupons = normalizeCouponList(user.cuponsBuy);
      const alreadyPurchased = currentCupons.some((coupon: any) => String(coupon.id) === String(item.idCoupons));
      if (alreadyPurchased) {
        await connection.rollback();
        connection.release();
        return new Response(JSON.stringify({ error: 'Ya compraste este cupón. Puedes verlo en tu perfil.' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
      }

      const newCoupon = {
        id: item.idCoupons,
        restaurantId: Number(item.restaurantId),
        code: generateCode(payload.id),
        state: 'unexchanged'
      };

      currentCupons.push(newCoupon);
      await connection.execute('UPDATE users SET cuponsBuy = ? WHERE id = ?', [JSON.stringify(currentCupons), payload.id]);
      await connection.commit();
      connection.release();

      return new Response(JSON.stringify({ message: 'Canje realizado', coupon: newCoupon }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  } catch (error) {
    console.error('Error en shop POST:', error);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const token = cookies.get('auth_token')?.value;
    if (!token) return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });

    const payload = verifyToken(token);
    if (!payload || payload.sys !== 'RESTAURANT') {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 403 });
    }

    const { shop_id, restaurantId } = body;
    const restaurantIdNumber = Number(restaurantId ?? payload.restaurant_id ?? 0);

    if (!shop_id || !restaurantIdNumber) {
      return new Response(JSON.stringify({ error: 'shop_id y restaurantId requeridos' }), { status: 400 });
    }

    const [result] = await pool.execute('DELETE FROM shop WHERE idCoupons = ? AND restaurantId = ?', [Number(shop_id), restaurantIdNumber]) as any[];

    return new Response(JSON.stringify({ success: true, deleted: result.affectedRows ?? 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error eliminando cupón:', error);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
};
