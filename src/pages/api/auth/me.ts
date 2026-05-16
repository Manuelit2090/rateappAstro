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

  const [rows] = await pool.execute(
    'SELECT id, uuid, full_name, username, email, avatar_url, status FROM customers WHERE id = ?',
    [payload.id]
  ) as any[];

  const customer = rows[0];

  if (!customer) {
    return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
  }

  return new Response(JSON.stringify({ user: customer }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};