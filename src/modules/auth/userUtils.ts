import type { User } from '../../data/user';
import { localUsers } from '../../data/localUsers';

/**
 * Obtiene los datos de un usuario por ID o email
 */
export function getDataUser(identifier: string): User | undefined {
  const normalized = identifier.trim().toLowerCase();
  return localUsers.find(
    (user) =>
      user.id.toLowerCase() === normalized ||
      user.email.toLowerCase() === normalized
  );
}

/**
 * Crea un objeto User con los datos proporcionados
 * Útil para validar que tenga la estructura correcta
 */
export function createUser(data: Partial<User>): User {
  if (!data.id || !data.name || !data.email || !data.password) {
    throw new Error('Usuario debe tener id, name, email y password');
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    password: data.password,
    totalPoints: data.totalPoints ?? 0,
    totalReviews: data.totalReviews ?? 0,
    reviews: data.reviews ?? [],
    favoriteRestaurant: data.favoriteRestaurant ?? [],
    cuponsBuy: data.cuponsBuy ?? [],
    currentLocation: data.currentLocation,
  };
}

/**
 * Exporta los datos del usuario sin incluir la contraseña
 * Retorna un objeto seguro para usar en la UI/store
 */
export function exportDataUser(user: User) {
  const { password, ...safeUser } = user;
  return safeUser;
}
