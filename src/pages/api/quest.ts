/**
 * @file quests.ts
 * @description Endpoints para listar y consultar misiones/desafíos (quests) vigentes.
 * @route GET /api/quests
 * @dependencies src/lib/db
 */

import type { APIRoute } from 'astro';
import pool from '../../../lib/db';

export const GET: APIRoute = async () => {
  try {
    // Consultamos solo las quests cuya fecha de expiración sea mayor o igual a la fecha/hora actual
    const [quests] = await pool.execute(
      `SELECT 
        id, 
        slug, 
        description, 
        category, 
        initial_time, 
        expiresIn, 
        rewartPoints 
      FROM quests 
      WHERE expiresIn >= NOW()`
    ) as any[];

    return new Response(
      JSON.stringify({ 
        success: true,
        count: quests.length,
        quests 
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error al obtener las quests:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Error interno del servidor al consultar quests' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};