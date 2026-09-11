import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
import { t as parseCoordinate } from "./geocoding_D4Lcvtk1.mjs";
//#region src/pages/api/restaurants/nearby.ts
var nearby_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var MIN_DISTANCE_KM = 4;
var MAX_DISTANCE_KM = 8;
function parseJsonArray(value) {
	if (Array.isArray(value)) return value;
	if (typeof value !== "string" || !value.trim()) return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
var GET = async ({ request }) => {
	try {
		const url = new URL(request.url);
		const rawLat = url.searchParams.get("lat");
		const rawLon = url.searchParams.get("lon");
		if (![...url.searchParams.keys()].every((parameter) => parameter === "lat" || parameter === "lon") || rawLat === null || rawLon === null || url.searchParams.getAll("lat").length !== 1 || url.searchParams.getAll("lon").length !== 1) return new Response(JSON.stringify({ error: "Sólo se aceptan los parámetros obligatorios lat y lon." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const lat = parseCoordinate(rawLat, -90, 90);
		const lon = parseCoordinate(rawLon, -180, 180);
		if (lat === null || lon === null) return new Response(JSON.stringify({ error: "Coordenadas válidas requeridas. Parámetros obligatorios: lat y lon." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [restaurants] = await pool.execute(`SELECT 
        id, name, slug, cuisine, category, description,
        image, rating, reviews, priceRange, promoted,
        phone, email, address, lat, lon,
        (6371 * acos(cos(radians(?)) * cos(radians(lat)) * 
        cos(radians(lon) - radians(?)) + sin(radians(?)) * 
        sin(radians(lat)))) AS distance
       FROM restaurants
       WHERE lat IS NOT NULL AND lon IS NOT NULL
       HAVING distance BETWEEN ? AND ?
       ORDER BY distance ASC
       LIMIT 50`, [
			lat,
			lon,
			lat,
			MIN_DISTANCE_KM,
			MAX_DISTANCE_KM
		]);
		const normalizedRestaurants = restaurants.map((restaurant) => ({
			...restaurant,
			rating: Number(restaurant.rating) || 0,
			distance: Number(restaurant.distance),
			reviews: parseJsonArray(restaurant.reviews),
			tags: typeof restaurant.tags === "string" ? restaurant.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : Array.isArray(restaurant.tags) ? restaurant.tags : []
		}));
		return new Response(JSON.stringify({
			restaurants: normalizedRestaurants,
			minDistanceKm: MIN_DISTANCE_KM,
			maxDistanceKm: MAX_DISTANCE_KM
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener restaurantes:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/restaurants/nearby@_@ts
var page = () => nearby_exports;
//#endregion
export { page };
