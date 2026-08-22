import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/restaurants/[slug].ts
var _slug__exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ params }) => {
	try {
		const { slug } = params;
		const [restaurants] = await pool.execute("SELECT * FROM restaurants WHERE slug = ?", [slug]);
		if (!restaurants.length) return new Response(JSON.stringify({ error: "Restaurante no encontrado" }), { status: 404 });
		const restaurant = restaurants[0];
		const [reviews] = await pool.execute(`SELECT r.id, r.rating, r.title, r.content, r.created_at, 
              c.name as author
       FROM reviews r
       JOIN users c ON r.customer_id = c.id
       WHERE r.business_id = ? AND r.deleted_at IS NULL
       ORDER BY r.created_at DESC
       LIMIT 10`, [restaurant.id]);
		return new Response(JSON.stringify({ restaurant: {
			...restaurant,
			recent_reviews: reviews
		} }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener restaurante:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/restaurants/[slug]@_@ts
var page = () => _slug__exports;
//#endregion
export { page };
