/**
 * @file geocoding.ts
 * @description Convierte direcciones en coordenadas decimales usando Nominatim.
 * @dependencies fetch, OpenStreetMap Nominatim
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Convierte un valor recibido por HTTP a una coordenada válida.
 * @param value - Valor recibido desde JSON o FormData.
 * @param minimum - Límite inferior permitido.
 * @param maximum - Límite superior permitido.
 * @returns Coordenada numérica o null si no es válida.
 */
export function parseCoordinate(value: unknown, minimum: number, maximum: number): number | null {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value ?? '').trim());
  return Number.isFinite(parsed) && parsed >= minimum && parsed <= maximum ? parsed : null;
}

/**
 * Obtiene latitud y longitud para una dirección mediante Nominatim.
 * @param address - Dirección que se desea geocodificar.
 * @returns Coordenadas encontradas o null si el proveedor no devuelve resultados.
 */
export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  const query = address.trim();
  if (!query) return null;

  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', '1');
  url.searchParams.set('q', query);

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'RateApp/1.0 (location service)',
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim respondió con HTTP ${response.status}`);
  }

  const results = await response.json() as Array<{ lat?: string; lon?: string }>;
  const firstResult = results[0];
  const latitude = parseCoordinate(firstResult?.lat, -90, 90);
  const longitude = parseCoordinate(firstResult?.lon, -180, 180);

  return latitude !== null && longitude !== null ? { latitude, longitude } : null;
}

/**
 * Usa coordenadas recibidas o geocodifica la dirección cuando faltan.
 * @param address - Dirección del restaurante.
 * @param rawLatitude - Latitud recibida.
 * @param rawLongitude - Longitud recibida.
 * @returns Coordenadas válidas o null.
 */
export async function resolveCoordinates(
  address: string,
  rawLatitude: unknown,
  rawLongitude: unknown
): Promise<Coordinates | null> {
  const latitude = parseCoordinate(rawLatitude, -90, 90);
  const longitude = parseCoordinate(rawLongitude, -180, 180);

  if (latitude !== null && longitude !== null) {
    return { latitude, longitude };
  }

  return geocodeAddress(address);
}