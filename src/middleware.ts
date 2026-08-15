/**
 * @file middleware.ts
 * @description Middleware de Astro para proteger rutas privadas según el rol del usuario autenticado.
 * @depends astro:middleware, src/lib/auth
 */

import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './lib/auth';

const PUBLIC_PATHS = ['/login', '/register', '/', '/forgot-password'];
const PRIVATE_CLIENT_PATHS = ['/dashboard', '/profile', '/favorites', '/discover', '/search', '/settings', '/quests', '/shop'];
const PRIVATE_RESTAURANT_PATHS = ['/restaurant-admin'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, cookies, redirect } = context;

  if (pathname.startsWith('/api/')) {
    return next();
  }

  if (PUBLIC_PATHS.includes(pathname)) {
    return next();
  }

  const token = cookies.get('auth_token')?.value;

  if (!token) {
    return redirect('/login');
  }

  const payload = verifyToken(token);

  if (!payload) {
    return redirect('/login');
  }

  const userSystem = payload.sys ?? 'CLIENT';
  const restaurantId = payload.restaurant_id ?? null;

  const isRestaurantRoute = PRIVATE_RESTAURANT_PATHS.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isClientRoute = PRIVATE_CLIENT_PATHS.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (userSystem === 'RESTAURANT') {
    if (restaurantId && isRestaurantRoute) {
      return next();
    }

    if (restaurantId && pathname === '/dashboard') {
      return redirect('/restaurant-admin');
    }

    if (!restaurantId) {
      return redirect('/login');
    }

    if (isClientRoute) {
      return redirect('/restaurant-admin');
    }

    return next();
  }

  if (userSystem === 'ADMIN') {
    return next();
  }

  if (isRestaurantRoute || pathname === '/restaurant-admin') {
    return redirect('/login');
  }

  if (isClientRoute) {
    return next();
  }

  if (userSystem !== 'CLIENT') {
    return redirect('/login');
  }

  return next();
});
