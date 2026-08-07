import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

/**
 * Función auxiliar para detectar dinámicamente el nombre de la columna en la tabla users
 * (Soporta 'badges', 'badge_ids', 'user_badges', etc.)
 */
async function getBadgesColumnName(): Promise<string | null> {
  const [columnsRows] = (await pool.execute('SHOW COLUMNS FROM users')) as any[];
  const fieldNames = columnsRows.map((column: any) => column.Field);

  // Busca el nombre de columna más común para almacenar badges
  const matches = ['badges', 'badge_ids', 'user_badges', 'badgeIds'];
  return fieldNames.find((field: string) => matches.includes(field)) || null;
}

/**
 * Función auxiliar para parsear los badges recibidos de MySQL (JSON string o Array)
 */
function parseBadges(rawBadges: any): (string | number)[] {
  if (Array.isArray(rawBadges)) return rawBadges;
  if (typeof rawBadges === 'string' && rawBadges.trim()) {
    try {
      const parsed = JSON.parse(rawBadges);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [];
    }
  }
  return [];
}

// ==========================================
// GET: Obtener las insignias (IDs) del usuario
// ==========================================
export const GET: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get('auth_token')?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
    }

    const badgeColumn = await getBadgesColumnName();
    if (!badgeColumn) {
      return new Response(
        JSON.stringify({ error: 'No existe la columna de badges en la tabla users' }),
        { status: 500 }
      );
    }

    const [rows] = (await pool.execute(
      `SELECT \`${badgeColumn}\` FROM users WHERE id = ?`,
      [payload.id]
    )) as any[];

    const badges = parseBadges(rows[0]?.[badgeColumn]);

    return new Response(JSON.stringify({ badges }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener badges:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// ==========================================
// POST: Agregar o togglear una insignia (badgeId)
// ==========================================
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

    const body = await request.json();
    // Soporta tanto 'badgeId' como 'badge_id' o 'id'
    const badgeId = body.badgeId ?? body.badge_id ?? body.id;

    if (badgeId === undefined || badgeId === null) {
      return new Response(
        JSON.stringify({ error: 'El parámetro badgeId es requerido' }),
        { status: 400 }
      );
    }

    const badgeColumn = await getBadgesColumnName();
    if (!badgeColumn) {
      return new Response(
        JSON.stringify({ error: 'No existe la columna de badges en la tabla users' }),
        { status: 500 }
      );
    }

    // Obtener las insignias actuales
    const [rows] = (await pool.execute(
      `SELECT \`${badgeColumn}\` FROM users WHERE id = ?`,
      [payload.id]
    )) as any[];

    const currentBadges = parseBadges(rows[0]?.[badgeColumn]);

    // Comprobar si ya la tiene guardada (compara strings y números homogéneamente)
    const hasBadge = currentBadges.some((b) => String(b) === String(badgeId));

    // Si ya la tiene se remueve, si no la tiene se añade (Toggle)
    const updatedBadges = hasBadge
      ? currentBadges.filter((b) => String(b) !== String(badgeId))
      : [...currentBadges, badgeId];

    // Guardar array serializado a JSON en MySQL
    await pool.execute(
      `UPDATE users SET \`${badgeColumn}\` = ? WHERE id = ?`,
      [JSON.stringify(updatedBadges), payload.id]
    );

    return new Response(
      JSON.stringify({
        unlocked: !hasBadge,
        badges: updatedBadges,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al actualizar badges:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};