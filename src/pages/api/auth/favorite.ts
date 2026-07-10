import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get('auth_token')?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
    }

    const { slug } = await request.json();
    if (!slug || typeof slug !== 'string') {
      return new Response(JSON.stringify({ error: 'Slug requerido' }), { status: 400 });
    }

    const [columnsRows] = await pool.execute('SHOW COLUMNS FROM users') as any[];
    const favoriteColumn = columnsRows
      .map((column: any) => column.Field)
      .find((field: string) => ['favoriteRestaurant', 'favoriteRestaurants'].includes(field));

    if (!favoriteColumn) {
      return new Response(
        JSON.stringify({ error: 'No existe columna de favoritos en users' }),
        { status: 500 }
      );
    }

    const [rows] = await pool.execute(
      `SELECT \`${favoriteColumn}\` FROM users WHERE id = ?`,
      [payload.id]
    ) as any[];

    const rawFavorites = rows[0]?.[favoriteColumn];
    let favorites: string[] = [];

    if (Array.isArray(rawFavorites)) {
      favorites = rawFavorites;
    } else if (typeof rawFavorites === 'string' && rawFavorites.trim()) {
      try {
        const parsed = JSON.parse(rawFavorites);
        if (Array.isArray(parsed)) favorites = parsed;
      } catch {
        favorites = [];
      }
    }

    const isFavorite = favorites.includes(slug);
    const updatedFavorites = isFavorite
      ? favorites.filter((item) => item !== slug)
      : [...favorites, slug];

    await pool.execute(
      `UPDATE users SET \`${favoriteColumn}\` = ? WHERE id = ?`,
      [JSON.stringify(updatedFavorites), payload.id]
    );

    return new Response(
      JSON.stringify({
        favorite: !isFavorite,
        favorites: updatedFavorites,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al actualizar favoritos:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
