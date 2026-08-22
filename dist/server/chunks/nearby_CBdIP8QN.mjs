import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/restaurants/nearby.ts
var nearby_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ request }) => {
	try {
		const url = new URL(request.url);
		const lat = url.searchParams.get("lat");
		const lon = url.searchParams.get("lon");
		const radius = url.searchParams.get("radius") || "10";
		if (!lat || !lon) return new Response(JSON.stringify({ error: "Coordenadas (lat, lon) requeridas" }), { status: 400 });
		const [restaurants] = await pool.execute(`SELECT 
        id, uuid, name, slug, cuisine, category, description, 
        image_url, avg_rating, review_count, price_range, 
        phone, email, address, latitude, longitude,
        (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * 
        cos(radians(longitude) - radians(?)) + sin(radians(?)) * 
        sin(radians(latitude)))) AS distance
       FROM restaurants 
       WHERE deleted_at IS NULL
       HAVING distance <= ?
       ORDER BY distance ASC
       LIMIT 50`, [
			lat,
			lon,
			lat,
			radius
		]);
		return new Response(JSON.stringify({ restaurants }), {
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
