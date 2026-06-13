import type { APIRoute } from 'astro';
import pool from '../../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const [result] = await pool.execute('SELECT 1 as connected') as any[];
    
    if (result.length > 0) {
      return new Response(
        JSON.stringify({ 
          status: 'connected',
          message: 'Conexión a la base de datos exitosa',
          timestamp: new Date().toISOString()
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: 'Error de conexión a la base de datos',
        error: String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
