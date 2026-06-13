/**
 * @file dataUser.ts
 * @description Almacenamiento reactivo de datos del usuario autenticado (en memoria).
 * @note Las cookies httpOnly se envían automáticamente en cada request; este store
 *       es solo un caché local. Para obtener datos actualizados, usar /api/auth/me
 * @dependencies vue (reactive), src/data/user (tipos)
 */

import { reactive } from 'vue';
import type { User } from '../data/user';

export type SessionUser = Omit<User, 'password'>;

export const dataUser = reactive<{ user: SessionUser | null }>({
  user: null
});

/**
 * Actualiza los datos del usuario en el store reactivo.
 * @param user - Objeto User o SessionUser a almacenar
 */
export function setDataUser(user: User | SessionUser) {
  let session: SessionUser;
  
  if ('password' in user) {
    const { password, ...rest } = user;
    session = rest;
  } else {
    session = user;
  }
  
  dataUser.user = session;
  // Las cookies httpOnly se manejan automáticamente en el navegador
}

/**
 * Carga datos del usuario desde la API (verificando sesión válida).
 * @returns Promise que resuelve cuando se cargan los datos
 */
export async function loadDataUserFromAPI() {
  if (typeof window === 'undefined') return;
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include', // Incluir cookies httpOnly
    });

    if (response.ok) {
      const data = await response.json();
      if (data.user) {
        setDataUser(data.user);
      }
    } else {
      // Sesión inválida o expirada
      logoutUser();
    }
  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
  }
}

/**
 * Limpia la sesión del usuario en el store.
 */
export function logoutUser() {
  dataUser.user = null;
  // Las cookies se limpian en el servidor mediante endpoint /api/auth/logout
}

/**
 * @deprecated Mantener solo para compatibilidad. Usar loadDataUserFromAPI() en su lugar.
 */
export function loadDataUserFromStorage() {
  // Esta función ya no hace nada; las cookies se manejan automáticamente
  console.warn('loadDataUserFromStorage() está deprecada. Usar loadDataUserFromAPI() en su lugar.');
}

