/**
 * @file restaurant.ts
 * @description Endpoint para consultar y actualizar datos de un restaurante.
 */

import type { APIRoute } from 'astro';
import type { ResultSetHeader } from 'mysql2';
import pool from '../../lib/db';
import { generateToken, verifyToken } from '../../lib/auth';

function buildAuthCookie(token: string): string {
  const secureFlag = import.meta.env.PROD ? 'Secure; ' : '';
  return `auth_token=${token}; HttpOnly; ${secureFlag}Path=/; Max-Age=604800; SameSite=Strict`;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    let body: Record<string, any> = {};

    if (contentType.includes('application/json')) {
      body = (await request.json().catch(() => ({}))) as Record<string, any>;
    } else {
      const formData = await request.formData().catch(() => null);

      if (formData) {
        body = Object.fromEntries(
          Array.from(formData.entries()).map(([key, value]) => [key, typeof value === 'string' ? value : String(value)])
        );
      }
    }

    const parseString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

    const name = parseString(body.name ?? body.restaurantName ?? body.restaurant_name);
    const category = parseString(body.category);
    const image = parseString(body.image);
    const address = parseString(body.address);
    const rawReviews = (() => {
      if (Array.isArray(body.reviews)) return body.reviews;
      if (typeof body.reviews === 'string') {
        try {
          const parsed = JSON.parse(body.reviews);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    })();
    const reviews = rawReviews;
    const cuisine = parseString(body.cuisine ?? body.cuisineType);
    const description = parseString(body.description);
    const email = parseString(body.email).toLowerCase();
    const phone = parseString(body.phone ?? body.phone_number ?? body.telephone);
    const priceRange = parseString(body.priceRange ?? body.price_range);
    const promoted = body.promoted === true || body.promoted === 'true' || body.promoted === '1';

    if (!name || !category || !address) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Faltan campos obligatorios: name, category y address son requeridos.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'restaurant';

    const [existingRows] = await pool.execute(
      'SELECT id FROM restaurants WHERE slug = ? LIMIT 1',
      [slug]
    ) as any[];

    let finalSlug = slug;

    if (existingRows && existingRows.length > 0) {
      const suffix = Date.now().toString().slice(-6);
      finalSlug = `${slug}-${suffix}`;
    }

    const finalImage = image || null;
    const finalReviews = reviews;

    const [result] = await pool.execute(
      `INSERT INTO restaurants (name, image, slug, reviews, category, cuisine, description, priceRange, promoted, phone, email, address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, finalImage, finalSlug, finalReviews, category, cuisine, description, priceRange, promoted, phone, email, address]
    ) as [ResultSetHeader, unknown];

    const restaurantId = Number(result.insertId);

    const responseHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const currentToken = cookies.get('auth_token')?.value;

    if (currentToken) {
      const payload = verifyToken(currentToken);

      if (payload && payload.sys === 'RESTAURANT') {
        const [userRows] = await pool.execute(
          'SELECT id, restaurant_id, sys FROM users WHERE id = ? LIMIT 1',
          [payload.id]
        ) as any[];

        const existingUser = userRows?.[0];

        if (existingUser && (existingUser.restaurant_id === null || existingUser.restaurant_id === undefined)) {
          await pool.execute(
            'UPDATE users SET restaurant_id = ? WHERE id = ?',
            [restaurantId, payload.id]
          );

          const refreshedToken = generateToken({
            id: payload.id,
            email: payload.email,
            sys: 'RESTAURANT',
            restaurant_id: restaurantId,
          });

          responseHeaders['Set-Cookie'] = buildAuthCookie(refreshedToken);
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Restaurante creado correctamente',
      restaurant: {
        id: restaurantId,
        name,
        image,
        slug: finalSlug,
        category,
        reviews,
        cuisine,
        description,
        priceRange,
        promoted,
        phone,
        email,
        address,
      },
    }), {
      status: 201,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error al crear el restaurante:', error);

    return new Response(JSON.stringify({
      success: false,
      error: 'Error al crear el restaurante',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

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
        image: restaurant.image,
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
      image,
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
        image = ?,
        category = ?,
        cuisine = ?,
        description = ?,
        phone = ?,
        email = ?,
        address = ?,
        priceRange = ?,
        promoted = ?
      WHERE id = ?`,
      [name, image || null, category, cuisine, description, phone, email, address, priceRange, promoted, id]
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
