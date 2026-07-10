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

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), { status: 400 });
    }

    const [rows] = await pool.execute(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email]
    ) as any[];

    const customer = rows[0];

    if (!customer) {
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), { status: 401 });
    }

    console.log('--- INTENTO DE LOGIN ---');
    console.log('Usuario encontrado en BD:', customer);
    const match = await verifyPassword(password, customer.password);
    console.log('¿La contraseña coincide?:', match);
    console.log('------------------------');

    if (!match) {
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

    const token = generateToken({ id: customer.id, email: customer.email, role: 'customer' });

    return new Response(JSON.stringify({ message: 'Login exitoso', id: customer.id }), {
      status: 200,
      headers: {
        'Set-Cookie': `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};