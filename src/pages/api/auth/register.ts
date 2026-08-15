/**
 * @file register.ts
 * @description Endpoint POST para registrar nuevos usuarios con validación y encriptación.
 * @route POST /api/auth/register
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { hashPassword, generateToken, buildAuthCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json().catch(() => null)) as Partial<{ name: string; email: string; password: string }> | null;
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: 'Nombre, email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 8 caracteres' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [existing] = (await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [email])) as any[];

    if (existing.length > 0) {
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const passwordHash = await hashPassword(password);
    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

    const [result] = (await pool.execute(
      `INSERT INTO users (name, email, password, totalPoints, totalReviews, recovery_code, sys, restaurant_id)
       VALUES (?, ?, ?, 0, 0, ?, 'CLIENT', NULL)`,
      [name, email, passwordHash, recoveryCode]
    )) as any[];

    const [rows] = (await pool.execute(
      'SELECT id, email, name, sys, restaurant_id FROM users WHERE id = ?',
      [result.insertId]
    )) as any[];

    const customer = rows[0];
    const token = generateToken({
      id: customer.id,
      email: customer.email,
      sys: customer.sys ?? 'CLIENT',
      restaurant_id: customer.restaurant_id ?? null,
    });

    return new Response(
      JSON.stringify({
        message: 'Registro exitoso',
        redirect: '/dashboard',
        user: {
          id: customer.id,
          email: customer.email,
          sys: 'CLIENT',
          restaurant_id: null,
        },
      }),
      {
        status: 201,
        headers: {
          'Set-Cookie': buildAuthCookie(token),
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};