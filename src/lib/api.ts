/**
 * @file api.ts
 * @description Cliente HTTP centralizado y servicios reutilizables para consumir endpoints de la API.
 * @dependencies fetch (nativo)
 */

/**
 * Cliente HTTP centralizado para realizar solicitudes a la API.
 * Maneja errores automáticamente y serializa/deserializa JSON.
 */
export class APIClient {
  private baseURL: string;

  constructor() {
    // Si estamos en el navegador, detectamos la URL actual automáticamente
    if (typeof window !== 'undefined') {
      const { hostname, protocol, port } = window.location;
      
      // Si estás en localhost o en una IP de red local pura sin puerto de API externo
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        this.baseURL = 'http://localhost:4321';
      } else {
        // Si entran por túnel (Ngrok) o IP LAN, usamos el dominio con el que accedieron
        // Si tu API corre en el mismo puerto que el cliente, dejamos el puerto actual, si no, puedes omitirlo
        const currentPort = port ? `:${port}` : '';
        this.baseURL = `${protocol}//${hostname}${currentPort}`;
      }
    } else {
      // Fallback para entornos de servidor (SSR) si aplica
      this.baseURL = 'http://localhost:4321'; 
    }
  }

  /**
   * Realiza solicitud GET a un endpoint.
   * @param endpoint - Ruta relativa del endpoint (ej: /api/users)
   * @returns Promise que resuelve con los datos JSON
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.baseURL + endpoint, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }

  /**
   * Realiza solicitud POST a un endpoint.
   * @param endpoint - Ruta relativa del endpoint
   * @param data - Objeto a enviar en el body
   * @returns Promise que resuelve con los datos JSON de respuesta
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API Error: ${response.status}`);
    }
    return response.json();
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }
}

export const api = new APIClient();

// Funciones específicas de la API
export const restaurantService = {
  getNearby: (lat: number, lon: number, radius: number = 10) =>
    api.get(`/api/restaurants/nearby?lat=${lat}&lon=${lon}&radius=${radius}`),
  
  search: (q: string, category?: string, page?: number) => {
    let url = `/api/restaurants/search?q=${q}`;
    if (category) url += `&category=${category}`;
    if (page) url += `&page=${page}`;
    return api.get(url);
  },

  getBySlug: (slug: string) => 
    api.get(`/api/restaurants/${slug}`),
};

export const reviewService = {
  create: (businessId: number, rating: number, title: string, content: string) =>
    api.post('/api/reviews', { business_id: businessId, rating, title, content }),

  getByBusiness: (businessId: number) =>
    api.get(`/api/reviews?business_id=${businessId}`),
};

export const pointsService = {
  get: () => api.get('/api/points'),
};

export const couponService = {
  getAll: () => api.get('/api/coupons'),

  redeem: (couponId: number) =>
    api.post('/api/coupons', { coupon_id: couponId }),
};

export const favoriteService = {
  toggle: (businessId: number) =>
    api.post('/api/favorites', { business_id: businessId }),

  getAll: () => api.get('/api/favorites'),
};

export const badgeService = {
  getUserBadges: () => api.get('/api/auth/badges'),
  addOrToggleBadge: (badgeId: number | string) => api.post('/api/auth/badges', { badgeId }),
};