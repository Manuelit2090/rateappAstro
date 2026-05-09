import { checkDbConnection } from './db.js';

export async function testDbConnection() {
  const status = await checkDbConnection();
  if (status.connected) {
    console.log('✅ Conexión establecida correctamente:', status.result);
    return true;
  } else {
    console.error('❌ Error de conexión:', status.error);
    return false;
  }
}

// Ejecutar solo si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  testDbConnection();
}
