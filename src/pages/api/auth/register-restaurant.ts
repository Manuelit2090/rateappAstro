/**
 * @file register-restaurant.ts
 * @description Endpoint POST para registrar un usuario y restaurante asociados.
 * Realiza el flujo correcto: crea el restaurante, luego crea el usuario con sys='RESTAURANT',
 * encripta la contraseña y emite un JWT con restaurant_id válido.
 * @route POST /api/auth/register-restaurant
 * @dependencies src/lib/db, src/lib/auth
 */

import type { APIRoute } from 'astro';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../../../lib/db';
import { generateToken, hashPassword } from '../../../lib/auth';

type RestaurantRegistrationBody = {
  email: string;
  password: string;
  name: string;
  restaurantName: string;
  address: string;
  category: string;
};

type UserExistsRow = RowDataPacket & {
  id: number;
};

function buildAuthCookie(token: string): string {
  return `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json().catch(() => null)) as Partial<RestaurantRegistrationBody> | null;

    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const restaurantName = typeof body?.restaurantName === 'string' ? body.restaurantName.trim() : '';
    const address = typeof body?.address === 'string' ? body.address.trim() : '';
    const category = typeof body?.category === 'string' ? body.category.trim() : '';

    if (!email || !password || !name || !restaurantName || !address || !category) {
      return new Response(
        JSON.stringify({
          error: 'Faltan campos obligatorios: email, password, name, restaurantName, address y category son requeridos.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({ error: 'La contraseña debe tener al menos 8 caracteres.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const [existingRows] = (await pool.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    )) as [UserExistsRow[], unknown];

    if (existingRows.length > 0) {
      return new Response(
        JSON.stringify({ error: 'El email ya está registrado.' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const restaurantSlug = restaurantName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'restaurant';

    const [restaurantInsert] = (await pool.execute(
      `INSERT INTO restaurants (name, slug, address, category)
       VALUES (?, ?, ?, ?)`,
      [restaurantName, restaurantSlug, address, category]
    )) as [ResultSetHeader, unknown];

    const restaurantId = Number(restaurantInsert.insertId);

    if (!restaurantId) {
      return new Response(
        JSON.stringify({ error: 'No se pudo crear el restaurante.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const passwordHash = await hashPassword(password);

    const [userInsert] = (await pool.execute(
      `INSERT INTO users (name, email, password, sys, restaurant_id)
       VALUES (?, ?, ?, 'RESTAURANT', ?)`,
      [name, email, passwordHash, restaurantId]
    )) as [ResultSetHeader, unknown];

    const userId = Number(userInsert.insertId);

    if (!userId) {
      await pool.execute('DELETE FROM restaurants WHERE id = ?', [restaurantId]);
      return new Response(
        JSON.stringify({ error: 'No se pudo crear el usuario del restaurante.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = generateToken({
      id: userId,
      email,
      sys: 'RESTAURANT',
      restaurant_id: restaurantId,
    });

    return new Response(
      JSON.stringify({
        message: 'Registro de restaurante exitoso',
        redirect: '/restaurant-admin',
        user: {
          id: userId,
          email,
          sys: 'RESTAURANT',
          restaurant_id: restaurantId,
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
    console.error('Error en registro de restaurante:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
