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
import { verifyPassword, generateToken, buildAuthCookie } from '../../../lib/auth';

type UserLoginRow = RowDataPacket & {
  id: number;
  email: string;
  password: string;
  sys: 'CLIENT' | 'RESTAURANT' | 'ADMIN' | null;
  restaurant_id: number | null;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);
    const email = body && typeof body === 'object' ? (body as Record<string, unknown>).email : null;
    const password = body && typeof body === 'object' ? (body as Record<string, unknown>).password : null;
    const emailNormalized = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!emailNormalized || typeof password !== 'string' || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Tipamos la consulta correctamente con UserLoginRow
    const [rows] = await pool.execute(
      'SELECT id, email, password, sys, restaurant_id FROM users WHERE LOWER(email) = ?',
      [emailNormalized]
    ) as [UserLoginRow[], any];

    const customer = rows[0] ?? null;
    if (!customer) {
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const match = await verifyPassword(password, customer.password);

    if (!match) {
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Definición del rol del sistema
    const userSystem: 'CLIENT' | 'RESTAURANT' | 'ADMIN' =
      customer.sys === 'RESTAURANT' || customer.sys === 'ADMIN' ? customer.sys : 'CLIENT';

    const restaurantId: number | null = customer.restaurant_id ?? null;

    if (userSystem === 'RESTAURANT' && restaurantId === null) {
      return new Response(
        JSON.stringify({ error: 'Cuenta de restaurante sin restaurante asociado.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generación del token JWT
    const token = generateToken({
      id: customer.id,
      email: customer.email,
      sys: userSystem,
      restaurant_id: restaurantId,
    });

    const redirectPath = userSystem === 'CLIENT' ? '/dashboard' : '/admin/dashboard';

    const user = {
      id: customer.id,
      email: customer.email,
      sys: userSystem,
      role: userSystem,
      restaurant_id: restaurantId,
    };

    return new Response(JSON.stringify({
      message: 'Login exitoso',
      user,
      id: user.id,
      sys: user.sys,
      redirect: redirectPath,
    }), {
      status: 200,
      headers: {
        'Set-Cookie': buildAuthCookie(token),
        'Content-Type': 'application/json',
      },
    });

} catch (error) {
  console.error('Error en login:', error);
  return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
};