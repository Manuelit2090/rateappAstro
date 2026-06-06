/**
 * Calcula la distancia entre dos coordenadas geográficas usando la fórmula de Haversine.
 * 
 * @param userLat - Latitud del usuario en grados decimales.
 * @param userLon - Longitud del usuario en grados decimales.
 * @param resLat - Latitud del destino/restaurante en grados decimales.
 * @param resLon - Longitud del destino/restaurante en grados decimales.
 * @returns Distancia calculada en kilómetros (km).
 */
export function calculeDistance(
  userLat: number,
  userLon: number,
  resLat: number,
  resLon: number
): number {
  const R = 6371; // Radio de la Tierra en km

  // Convertir grados a radianes
  const userLatRad = userLat * (Math.PI / 180);
  const userLonRad = userLon * (Math.PI / 180);
  const resLatRad = resLat * (Math.PI / 180);
  const resLonRad = resLon * (Math.PI / 180);

  // Diferencias en radianes
  const dLat = resLatRad - userLatRad;
  const dLon = resLonRad - userLonRad;

  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLatRad) *
      Math.cos(resLatRad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distancia en km
}
