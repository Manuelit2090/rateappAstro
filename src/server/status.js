import { checkDbConnection } from './db.js';

(async () => {
  const status = await checkDbConnection();
  if (status.connected) {
    console.log('✅ Conexión establecida correctamente:', status.result);
  } else {
    console.error('❌ Error de conexión:', status.error);
  }
})();
