
function calculeDistance(userLat, userLon, resLat, resLon) {
  const R = 6371; // Radio de la Tierra en km

  // Convertir grados a radianes
  const dLat = (userLat - resLat) * (Math.PI / 180);
  const dLon = (userLon - resLon) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(userLat * (Math.PI / 180)) *
      Math.cos(resLat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distancia en km
}
