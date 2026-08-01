/**
 * @file quest.ts
 * @description Endpoint para listar misiones desde la base de datos MySQL.
 */

import type { APIRoute } from 'astro';
import pool from '../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM quests') as any[];

    const quests = Array.isArray(rows)
      ? rows.map((item) => ({
          id: item.id,
          slug: item.slug,
          description: item.description,
          category: item.category,
          initial_time: item.initial_time,
          expiresIn: item.expiresIn,
          reward: Number(item.rewartPoints ?? 0),
          current: Number(item.current ?? 0),
          total: Number(item.total ?? 1),
        }))
      : [];

    return new Response(JSON.stringify({
      success: true,
      quests,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al obtener las quests:', error);

    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno del servidor al consultar quests',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
