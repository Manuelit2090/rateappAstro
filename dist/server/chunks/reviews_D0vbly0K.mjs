import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/reviews.ts
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
		const { business_id, rating, content, reviewItem } = await request.json();
		if (!business_id || !rating || rating < 1 || rating > 5) return new Response(JSON.stringify({ error: "Datos inválidos" }), { status: 400 });
		const [users] = await pool.execute("SELECT id, name FROM users WHERE id = ?", [payload.id]);
		if (!users.length) return new Response(JSON.stringify({ error: "Cliente no encontrado" }), { status: 404 });
		const reviewUser = users[0].name;
		const [restaurants] = await pool.execute("SELECT id, slug, reviews FROM restaurants WHERE id = ?", [business_id]);
		if (!restaurants.length) return new Response(JSON.stringify({ error: "Restaurante no encontrado" }), { status: 404 });
		const restaurant = restaurants[0];
		const [insertResult] = await pool.execute(`INSERT INTO reviews (reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, restaurant_id, reviewItem)
       VALUES (?, ?, ?, ?, NOW(), ?, ?)`, [
			restaurant.slug,
			rating,
			content ?? "",
			reviewUser,
			business_id,
			reviewItem && reviewItem.length ? JSON.stringify(reviewItem) : null
		]);
		const newReviewId = insertResult.insertId;
		await pool.execute("UPDATE reviews SET reviewId = ? WHERE id = ?", [String(newReviewId), newReviewId]);
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
		return new Response(JSON.stringify({
			message: "Reseña creada exitosamente",
			reviewId: newReviewId
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
		const businessId = new URL(request.url).searchParams.get("business_id");
		if (!businessId) return new Response(JSON.stringify({ error: "business_id requerido" }), { status: 400 });
		const [rows] = await pool.execute(`SELECT reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, reviewItem
       FROM reviews
       WHERE restaurant_id = ?
       ORDER BY reviewDate DESC`, [businessId]);
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
//#region \0virtual:astro:page:src/pages/api/reviews@_@ts
var page = () => reviews_exports;
//#endregion
export { page };
