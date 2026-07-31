import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get('auth_token')?.value;

  if (token) {
    const payload = verifyToken(token);

 
  }

  return new Response(JSON.stringify({ message: 'Sesión cerrada' }), {
    status: 200,
    headers: {
      'Set-Cookie': 'auth_token=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Strict',
      'Content-Type': 'application/json',
    },
  });};