const fs = require('fs');
const mysql = require('mysql2/promise');
const env = fs.readFileSync('.env', 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .reduce((acc, line) => {
    const [k, v] = line.split('=');
    acc[k] = v;
    return acc;
  }, {});

(async () => {
  const conn = await mysql.createConnection({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  });

  const [columns] = await conn.query('SHOW COLUMNS FROM users');
  console.log('columns:', JSON.stringify(columns, null, 2));

  const [sample] = await conn.query('SELECT * FROM users LIMIT 1');
  console.log('sample:', JSON.stringify(sample[0], null, 2));

  await conn.end();
})();
