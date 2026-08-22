import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './lib/auth';

const PUBLIC_PATHS = new Set(['/login', '/register', '/', '/forgot-password']);
const PRIVATE_CLIENT_PATHS = ['/dashboard', '/profile', '/favorites', '/discover', '/search', '/settings', '/quests', '/shop'];
const PRIVATE_RESTAURANT_PATHS = ['/restaurant-admin', '/admin'];

function isProtectedPath(pathname: string, routes: string[]): boolean {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const pathname = url.pathname;

  if (pathname.startsWith('/api/') || pathname.startsWith('/_astro/') || pathname.startsWith('/assets/')) {
    return next();
  }

  if (PUBLIC_PATHS.has(pathname)) {
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
  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');

  if (userSystem === 'RESTAURANT') {
    if (restaurantId && isRestaurantRoute) {
      return next();
    }
    if (restaurantId && pathname === '/dashboard') {
      return redirect('/restaurant-admin');
    }
    // Allow access to /admin routes even if restaurant_id is not yet set
    if (!restaurantId && isAdminPath) {
      return next();
    }

    if (!restaurantId) {
      return redirect('/login');
    }

    if (isClientRoute) {
      return redirect('/restaurant-admin');
    }

    if (pathname === '/dashboard') {
      return redirect('/restaurant-admin');
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
});