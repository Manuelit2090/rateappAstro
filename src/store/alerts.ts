/**
 * @file avisos.ts
 * @description Store reactivo (nanostores) para el sistema de avisos/notificaciones.
 * @note A diferencia de `reactive()` de Vue, un nanostore es el mismo objeto sin
 *       importar en qué isla de Astro (Vue) se importe, así que sirve para
 *       disparar un aviso desde un componente y mostrarlo en otro distinto.
 * @dependencies nanostores
 */

import { atom } from 'nanostores';

export type AvisoTipo = 'success' | 'error' | 'info' | 'warning';

export interface Aviso {
  id: string;
  message: string;
  type: AvisoTipo;
  duration?: number; // ms; si no se pasa, usa DEFAULT_DURATION
}

const DEFAULT_DURATION = 4000;

export const avisos = atom<Aviso[]>([]);

/**
 * Muestra un nuevo aviso. Se autoelimina pasado `duration` ms.
 * @returns el id generado, útil si quieres cerrarlo manualmente antes.
 */
export function showAviso(
  message: string,
  type: AvisoTipo = 'info',
  duration: number = DEFAULT_DURATION
): string {
  const id = crypto.randomUUID();
  const nuevoAviso: Aviso = { id, message, type, duration };

  avisos.set([...avisos.get(), nuevoAviso]);

  if (duration > 0) {
    setTimeout(() => removeAviso(id), duration);
  }

  return id;
}

/**
 * Elimina un aviso puntual por id (ej. al hacer click en cerrar, o al vencer el timeout).
 */
export function removeAviso(id: string) {
  avisos.set(avisos.get().filter((a) => a.id !== id));
}

/**
 * Limpia todos los avisos activos.
 */
export function clearAvisos() {
  avisos.set([]);
}