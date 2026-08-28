import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

async function getBadgesColumnName(): Promise<string | null> {
  const [columnsRows] = (await pool.execute('SHOW COLUMNS FROM users')) as any[];
  const fieldNames = columnsRows.map((column: any) => column.Field);
  const matches = ['badges', 'badge_ids', 'user_badges', 'badgeIds'];
  return fieldNames.find((field: string) => matches.includes(field)) || null;
}

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get('auth_token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
  }

  const [columnsRows] = await pool.execute('SHOW COLUMNS FROM users') as any[];
  const availableFields = new Set(columnsRows.map((column: any) => column.Field));

  const fields = ['id', 'name', 'email', 'totalPoints', 'totalReviews'];
  if (availableFields.has('sys')) fields.push('sys');
  if (availableFields.has('restaurant_id')) fields.push('restaurant_id');

  const badgeColumn = await getBadgesColumnName();

  if (availableFields.has('reviews')) fields.push('reviews');
  if (availableFields.has('favoriteRestaurants')) fields.push('favoriteRestaurants');
  if (availableFields.has('favoriteRestaurant')) fields.push('favoriteRestaurant');
  if (availableFields.has('cuponsBuy')) fields.push('cuponsBuy');
  if (availableFields.has('couponsBuy')) fields.push('couponsBuy');

  const selectFields = [...fields];
  const badgeSelectAlias = 'badgeValue';

  if (badgeColumn) {
    selectFields.push(`\`${badgeColumn}\` AS \`${badgeSelectAlias}\``);
  }

  const [rows] = await pool.execute(
    `SELECT ${selectFields.join(', ')} FROM users WHERE id = ?`,
    [payload.id]
  ) as any[];

  const user = rows[0];

  if (!user) {
    return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
  }

  // Ensure cuponsBuy is parsed JSON and normalized to objects with expected keys
  let parsedCupons: any = user.cuponsBuy ?? user.couponsBuy ?? [];
  if (typeof parsedCupons === 'string') {
    try {
      parsedCupons = JSON.parse(parsedCupons);
    } catch {
      parsedCupons = [];
    }
  }

  const normalizedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    sys: user.sys ?? 'CLIENT',
    restaurant_id: user.restaurant_id ?? null,
    role: user.sys ?? 'CLIENT',
    totalPoints: user.totalPoints ?? 0,
    totalReviews: user.totalReviews ?? 0,
    reviews: user.reviews ?? [],
    favoriteRestaurants: user.favoriteRestaurants ?? user.favoriteRestaurant ?? [],
    favoriteRestaurant: user.favoriteRestaurant ?? user.favoriteRestaurants ?? [],
    badges: user.badgeValue ?? user.badges ?? [],
    cuponsBuy: parsedCupons,
    couponsBuy: parsedCupons,
  };

  return new Response(JSON.stringify({ user: normalizedUser }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};