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
  private baseURL = '';

  /**
   * Realiza solicitud GET a un endpoint.
   * @param endpoint - Ruta relativa del endpoint (ej: /api/users)
   * @returns Promise que resuelve con los datos JSON
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.baseURL + endpoint);
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.baseURL + endpoint, {
      method: 'DELETE',
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
  
  search: (q: string, category?: string, page: number = 1) => {
    let url = `/api/restaurants/search?q=${q}&page=${page}`;
    if (category) url += `&category=${category}`;
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
