/**
 * @file checkLogin.ts
 * @description Valida credenciales de usuario consultando la API de autenticación.
 * @dependencies src/lib/api
 */

import type { User } from '../../data/user';

/**
 * Verifica las credenciales del usuario contra la API de login.
 * Si son válidas, obtiene los datos del usuario autenticado.
 * @param email - Email del usuario (se normaliza a minúsculas)
 * @param password - Contraseña en texto plano
 * @returns Promise que resuelve a objeto User si el login es exitoso, null si falla
 */
export async function checkLogin(email: string, password: string): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    // Obtener datos del usuario desde /api/auth/me
    const meResponse = await fetch('/api/auth/me');
    if (!meResponse.ok) return null;
    
    const userData = await meResponse.json();
    
    // Mapear respuesta de API al tipo User
    const user: User = {
      id: String(userData.user.id),
      name: userData.user.name,
      email: userData.user.email,
      password: '', // No almacenar contraseña en cliente
      totalPoints: userData.user.totalPoints || 0,
      totalReviews: userData.user.totalReviews || 0,
      reviews: userData.user.reviews || [],
      favoriteRestaurant:
        userData.user.favoriteRestaurant || userData.user.favoriteRestaurants || [],
      cuponsBuy: userData.user.cuponsBuy || userData.user.couponsBuy || [],
      currentLocation: { lat: 0, lng: 0 }
    };

    return user;
  } catch (error) {
    console.error('Error en checkLogin:', error);
    return null;
  }
}
