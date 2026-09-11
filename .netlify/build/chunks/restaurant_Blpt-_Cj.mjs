import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { a as verifyToken, n as generateToken } from "./auth_D5Os3erJ.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
import { n as resolveCoordinates, t as parseCoordinate } from "./geocoding_D4Lcvtk1.mjs";
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
		const rawLatitude = body.latitude ?? body.lat ?? null;
		const rawLongitude = body.longitude ?? body.lon ?? null;
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
		const coordinates = await resolveCoordinates(address, rawLatitude, rawLongitude);
		if (!coordinates) return new Response(JSON.stringify({
			success: false,
			error: "No se pudo convertir la dirección en coordenadas válidas."
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const lat = coordinates.latitude;
		const lon = coordinates.longitude;
		const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "restaurant";
		const [existingRows] = await pool.execute("SELECT id FROM restaurants WHERE slug = ? LIMIT 1", [slug]);
		let finalSlug = slug;
		if (existingRows && existingRows.length > 0) finalSlug = `${slug}-${Date.now().toString().slice(-6)}`;
		const finalImage = image || null;
		const finalReviews = reviews;
		const safePhone = phone || null;
		const safeEmail = email || null;
		const safeCuisine = cuisine || null;
		const safeDescription = description || null;
		const safePriceRange = priceRange || null;
		const [result] = await pool.execute(`INSERT INTO restaurants (name, image, slug, reviews, category, cuisine, description, priceRange, promoted, phone, email, address, lat, lon)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
			name,
			finalImage,
			finalSlug,
			finalReviews,
			category,
			safeCuisine,
			safeDescription,
			safePriceRange,
			promoted,
			safePhone,
			safeEmail,
			address,
			lat,
			lon
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
				address,
				lat,
				lon
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
				image: restaurant.image,
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
				lat: parseCoordinate(restaurant.lat, -90, 90),
				lon: parseCoordinate(restaurant.lon, -180, 180)
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
		const body = await request.json().catch(() => ({}));
		const { id } = body || {};
		if (!id) return new Response(JSON.stringify({
			success: false,
			error: "Falta el id del restaurante"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [rows] = await pool.execute("SELECT * FROM restaurants WHERE id = ? LIMIT 1", [id]);
		const current = rows?.[0];
		if (!current) return new Response(JSON.stringify({
			success: false,
			error: "Restaurante no encontrado"
		}), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		const updatedName = body.name !== void 0 ? body.name : current.name;
		const updatedImage = body.image !== void 0 ? body.image : current.image;
		const updatedCategory = body.category !== void 0 ? body.category : current.category;
		const updatedCuisine = body.cuisine !== void 0 ? body.cuisine : current.cuisine;
		const updatedDescription = body.description !== void 0 ? body.description : current.description;
		const updatedPhone = body.phone !== void 0 ? body.phone : current.phone;
		const updatedEmail = body.email !== void 0 ? body.email : current.email;
		const updatedAddress = body.address !== void 0 ? body.address : current.address;
		const coordinates = body.address !== void 0 && String(body.address).trim() !== String(current.address ?? "").trim() || body.lat !== void 0 || body.lon !== void 0 ? await resolveCoordinates(String(updatedAddress ?? ""), body.lat, body.lon) : {
			lat: parseCoordinate(current.lat, -90, 90),
			lon: parseCoordinate(current.lon, -180, 180)
		};
		if (!coordinates || coordinates.lat === null || coordinates.lon === null) return new Response(JSON.stringify({
			success: false,
			error: "Latitud y longitud inválidas."
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const updatedPriceRange = body.priceRange !== void 0 ? body.priceRange : current.priceRange;
		const updatedPromoted = body.promoted !== void 0 ? body.promoted : current.promoted;
		await pool.execute(`UPDATE restaurants SET
        name = ?,
        image = ?,
        category = ?,
        cuisine = ?,
        description = ?,
        phone = ?,
        email = ?,
        address = ?,
        lat = ?,
        lon = ?,
        priceRange = ?,
        promoted = ?
      WHERE id = ?`, [
			updatedName,
			updatedImage || null,
			updatedCategory,
			updatedCuisine,
			updatedDescription,
			updatedPhone,
			updatedEmail,
			updatedAddress,
			coordinates.lat,
			coordinates.lon,
			updatedPriceRange,
			updatedPromoted,
			id
		]);
		return new Response(JSON.stringify({
			success: true,
			message: "Restaurante actualizado correctamente",
			imageUrl: updatedImage
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al actualizar el restaurante:", error);
		return new Response(JSON.stringify({
			success: false,
			error: error?.message || "Error al actualizar el restaurante"
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
