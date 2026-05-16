import type { APIRoute } from 'astro';
import pool from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Name and email are required' }), { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO example_table (name, email) VALUES (?, ?)',
      [name, email]
    ) as any[];

    return new Response(JSON.stringify({ message: 'Data inserted successfully', id: result.insertId }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during operation:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};