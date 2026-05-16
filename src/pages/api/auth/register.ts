import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { hashPassword, generateToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { full_name, username, email, password } = await request.json();

    if (!full_name || !username || !email || !password) {
      return new Response(JSON.stringify({ error: 'Todos los campos son requeridos' }), { status: 400 });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 8 caracteres' }), { status: 400 });
    }

    const [existing] = await pool.execute(
      'SELECT id FROM customers WHERE email = ? OR username = ?',
      [email, username]
    ) as any[];

    if (existing.length > 0) {
      return new Response(JSON.stringify({ error: 'El email o usuario ya está registrado' }), { status: 409 });
    }

    const password_hash = await hashPassword(password);

    const [result] = await pool.execute(
      `INSERT INTO customers (full_name, username, email, password_hash, status) VALUES (?, ?, ?, ?, 'active')`,
      [full_name, username, email, password_hash]
    ) as any[];

    // Asegurarse de que los cambios se reflejen en la base de datos
    await pool.execute('UPDATE customers SET updated_at = NOW() WHERE id = ?', [result.insertId]);

    const [rows] = await pool.execute(
      'SELECT id, uuid, email FROM customers WHERE id = ?',
      [result.insertId]
    ) as any[];

    const customer = rows[0];
    const token = generateToken({ id: customer.id, uuid: customer.uuid, email: customer.email, role: 'customer' });

    return new Response(JSON.stringify({ message: 'Registro exitoso', uuid: customer.uuid }), {
      status: 201,
      headers: {
        'Set-Cookie': `auth_token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};