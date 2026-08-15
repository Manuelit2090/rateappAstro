/**
 * @file login.ts
 * @description Endpoint POST para autenticación de usuarios. Verifica credenciales y genera JWT.
 * @route POST /api/auth/login
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyPassword, generateToken, hashPassword } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    const emailNormalized = typeof email === 'string' ? email.trim().toLowerCase() : email;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), { status: 400 });
    }

    const [rows] = await pool.execute(
      'SELECT id, name, email, password, sys, restaurant_id FROM users WHERE LOWER(email) = ?',
      [emailNormalized]
    ) as any[];

    const customer = rows[0];

    if (!customer) {
      console.debug('Login failed: no user for email', emailNormalized);
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), { status: 401 });
    }

    const match = await verifyPassword(password, customer.password);

    if (!match) {
      const pwdSample = typeof customer.password === 'string' ? (customer.password.slice(0, 6) + '...' + customer.password.slice(-3)) : String(customer.password);
      const isBcrypt = typeof customer.password === 'string' && customer.password.startsWith('$2');
      console.debug('Login failed: password mismatch for user id', customer.id, 'isBcrypt=', isBcrypt, 'pwdLen=', typeof customer.password === 'string' ? customer.password.length : 'n/a', 'sample=', pwdSample);
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), { status: 401 });
    }

    const isBcryptPassword = typeof customer.password === 'string' && customer.password.startsWith('$2');

    if (!isBcryptPassword) {
      const newHash = await hashPassword(password);
      await pool.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [newHash, customer.id]
      );
    }

    const userSystem = customer.sys ?? 'CLIENT';
    const token = generateToken({
      id: customer.id,
      email: customer.email,
      sys: userSystem,
      restaurant_id: customer.restaurant_id ?? null,
    });

    const isProd = Boolean(process.env.NODE_ENV === 'production' || import.meta.env.PROD);
    const secureFlag = isProd ? 'Secure; ' : '';

    return new Response(JSON.stringify({ message: 'Login exitoso', id: customer.id, sys: userSystem }), {
      status: 200,
      headers: {
        'Set-Cookie': `auth_token=${token}; HttpOnly; ${secureFlag}Path=/; Max-Age=604800; SameSite=Strict`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};