// src/storeUbicacion.ts
import { reactive } from 'vue';

// Definimos la estructura de la tienda para un tipado estricto
interface StoreUbicacion {
  ciudad: string;
  latitud: number | null;
  longitud: number | null;
  detectarUbicacion(): Promise<void>;
  _obtenerUbicacionPorIp(): Promise<void>;
   getCoordinates(): Coordinates | null;
}

// Interfaz para la respuesta de OpenStreetMap Nominatim
interface NominatimResponse {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
  };
}

// Interfaz para la respuesta de ipapi.co
interface IpApiResponse {
  city?: string;
  region?: string;
  country_name?: string;
  latitude?: string | number;
  longitude?: string | number;
}

// Interfaz para las coordenadas devueltas
export interface Coordinates {
  lat: number;
  lng: number;
}

export const storeUbicacion = reactive<StoreUbicacion>({
  ciudad: 'Obteniendo ubicación...',
  latitud: null,
  longitud: null,

  async detectarUbicacion(): Promise<void> {
    if (!navigator.geolocation) {
      this.ciudad = "Geolocalización no soportada";
      return;
    }

    const posicion = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }).catch(async (error: GeolocationPositionError) => {
      console.error('Geolocation error:', error);
      switch (error.code) {
        case 1:
          this.ciudad = "Permiso de ubicación denegado";
          break;
        case 2:
          this.ciudad = "Ubicación no disponible desde el servicio de red";
          break;
        case 3:
          this.ciudad = "Tiempo de espera agotado";
          break;
        default:
          this.ciudad = "Error al obtener ubicación";
      }

      // Fallback por IP si la geolocalización nativa falla.
      await this._obtenerUbicacionPorIp();
      return null;
    });

    if (!posicion) {
      return;
    }

    this.latitud = posicion.coords.latitude;
    this.longitud = posicion.coords.longitude;

    // Llamamos a OpenStreetMap Nominatim para obtener la ciudad
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitud}&lon=${this.longitud}`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      const data: NominatimResponse = await response.json();

      if (data.address) {
        this.ciudad = data.address.city || data.address.town || data.address.village || data.address.municipality || "Ciudad no detectada";
      }
    } catch (error) {
      this.ciudad = "Error al obtener ciudad";
      console.error(error);
    }
  },

  async _obtenerUbicacionPorIp(): Promise<void> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('IP geolocation no disponible');
      }
      const data: IpApiResponse = await response.json();

      if (data) {
        this.ciudad = data.city || data.region || data.country_name || this.ciudad;
        if (!this.latitud && data.latitude && data.longitude) {
          this.latitud = typeof data.latitude === 'string' ? parseFloat(data.latitude) : data.latitude;
          this.longitud = typeof data.longitude === 'string' ? parseFloat(data.longitude) : data.longitude;
        }
      }
    } catch (error) {
      console.error('IP fallback failed:', error);
    }
  },

  getCoordinates(): Coordinates | null {
    if (this.latitud !== null && this.longitud !== null) {
      return {
        lat: this.latitud,
        lng: this.longitud
      };
    }
    return null;
  }
});
