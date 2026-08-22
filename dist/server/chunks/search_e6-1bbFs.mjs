import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/restaurants/search.ts
var search_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ request }) => {
	try {
		const url = new URL(request.url);
		const q = url.searchParams.get("q") || "";
		const category = url.searchParams.get("category");
		const page = parseInt(url.searchParams.get("page") || "1", 10) || 1;
		const limit = 20;
		const offset = (page - 1) * limit;
		let query = "SELECT * FROM restaurants WHERE 1=1";
		const params = [];
		if (q) {
			query += " AND (name LIKE ? OR description LIKE ? OR cuisine LIKE ?)";
			params.push(`%${q}%`, `%${q}%`, `%${q}%`);
		}
		if (category) {
			query += " AND category = ?";
			params.push(category);
		}
		query += ` ORDER BY rating DESC LIMIT ${limit} OFFSET ${offset}`;
		const [restaurants] = await pool.execute(query, params);
		return new Response(JSON.stringify({
			restaurants,
			page,
			limit
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error en búsqueda:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/restaurants/search@_@ts
var page = () => search_exports;
//#endregion
export { page };
