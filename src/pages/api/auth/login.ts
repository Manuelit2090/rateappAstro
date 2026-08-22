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
import { verifyPassword, generateToken, hashPassword, buildAuthCookie } from '../../../lib/auth';

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

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    const emailNormalized = typeof email === 'string' ? email.trim().toLowerCase() : email;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [rows] = await pool.execute(
      'SELECT id, name, email, password, sys, restaurant_id FROM users WHERE LOWER(email) = ?',
      [emailNormalized]
    ) as any[];

    const user = rows[0] ?? null;
    console.log('Usuario encontrado en DB:', user);

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

    const isPasswordValid = await verifyPassword(password, user.password);
    console.log('Resultado de bcrypt:', isPasswordValid);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos: bcrypt no coincide' }), {
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

    const restaurantId: number | null = user.restaurant_id ?? null;

    if (userSystem === 'RESTAURANT' && restaurantId === null) {
      return new Response(
        JSON.stringify({ error: 'Cuenta de restaurante sin restaurante asociado.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      sys: userSystem,
      restaurant_id: restaurantId,
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
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};