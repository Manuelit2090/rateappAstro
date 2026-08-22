import type { MiddlewareHandler } from 'astro';
import { verifyToken } from './lib/auth';

const PUBLIC_PATHS = new Set(['/login', '/register', '/', '/forgot-password']);
const PRIVATE_CLIENT_PATHS = ['/dashboard', '/profile', '/favorites', '/discover', '/search', '/settings', '/quests', '/shop'];
const PRIVATE_RESTAURANT_PATHS = ['/restaurant-admin', '/admin'];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, cookies, redirect } = context;
  const pathname = url.pathname;

  if (pathname.startsWith('/api/') || pathname.startsWith('/_astro/') || pathname.startsWith('/assets/')) {
    return next();
  }

  const token = cookies.get('auth_token')?.value;
  if (!token) {
    return PUBLIC_PATHS.has(pathname) ? next() : redirect('/login');
  }

  const payload = verifyToken(token);
  if (!payload) {
    return PUBLIC_PATHS.has(pathname) ? next() : redirect('/login');
  }

  const userSystem = payload.sys ?? 'CLIENT';
  const restaurantId = payload.restaurant_id ?? null;

  const isRestaurantRoute = PRIVATE_RESTAURANT_PATHS.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isClientRoute = PRIVATE_CLIENT_PATHS.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');

  if (userSystem === 'RESTAURANT') {
    if (PUBLIC_PATHS.has(pathname)) {
      return redirect('/admin/dashboard');
    }

    if (isAdminPath) {
      return next();
    }

    if (restaurantId && isRestaurantRoute) {
      return next();
    }
    if (restaurantId && pathname === '/dashboard') {
      return redirect('/admin/dashboard');
    }

    if (!restaurantId) {
      return redirect('/login');
    }

    if (isClientRoute) {
      return redirect('/admin/dashboard');
    }

    if (pathname === '/dashboard') {
      return redirect('/admin/dashboard');
    }

    return next();
  }

  if (userSystem === 'ADMIN') {
    return next();
  }

  if (isRestaurantRoute) {
    return redirect('/login');
  }

  if (isClientRoute || !pathname.includes('/')) {
    return next();
  }

  return next();
};