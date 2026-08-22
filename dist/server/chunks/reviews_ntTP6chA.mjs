import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/reviews.ts
var reviews_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var POST = async ({ request, cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const { restaurantSlug, rating, content, reviewItem } = await request.json();
		if (!restaurantSlug || !rating || rating < 1 || rating > 5) return new Response(JSON.stringify({ error: "Datos inválidos" }), { status: 400 });
		const [users] = await pool.execute("SELECT id, name FROM users WHERE id = ?", [payload.id]);
		if (!users.length) return new Response(JSON.stringify({ error: "Cliente no encontrado" }), { status: 404 });
		const reviewUser = users[0].name;
		const [restaurants] = await pool.execute("SELECT id, slug, reviews FROM restaurants WHERE slug = ?", [restaurantSlug]);
		if (!restaurants.length) return new Response(JSON.stringify({ error: "Restaurante no encontrado" }), { status: 404 });
		const restaurant = restaurants[0];
		const business_id = restaurant.id;
		const reviewId = crypto.randomUUID();
		const [insertResult] = await pool.execute(`INSERT INTO reviews (reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, restaurant_id, reviewItem)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`, [
			reviewId,
			restaurant.slug,
			rating,
			content ?? "",
			reviewUser,
			business_id,
			reviewItem && reviewItem.length ? JSON.stringify(reviewItem) : null
		]);
		const newReviewId = insertResult.insertId;
		let currentReviews = [];
		if (restaurant.reviews) try {
			currentReviews = typeof restaurant.reviews === "string" ? JSON.parse(restaurant.reviews) : restaurant.reviews;
		} catch {
			currentReviews = [];
		}
		currentReviews.push(newReviewId);
		const [avgResult] = await pool.execute("SELECT AVG(reviewStar) as avg_rating FROM reviews WHERE restaurant_id = ?", [business_id]);
		await pool.execute("UPDATE restaurants SET rating = ?, reviews = ? WHERE id = ?", [
			avgResult[0].avg_rating,
			JSON.stringify(currentReviews),
			business_id
		]);
		await pool.execute("UPDATE users SET totalPoints = totalPoints + 10 WHERE id = ?", [payload.id]);
		await pool.execute("UPDATE users SET totalReviews = totalReviews + 1 WHERE id = ?", [payload.id]);
		return new Response(JSON.stringify({
			message: "Reseña creada exitosamente",
			reviewId
		}), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al crear reseña:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
var GET = async ({ request }) => {
	try {
		const slug = new URL(request.url).searchParams.get("slug");
		if (!slug) return new Response(JSON.stringify({ error: "slug requerido" }), { status: 400 });
		const [restaurants] = await pool.execute("SELECT id, reviews FROM restaurants WHERE slug = ?", [slug]);
		if (!restaurants.length) return new Response(JSON.stringify({ error: "Restaurante no encontrado" }), { status: 404 });
		let reviewIds = [];
		if (restaurants[0].reviews) try {
			reviewIds = typeof restaurants[0].reviews === "string" ? JSON.parse(restaurants[0].reviews) : restaurants[0].reviews;
		} catch {
			reviewIds = [];
		}
		if (!reviewIds.length) return new Response(JSON.stringify({ reviews: [] }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		const placeholders = reviewIds.map(() => "?").join(", ");
		const [rows] = await pool.execute(`SELECT reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, reviewItem
       FROM reviews
       WHERE id IN (${placeholders})
       ORDER BY reviewDate DESC`, reviewIds);
		const reviews = rows.map((row) => ({
			reviewId: String(row.reviewId),
			reviewSlug: row.reviewSlug,
			reviewStar: row.reviewStar,
			reviewText: row.reviewText,
			reviewUser: row.reviewUser,
			reviewDate: row.reviewDate,
			reviewItem: row.reviewItem ? typeof row.reviewItem === "string" ? JSON.parse(row.reviewItem) : row.reviewItem : []
		}));
		return new Response(JSON.stringify({ reviews }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener reseñas:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/reviews@_@ts
var page = () => reviews_exports;
//#endregion
export { page };
