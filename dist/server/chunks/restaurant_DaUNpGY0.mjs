import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken, n as generateToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/restaurant.ts
var restaurant_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
function buildAuthCookie(token) {
	return `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict`;
}
var POST = async ({ request, cookies }) => {
	try {
		const contentType = request.headers.get("content-type") ?? "";
		let body = {};
		if (contentType.includes("application/json")) body = await request.json().catch(() => ({}));
		else {
			const formData = await request.formData().catch(() => null);
			if (formData) body = Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, typeof value === "string" ? value : String(value)]));
		}
		const parseString = (value) => typeof value === "string" ? value.trim() : "";
		const name = parseString(body.name ?? body.restaurantName ?? body.restaurant_name);
		const category = parseString(body.category);
		const image = parseString(body.image);
		const address = parseString(body.address);
		const reviews = (() => {
			if (Array.isArray(body.reviews)) return body.reviews;
			if (typeof body.reviews === "string") try {
				const parsed = JSON.parse(body.reviews);
				return Array.isArray(parsed) ? parsed : [];
			} catch {
				return [];
			}
			return [];
		})();
		const cuisine = parseString(body.cuisine ?? body.cuisineType);
		const description = parseString(body.description);
		const email = parseString(body.email).toLowerCase();
		const phone = parseString(body.phone ?? body.phone_number ?? body.telephone);
		const priceRange = parseString(body.priceRange ?? body.price_range);
		const promoted = body.promoted === true || body.promoted === "true" || body.promoted === "1";
		if (!name || !category || !address) return new Response(JSON.stringify({
			success: false,
			error: "Faltan campos obligatorios: name, category y address son requeridos."
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "restaurant";
		const [existingRows] = await pool.execute("SELECT id FROM restaurants WHERE slug = ? LIMIT 1", [slug]);
		let finalSlug = slug;
		if (existingRows && existingRows.length > 0) finalSlug = `${slug}-${Date.now().toString().slice(-6)}`;
		const finalImage = image || null;
		const finalReviews = reviews;
		const [result] = await pool.execute(`INSERT INTO restaurants (name, image, slug, reviews, category, cuisine, description, priceRange, promoted, phone, email, address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
			name,
			finalImage,
			finalSlug,
			finalReviews,
			category,
			cuisine,
			description,
			priceRange,
			promoted,
			phone,
			email,
			address
		]);
		const restaurantId = Number(result.insertId);
		const responseHeaders = { "Content-Type": "application/json" };
		const currentToken = cookies.get("auth_token")?.value;
		if (currentToken) {
			const payload = verifyToken(currentToken);
			if (payload && payload.sys === "RESTAURANT") {
				const [userRows] = await pool.execute("SELECT id, restaurant_id, sys FROM users WHERE id = ? LIMIT 1", [payload.id]);
				const existingUser = userRows?.[0];
				if (existingUser && (existingUser.restaurant_id === null || existingUser.restaurant_id === void 0)) {
					await pool.execute("UPDATE users SET restaurant_id = ? WHERE id = ?", [restaurantId, payload.id]);
					responseHeaders["Set-Cookie"] = buildAuthCookie(generateToken({
						id: payload.id,
						email: payload.email,
						sys: "RESTAURANT",
						restaurant_id: restaurantId
					}));
				}
			}
		}
		return new Response(JSON.stringify({
			success: true,
			message: "Restaurante creado correctamente",
			restaurant: {
				id: restaurantId,
				name,
				image,
				slug: finalSlug,
				category,
				reviews,
				cuisine,
				description,
				priceRange,
				promoted,
				phone,
				email,
				address
			}
		}), {
			status: 201,
			headers: responseHeaders
		});
	} catch (error) {
		console.error("Error al crear el restaurante:", error);
		return new Response(JSON.stringify({
			success: false,
			error: "Error al crear el restaurante"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var GET = async ({ request }) => {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({
			success: false,
			error: "Falta el id del restaurante"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [rows] = await pool.execute("SELECT * FROM restaurants WHERE id = ?", [id]);
		const restaurant = rows?.[0];
		if (!restaurant) return new Response(JSON.stringify({
			success: false,
			error: "Restaurante no encontrado"
		}), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({
			success: true,
			restaurant: {
				id: restaurant.id,
				name: restaurant.name,
				slug: restaurant.slug,
				category: restaurant.category,
				cuisine: restaurant.cuisine,
				description: restaurant.description,
				rating: restaurant.rating,
				distance: restaurant.distance,
				priceRange: restaurant.priceRange,
				promoted: Boolean(restaurant.promoted),
				phone: restaurant.phone,
				email: restaurant.email,
				address: restaurant.address,
				location: restaurant.location
			}
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener el restaurante:", error);
		return new Response(JSON.stringify({
			success: false,
			error: "Error al obtener el restaurante"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async ({ request }) => {
	try {
		const { id, name, category, cuisine, description, phone, email, address, priceRange, promoted } = await request.json() || {};
		if (!id) return new Response(JSON.stringify({
			success: false,
			error: "Falta el id del restaurante"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await pool.execute(`UPDATE restaurants SET
        name = ?,
        category = ?,
        cuisine = ?,
        description = ?,
        phone = ?,
        email = ?,
        address = ?,
        priceRange = ?,
        promoted = ?
      WHERE id = ?`, [
			name,
			category,
			cuisine,
			description,
			phone,
			email,
			address,
			priceRange,
			promoted,
			id
		]);
		return new Response(JSON.stringify({
			success: true,
			message: "Restaurante actualizado correctamente"
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al actualizar el restaurante:", error);
		return new Response(JSON.stringify({
			success: false,
			error: "Error al actualizar el restaurante"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/restaurant@_@ts
var page = () => restaurant_exports;
//#endregion
export { page };
