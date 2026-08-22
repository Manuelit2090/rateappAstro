import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/favorites.ts
var favorites_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var POST = async ({ request, cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const { business_id } = await request.json();
		if (!business_id) return new Response(JSON.stringify({ error: "business_id requerido" }), { status: 400 });
		const [columnsRows] = await pool.execute("SHOW COLUMNS FROM users");
		const favoriteColumn = columnsRows.map((column) => column.Field).find((field) => ["favoriteRestaurant", "favoriteRestaurants"].includes(field));
		if (!favoriteColumn) return new Response(JSON.stringify({ error: "No existe columna de favoritos en users" }), { status: 500 });
		const [rows] = await pool.execute(`SELECT \`${favoriteColumn}\` FROM users WHERE id = ?`, [payload.id]);
		if (rows.length === 0) return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
		const rawFavorites = rows[0]?.[favoriteColumn];
		let favorites = [];
		if (Array.isArray(rawFavorites)) favorites = rawFavorites;
		else if (typeof rawFavorites === "string" && rawFavorites.trim()) try {
			const parsed = JSON.parse(rawFavorites);
			if (Array.isArray(parsed)) favorites = parsed;
		} catch {
			favorites = [];
		}
		const index = favorites.indexOf(business_id);
		let isFavorite = false;
		let message = "";
		let status = 200;
		if (index !== -1) {
			favorites.splice(index, 1);
			message = "Eliminado de favoritos";
		} else {
			favorites.push(business_id);
			isFavorite = true;
			message = "Agregado a favoritos";
			status = 201;
		}
		await pool.execute(`UPDATE users SET \`${favoriteColumn}\` = ? WHERE id = ?`, [JSON.stringify(favorites), payload.id]);
		return new Response(JSON.stringify({
			message,
			favorite: isFavorite
		}), {
			status,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al cambiar favorito:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
var GET = async ({ cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const [columnsRows] = await pool.execute("SHOW COLUMNS FROM users");
		const favoriteColumn = columnsRows.map((column) => column.Field).find((field) => ["favoriteRestaurant", "favoriteRestaurants"].includes(field));
		if (!favoriteColumn) return new Response(JSON.stringify({ favorites: [] }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		const [rows] = await pool.execute(`SELECT \`${favoriteColumn}\` FROM users WHERE id = ?`, [payload.id]);
		if (rows.length === 0) return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
		const rawFavorites = rows[0]?.[favoriteColumn];
		let favorites = [];
		if (Array.isArray(rawFavorites)) favorites = rawFavorites;
		else if (typeof rawFavorites === "string" && rawFavorites.trim()) try {
			const parsed = JSON.parse(rawFavorites);
			if (Array.isArray(parsed)) favorites = parsed;
		} catch {
			favorites = [];
		}
		if (!Array.isArray(favorites) || favorites.length === 0) return new Response(JSON.stringify({ favorites: [] }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		const idFavorites = [];
		const slugFavorites = [];
		favorites.forEach((item) => {
			if (typeof item === "number") idFavorites.push(item);
			else if (typeof item === "string") {
				const trimmed = item.trim();
				const parsedId = Number(trimmed);
				if (trimmed !== "" && !Number.isNaN(parsedId) && String(parsedId) === trimmed) idFavorites.push(parsedId);
				else if (trimmed !== "") slugFavorites.push(trimmed);
			}
		});
		const conditions = [];
		const values = [];
		if (idFavorites.length > 0) {
			conditions.push(`id IN (${idFavorites.map(() => "?").join(",")})`);
			values.push(...idFavorites);
		}
		if (slugFavorites.length > 0) {
			conditions.push(`slug IN (${slugFavorites.map(() => "?").join(",")})`);
			values.push(...slugFavorites);
		}
		if (conditions.length === 0) return new Response(JSON.stringify({ favorites: [] }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		const [restaurants] = await pool.execute(`SELECT 
        id, 
        slug, 
        name, 
        cuisine, 
        category, 
        description, 
        image, 
        CAST(rating AS CHAR) as rating, 
        reviews, 
        distance, 
        priceRange, 
        promoted, 
        phone, 
        email, 
        address 
       FROM restaurants 
       WHERE ${conditions.join(" OR ")}`, values);
		const formattedRestaurants = restaurants.map((r) => ({
			...r,
			rating: parseFloat(r.rating) || 0,
			promoted: !!r.promoted
		}));
		return new Response(JSON.stringify({ favorites: formattedRestaurants }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener favoritos:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/favorites@_@ts
var page = () => favorites_exports;
//#endregion
export { page };
