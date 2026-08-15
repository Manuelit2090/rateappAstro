/**
 * @file login.ts
 * @description Endpoint POST para autenticación de usuarios. Verifica credenciales,
 * genera un JWT y devuelve la ruta de redirección correcta según el tipo de usuario.
 * @route POST /api/auth/login
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import type { RowDataPacket } from 'mysql2';
import pool from '../../../lib/db';
import { verifyPassword, generateToken, hashPassword } from '../../../lib/auth';

type UserLoginRow = RowDataPacket & {
  id: number;
  email: string;
  password: string;
  sys: 'CLIENT' | 'RESTAURANT' | 'ADMIN' | null;
  restaurant_id: number | null;
};

function getRedirectPath(userSystem: 'CLIENT' | 'RESTAURANT' | 'ADMIN'): string {
  return userSystem === 'RESTAURANT' ? '/restaurant-admin' : '/dashboard';
}

function buildAuthCookie(token: string): string {
  return `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json().catch(() => null)) as Partial<{ email: string; password: string }> | null;
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [rows] = (await pool.execute(
      'SELECT id, email, password, sys, restaurant_id FROM users WHERE email = ? LIMIT 1',
      [email]
    )) as [UserLoginRow[], unknown];

    const user = rows[0] ?? null;

    if (!user) {
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (typeof user.password !== 'string' || user.password.length === 0) {
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const passwordMatches = await verifyPassword(password, user.password);

    if (!passwordMatches) {
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isBcryptPassword = user.password.startsWith('$2');

    if (!isBcryptPassword) {
      const newHash = await hashPassword(password);
      await pool.execute('UPDATE users SET password = ? WHERE id = ?', [newHash, user.id]);
    }

    const userSystem: 'CLIENT' | 'RESTAURANT' | 'ADMIN' =
      user.sys === 'RESTAURANT' || user.sys === 'ADMIN' ? user.sys : 'CLIENT';

    const token = generateToken({
      id: user.id,
      email: user.email,
      sys: userSystem,
      restaurant_id: user.restaurant_id ?? null,
    });

    const redirectPath = getRedirectPath(userSystem);

    return new Response(
      JSON.stringify({
        message: 'Login exitoso',
        redirect: redirectPath,
        user: {
          id: user.id,
          email: user.email,
          sys: userSystem,
          restaurant_id: user.restaurant_id ?? null,
        },
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': buildAuthCookie(token),
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error en login:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};