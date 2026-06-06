/**
 * @file login.ts
 * @description Endpoint POST para autenticación de usuarios. Verifica credenciales y genera JWT.
 * @route POST /api/auth/login
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyPassword, generateToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), { status: 400 });
    }

    const [rows] = await pool.execute(
      'SELECT id, uuid, email, password_hash, status FROM customers WHERE email = ? AND deleted_at IS NULL',
      [email]
    ) as any[];

    const customer = rows[0];

    if (!customer || !(await verifyPassword(password, customer.password_hash))) {
      return new Response(JSON.stringify({ error: 'Credenciales incorrectas' }), { status: 401 });
    }

    if (customer.status !== 'active') {
      return new Response(JSON.stringify({ error: 'Tu cuenta no está activa' }), { status: 403 });
    }

    const token = generateToken({ id: customer.id, uuid: customer.uuid, email: customer.email, role: 'customer' });

    await pool.execute(
      `INSERT INTO customer_sessions (customer_id, token_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [customer.id, token]
    );

    await pool.execute(
      'UPDATE customers SET last_login_at = NOW() WHERE id = ?',
      [customer.id]
    );

    return new Response(JSON.stringify({ message: 'Login exitoso', uuid: customer.uuid }), {
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