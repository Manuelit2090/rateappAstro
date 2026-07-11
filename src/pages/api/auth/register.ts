/**
 * @file register.ts
 * @description Endpoint POST para registrar nuevos usuarios con validación y encriptación.
 * @route POST /api/auth/register
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { hashPassword, generateToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: 'Nombre, email y contraseña son requeridos' }), { status: 400 });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 8 caracteres' }), { status: 400 });
    }

    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    ) as any[];

    if (existing.length > 0) {
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), { status: 409 });
    }

    const password_hash = await hashPassword(password);

    const recovery_code = Math.floor(100000 + Math.random() * 900000).toString();

    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password, totalPoints, totalReviews, recovery_code) VALUES (?, ?, ?, 0, 0, ?)`,
      [name, email, password_hash, recovery_code]
    ) as any[];

    const [rows] = await pool.execute(
      'SELECT id, email, name FROM users WHERE id = ?',
      [result.insertId]
    ) as any[];

    const customer = rows[0];
    const token = generateToken({ id: customer.id, email: customer.email, role: 'customer' });

    return new Response(JSON.stringify({ message: 'Registro exitoso', id: customer.id }), {
      status: 201,
      headers: {
        'Set-Cookie': `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};