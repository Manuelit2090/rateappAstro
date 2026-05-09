
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), process.env.DB_SSL_CA || 'src/server/ca-cert.pem')),
    rejectUnauthorized: true,
  },
};

let pool;

export async function getDbConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export async function checkDbConnection() {
  try {
    const pool = await getDbConnection();
    const [rows] = await pool.query('SELECT 1');
    return { connected: true, result: rows };
  } catch (error) {
    return { connected: false, error: error.message };
  }
}
