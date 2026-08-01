/**
 * @file restaurant.ts
 * @description Endpoint para consultar y actualizar datos de un restaurante.
 */

import type { APIRoute } from 'astro';
import pool from '../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Falta el id del restaurante' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const [rows] = await pool.execute('SELECT * FROM restaurants WHERE id = ?', [id]) as any[];
    const restaurant = rows?.[0];

    if (!restaurant) {
      return new Response(JSON.stringify({ success: false, error: 'Restaurante no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        slug: restaurant.slug,
        category: restaurant.category,
        cuisine: restaurant.cuisine,
        description: restaurant.description,
        rating: restaurant.rating,
        distance: restaurant.distance,
        priceRange: restaurant.priceRange,
        promoted: Boolean(restaurant.promoted),
        phone: restaurant.phone,
        email: restaurant.email,
        address: restaurant.address,
        location: restaurant.location,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener el restaurante:', error);

    return new Response(JSON.stringify({ success: false, error: 'Error al obtener el restaurante' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      id,
      name,
      category,
      cuisine,
      description,
      phone,
      email,
      address,
      priceRange,
      promoted,
    } = body || {};

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Falta el id del restaurante' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await pool.execute(
      `UPDATE restaurants SET
        name = ?,
        category = ?,
        cuisine = ?,
        description = ?,
        phone = ?,
        email = ?,
        address = ?,
        priceRange = ?,
        promoted = ?
      WHERE id = ?`,
      [name, category, cuisine, description, phone, email, address, priceRange, promoted, id]
    );

    return new Response(JSON.stringify({ success: true, message: 'Restaurante actualizado correctamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar el restaurante:', error);

    return new Response(JSON.stringify({ success: false, error: 'Error al actualizar el restaurante' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
