/**
 * @file restaurant.ts
 * @description Endpoint para consultar, crear y actualizar datos de un restaurante.
 */

import type { APIRoute } from 'astro';
import type { ResultSetHeader } from 'mysql2';
import pool from '../../lib/db';
import { generateToken, verifyToken } from '../../lib/auth';
import { parseCoordinate, resolveCoordinates } from '../../lib/geocoding';

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
    const rawLatitude = body.latitude ?? body.lat ?? null;
    const rawLongitude = body.longitude ?? body.lon ?? null;
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

    const coordinates = await resolveCoordinates(address, rawLatitude, rawLongitude);
    if (!coordinates) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No se pudo convertir la dirección en coordenadas válidas.',
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const lat = coordinates.latitude;
    const lon = coordinates.longitude;

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
    const safePhone = phone || null;
    const safeEmail = email || null;
    const safeCuisine = cuisine || null;
    const safeDescription = description || null;
    const safePriceRange = priceRange || null;

    const [result] = await pool.execute(
      `INSERT INTO restaurants (name, image, slug, reviews, category, cuisine, description, priceRange, promoted, phone, email, address, lat, lon)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        finalImage,
        finalSlug,
        finalReviews,
        category,
        safeCuisine,
        safeDescription,
        safePriceRange,
        promoted,
        safePhone,
        safeEmail,
        address,
        lat,
        lon,
      ]
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
        lat,
        lon,
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
        lat: parseCoordinate(restaurant.lat, -90, 90),
        lon: parseCoordinate(restaurant.lon, -180, 180),
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
    const body = await request.json().catch(() => ({}));
    const { id } = body || {};

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Falta el id del restaurante' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Obtener los datos actuales del restaurante
    const [rows] = await pool.execute(
      'SELECT * FROM restaurants WHERE id = ? LIMIT 1',
      [id]
    ) as any[];

    const current = rows?.[0];

    if (!current) {
      return new Response(JSON.stringify({ success: false, error: 'Restaurante no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Conservar datos existentes si solo se envían algunos campos en la petición
    const updatedName = body.name !== undefined ? body.name : current.name;
    const updatedImage = body.image !== undefined ? body.image : current.image;
    const updatedCategory = body.category !== undefined ? body.category : current.category;
    const updatedCuisine = body.cuisine !== undefined ? body.cuisine : current.cuisine;
    const updatedDescription = body.description !== undefined ? body.description : current.description;
    const updatedPhone = body.phone !== undefined ? body.phone : current.phone;
    const updatedEmail = body.email !== undefined ? body.email : current.email;
    const updatedAddress = body.address !== undefined ? body.address : current.address;
    const addressChanged = body.address !== undefined && String(body.address).trim() !== String(current.address ?? '').trim();
    const coordinates = addressChanged || body.lat !== undefined || body.lon !== undefined
      ? await resolveCoordinates(String(updatedAddress ?? ''), body.lat, body.lon)
      : {
          lat: parseCoordinate(current.lat, -90, 90),
          lon: parseCoordinate(current.lon, -180, 180),
        };

    if (!coordinates || coordinates.lat === null || coordinates.lon === null) {
      return new Response(JSON.stringify({ success: false, error: 'Latitud y longitud inválidas.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const updatedPriceRange = body.priceRange !== undefined ? body.priceRange : current.priceRange;
    const updatedPromoted = body.promoted !== undefined ? body.promoted : current.promoted;

    // 3. Ejecutar la actualización con MySQL
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
        lat = ?,
        lon = ?,
        priceRange = ?,
        promoted = ?
      WHERE id = ?`,
      [
        updatedName,
        updatedImage || null,
        updatedCategory,
        updatedCuisine,
        updatedDescription,
        updatedPhone,
        updatedEmail,
        updatedAddress,
        coordinates.lat,
        coordinates.lon,
        updatedPriceRange,
        updatedPromoted,
        id,
      ]
    );

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Restaurante actualizado correctamente',
      imageUrl: updatedImage 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error al actualizar el restaurante:', error);

    return new Response(JSON.stringify({ 
      success: false, 
      error: error?.message || 'Error al actualizar el restaurante' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};