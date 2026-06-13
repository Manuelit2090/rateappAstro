interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
}

interface NominatimResponse {
  address?: NominatimAddress;
  display_name?: string;
}

// Ahora la función retorna una Promesa que resuelve a un string
export function translateCity(latitud: number, longitud: number): Promise<string> {
  const url = `https://openstreetmap.org{latitud}&lon=${longitud}`;

  return fetch(url)
    .then((response: Response) => {
      if (!response.ok) throw new Error(`Error de red: ${response.status}`);
      return response.json() as Promise<NominatimResponse>;
    })
    .then((data: NominatimResponse) => {
      if (data.address) {
        const ciudad = data.address.city || data.address.town || data.address.village || data.address.municipality;
        return ciudad || data.display_name || "Ubicación desconocida";
      }
      return "No se encontraron resultados";
    })
    .catch((error: unknown) => {
      console.error("Error al traducir ciudad:", error);
      return "Error al obtener ubicación";
    });
}
