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

    // Tipamos la consulta correctamente con UserLoginRow
    const [rows] = await pool.execute(
      'SELECT id, email, password, sys, restaurant_id FROM users WHERE LOWER(email) = ?',
      [emailNormalized]
    ) as [UserLoginRow[], any];

    const customer = rows[0] ?? null;
    console.log('Usuario encontrado en DB:', customer);

    if (!customer) {
      console.debug('Login failed: no user for email', emailNormalized);
      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const match = await verifyPassword(password, customer.password);

    if (!match) {
      const isBcrypt = typeof customer.password === 'string' && customer.password.startsWith('$2');
      console.debug('Login failed: password mismatch for user id', customer.id, 'isBcrypt=', isBcrypt, 'pwdLen=', typeof customer.password === 'string' ? customer.password.length : 'n/a');

      return new Response(JSON.stringify({ error: 'Email o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Si la contraseña no estaba encriptada con bcrypt, la actualizamos automáticamente
    const isBcryptPassword = customer.password.startsWith('$2');
    if (!isBcryptPassword) {
      const newHash = await hashPassword(password);
      await pool.execute('UPDATE users SET password = ? WHERE id = ?', [newHash, customer.id]);
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

    const isProd = process.env.NODE_ENV === 'production';
    const secureFlag = isProd ? 'Secure; ' : '';

    const redirectPath = userSystem === 'RESTAURANT' ? '/admin/dashboard' : '/dashboard';

    return new Response(JSON.stringify({
      message: 'Login exitoso',
      id: customer.id,
      sys: userSystem,
      redirect: redirectPath,
    }), {
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