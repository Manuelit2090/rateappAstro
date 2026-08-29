/**
 * @file user.ts
 * @description Endpoint para consultar y actualizar datos del usuario autenticado.
 */

import type { APIRoute } from 'astro';
import pool from '../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: 'Falta el email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]) as any[];
    const user = rows?.[0];

    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone ?? '',
        favoriteFood: user.favoriteFood ?? '',
        totalPoints: user.totalPoints ?? 0,
        totalReviews: user.totalReviews ?? 0,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);

    return new Response(JSON.stringify({ success: false, error: 'Error al obtener el usuario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, name, phone, favoriteFood, password, cuponsBuy } = body || {};

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: 'Falta el email del usuario' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fields: string[] = [];
    const values: any[] = [];

    if (name !== undefined) {
      fields.push('name = ?');
      values.push(name);
    }

    if (phone !== undefined) {
      fields.push('phone = ?');
      values.push(phone);
    }

    if (favoriteFood !== undefined) {
      fields.push('favoriteFood = ?');
      values.push(favoriteFood);
    }

    if (cuponsBuy !== undefined) {
      if (!Array.isArray(cuponsBuy)) {
        return new Response(JSON.stringify({ success: false, error: 'cuponsBuy debe ser un arreglo' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Validar cada entrada: { id, code, state }
      const allowedStates = new Set(['canjeado', 'no canjeado']);

      for (const item of cuponsBuy) {
        if (!item || (typeof item.id === 'undefined') || typeof item.code !== 'string' || !allowedStates.has(item.state)) {
          return new Response(JSON.stringify({ success: false, error: 'Cada elemento de cuponsBuy debe tener { id, code, state } con state "canjeado" o "no canjeado"' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      fields.push('cuponsBuy = ?');
      values.push(JSON.stringify(cuponsBuy));
    }

    if (password !== undefined && password !== '') {
      fields.push('password = ?');
      values.push(password);
    }

    values.push(email);

    if (fields.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'No hay campos para actualizar' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await pool.execute(`UPDATE users SET ${fields.join(', ')} WHERE email = ?`, values);

    return new Response(JSON.stringify({ success: true, message: 'Cambios guardados con éxito' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);

    return new Response(JSON.stringify({ success: false, error: 'Error al actualizar el usuario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
