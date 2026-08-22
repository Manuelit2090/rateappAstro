import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/favorite.ts
var favorite_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request, cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const { slug } = await request.json();
		if (!slug || typeof slug !== "string") return new Response(JSON.stringify({ error: "Slug requerido" }), { status: 400 });
		const [columnsRows] = await pool.execute("SHOW COLUMNS FROM users");
		const favoriteColumn = columnsRows.map((column) => column.Field).find((field) => ["favoriteRestaurant", "favoriteRestaurants"].includes(field));
		if (!favoriteColumn) return new Response(JSON.stringify({ error: "No existe columna de favoritos en users" }), { status: 500 });
		const [rows] = await pool.execute(`SELECT \`${favoriteColumn}\` FROM users WHERE id = ?`, [payload.id]);
		const rawFavorites = rows[0]?.[favoriteColumn];
		let favorites = [];
		if (Array.isArray(rawFavorites)) favorites = rawFavorites;
		else if (typeof rawFavorites === "string" && rawFavorites.trim()) try {
			const parsed = JSON.parse(rawFavorites);
			if (Array.isArray(parsed)) favorites = parsed;
		} catch {
			favorites = [];
		}
		const isFavorite = favorites.includes(slug);
		const updatedFavorites = isFavorite ? favorites.filter((item) => item !== slug) : [...favorites, slug];
		await pool.execute(`UPDATE users SET \`${favoriteColumn}\` = ? WHERE id = ?`, [JSON.stringify(updatedFavorites), payload.id]);
		return new Response(JSON.stringify({
			favorite: !isFavorite,
			favorites: updatedFavorites
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al actualizar favoritos:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/favorite@_@ts
var page = () => favorite_exports;
//#endregion
export { page };
