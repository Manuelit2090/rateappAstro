import { checkDbConnection } from '../../server/db.js';

export async function GET() {
  const status = await checkDbConnection();
  return new Response(JSON.stringify(status), {
    status: status.connected ? 200 : 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
