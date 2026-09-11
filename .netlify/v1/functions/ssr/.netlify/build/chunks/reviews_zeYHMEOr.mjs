import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { a as verifyToken } from "./auth_D5Os3erJ.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/reviews.ts
var reviews_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var REVIEW_POINTS_REWARD = 10;
function jsonError(message, status) {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
async function userHasReviewedRestaurant(userId, restaurantId) {
	try {
		const [rows] = await pool.execute("SELECT COUNT(*) AS total FROM reviews WHERE reviewUser = ? AND restaurant_id = ?", [String(userId), restaurantId]);
		return Number(rows?.[0]?.total ?? 0) > 0;
	} catch (error) {
		console.error("Error validando reseñas previas del usuario:", error);
		throw error;
	}
}
var POST = async ({ request, cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return jsonError("No autenticado", 401);
		const payload = verifyToken(token);
		if (!payload) return jsonError("Token inválido", 401);
		const jsonBody = await request.json().catch(() => null);
		if (!jsonBody || typeof jsonBody !== "object") return jsonError("JSON inválido", 400);
		const { restaurantSlug, rating, content, reviewItem } = jsonBody;
		const safeRestaurantSlug = typeof restaurantSlug === "string" ? restaurantSlug.trim() : "";
		const numericRating = Number(rating);
		if (!safeRestaurantSlug || !Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) return jsonError("Datos inválidos", 400);
		const [users] = await pool.execute("SELECT id, name FROM users WHERE id = ?", [payload.id]);
		if (!users.length) return jsonError("Cliente no encontrado", 404);
		const reviewUser = users[0].name;
		const [restaurants] = await pool.execute("SELECT id, slug, reviews FROM restaurants WHERE slug = ?", [safeRestaurantSlug]);
		if (!restaurants.length) return jsonError("Restaurante no encontrado", 404);
		const restaurant = restaurants[0];
		const businessId = Number(restaurant.id);
		const hasPreviousReview = await userHasReviewedRestaurant(payload.id, businessId);
		const safeContent = typeof content === "string" ? content : typeof content === "number" || typeof content === "boolean" ? String(content) : "";
		const safeReviewItem = Array.isArray(reviewItem) ? reviewItem.filter((item) => item && typeof item.item === "string" && typeof item.total === "number") : [];
		const reviewId = crypto.randomUUID();
		await pool.execute(`INSERT INTO reviews (reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, restaurant_id, reviewItem)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)
      `, [
			reviewId,
			restaurant.slug,
			numericRating,
			safeContent,
			reviewUser,
			businessId,
			safeReviewItem.length ? JSON.stringify(safeReviewItem) : null
		]);
		let currentReviews = [];
		if (restaurant.reviews) try {
			currentReviews = typeof restaurant.reviews === "string" ? JSON.parse(restaurant.reviews) : restaurant.reviews;
		} catch {
			currentReviews = [];
		}
		currentReviews.push(reviewId);
		const [avgResult] = await pool.execute("SELECT AVG(reviewStar) as avg_rating FROM reviews WHERE restaurant_id = ?", [businessId]);
		await pool.execute("UPDATE restaurants SET rating = ?, reviews = ? WHERE id = ?", [
			avgResult[0].avg_rating,
			JSON.stringify(currentReviews),
			businessId
		]);
		if (!hasPreviousReview) await pool.execute("UPDATE users SET totalPoints = totalPoints + ?, totalReviews = totalReviews + 1 WHERE id = ?", [REVIEW_POINTS_REWARD, payload.id]);
		return new Response(JSON.stringify({
			message: hasPreviousReview ? "Reseña guardada correctamente. No se otorgaron puntos porque ya existe una reseña previa para este restaurante." : "Reseña creada exitosamente",
			reviewId,
			awardedPoints: hasPreviousReview ? 0 : REVIEW_POINTS_REWARD
		}), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al crear reseña:", error);
		return jsonError("Error interno del servidor", 500);
	}
};
var GET = async ({ request }) => {
	try {
		const slug = new URL(request.url).searchParams.get("slug");
		if (!slug) return new Response(JSON.stringify({ error: "slug requerido" }), { status: 400 });
		const [restaurants] = await pool.execute("SELECT id FROM restaurants WHERE slug = ? LIMIT 1", [slug]);
		if (!restaurants.length) return new Response(JSON.stringify({ error: "Restaurante no encontrado" }), { status: 404 });
		const [rows] = await pool.execute(`SELECT reviewId, reviewSlug, reviewStar, reviewText, reviewUser, reviewDate, reviewItem
       FROM reviews
       WHERE restaurant_id = ?
       ORDER BY reviewDate DESC`, [restaurants[0].id]);
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
