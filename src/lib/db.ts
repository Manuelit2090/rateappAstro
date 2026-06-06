/**
 * @file db.ts
 * @description Gestor de conexión a base de datos MySQL usando mysql2/promise.
 * @dependencies mysql2/promise
 */

import mysql from 'mysql2/promise';

/**
 * Pool de conexiones a la base de datos MySQL.
 * Configurado con max 10 conexiones simultáneas.
 * @type {mysql.Pool}
 */
const pool = mysql.createPool({
  host: import.meta.env.DB_HOST,
  port: Number(import.meta.env.DB_PORT),
  user: import.meta.env.DB_USER,
  password: import.meta.env.DB_PASSWORD,
  database: import.meta.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;