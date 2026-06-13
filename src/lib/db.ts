import mysql from 'mysql2/promise';

/**
 * Pool de conexiones a la base de datos MySQL con soporte SSL para Aiven Cloud.
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
  ssl: {
    rejectUnauthorized: false // Permite la conexión cifrada requerida por Aiven
  }
});

export default pool;
