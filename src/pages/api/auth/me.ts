import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get('auth_token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
  }

  const [columnsRows] = await pool.execute('SHOW COLUMNS FROM users') as any[];
  const availableFields = new Set(columnsRows.map((column: any) => column.Field));

  const fields = ['id', 'name', 'email', 'totalPoints', 'totalReviews'];

  if (availableFields.has('reviews')) fields.push('reviews');
  if (availableFields.has('favoriteRestaurants')) fields.push('favoriteRestaurants');
  if (availableFields.has('favoriteRestaurant')) fields.push('favoriteRestaurant');
  if (availableFields.has('cuponsBuy')) fields.push('cuponsBuy');
  if (availableFields.has('couponsBuy')) fields.push('couponsBuy');

  const [rows] = await pool.execute(
    `SELECT ${fields.join(', ')} FROM users WHERE id = ?`,
    [payload.id]
  ) as any[];

  const user = rows[0];

  if (!user) {
    return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
  }

  const normalizedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    totalPoints: user.totalPoints ?? 0,
    totalReviews: user.totalReviews ?? 0,
    reviews: user.reviews ?? [],
    favoriteRestaurants: user.favoriteRestaurants ?? user.favoriteRestaurant ?? [],
    favoriteRestaurant: user.favoriteRestaurant ?? user.favoriteRestaurants ?? [],
    cuponsBuy: user.cuponsBuy ?? user.couponsBuy ?? [],
    couponsBuy: user.couponsBuy ?? user.cuponsBuy ?? [],
  };

  return new Response(JSON.stringify({ user: normalizedUser }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};