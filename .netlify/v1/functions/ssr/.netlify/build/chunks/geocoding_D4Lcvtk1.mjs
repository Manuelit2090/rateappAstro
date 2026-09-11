//#region src/lib/geocoding.ts
/**
* Convierte un valor recibido por HTTP a una coordenada válida.
* @param value - Valor recibido desde JSON o FormData.
* @param minimum - Límite inferior permitido.
* @param maximum - Límite superior permitido.
* @returns Coordenada numérica o null si no es válida.
*/
function parseCoordinate(value, minimum, maximum) {
	const parsed = typeof value === "number" ? value : Number.parseFloat(String(value ?? "").trim());
	return Number.isFinite(parsed) && parsed >= minimum && parsed <= maximum ? parsed : null;
}
/**
* Obtiene latitud y longitud para una dirección mediante Nominatim.
* @param address - Dirección que se desea geocodificar.
* @returns Coordenadas encontradas o null si el proveedor no devuelve resultados.
*/
async function geocodeAddress(address) {
	const query = address.trim();
	if (!query) return null;
	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("format", "jsonv2");
	url.searchParams.set("limit", "1");
	url.searchParams.set("q", query);
	const response = await fetch(url, { headers: {
		Accept: "application/json",
		"User-Agent": "RateApp/1.0 (location service)"
	} });
	if (!response.ok) throw new Error(`Nominatim respondió con HTTP ${response.status}`);
	const firstResult = (await response.json())[0];
	const latitude = parseCoordinate(firstResult?.lat, -90, 90);
	const longitude = parseCoordinate(firstResult?.lon, -180, 180);
	return latitude !== null && longitude !== null ? {
		latitude,
		longitude
	} : null;
}
/**
* Usa coordenadas recibidas o geocodifica la dirección cuando faltan.
* @param address - Dirección del restaurante.
* @param rawLatitude - Latitud recibida.
* @param rawLongitude - Longitud recibida.
* @returns Coordenadas válidas o null.
*/
async function resolveCoordinates(address, rawLatitude, rawLongitude) {
	const latitude = parseCoordinate(rawLatitude, -90, 90);
	const longitude = parseCoordinate(rawLongitude, -180, 180);
	if (latitude !== null && longitude !== null) return {
		latitude,
		longitude
	};
	return geocodeAddress(address);
}
//#endregion
export { resolveCoordinates as n, parseCoordinate as t };
