import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ cookies }) => {
  const token = cookies.get('auth_token')?.value;

  if (token) {
    const payload = verifyToken(token);

    if (payload) {
      await pool.execute(
        'UPDATE customer_sessions SET revoked_at = NOW() WHERE token_hash = ?',
        [token]
      );
    }
  }

  return new Response(JSON.stringify({ message: 'Sesión cerrada' }), {
    status: 200,
    headers: {
      'Set-Cookie': 'auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict',
      'Content-Type': 'application/json',
    },
  });
};