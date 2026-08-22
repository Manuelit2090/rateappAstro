import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/admin/reviews.ts
var reviews_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var RESPONSE_COLUMNS = [
	"restaurantResponse",
	"ownerResponse",
	"response",
	"reviewResponse"
];
/**
* Responde con un error JSON uniforme.
* @param message - Mensaje público del error.
* @param status - Código HTTP de la respuesta.
* @returns Respuesta JSON con el error indicado.
*/
function jsonError(message, status) {
	return new Response(JSON.stringify({ error: message }), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
/**
* Obtiene el nombre de la columna de respuesta disponible en el esquema.
* @returns Nombre seguro de columna o null si no existe.
*/
async function getResponseColumn() {
	const [columns] = await pool.execute("SHOW COLUMNS FROM reviews");
	const available = new Set(columns.map((column) => column.Field));
	return RESPONSE_COLUMNS.find((column) => available.has(column)) ?? null;
}
var GET = async ({ cookies }) => {
	const token = cookies.get("auth_token")?.value;
	if (!token) return jsonError("No autenticado", 401);
	const payload = verifyToken(token);
	if (!payload) return jsonError("Token inválido", 401);
	if (payload.sys !== "RESTAURANT") return jsonError("Acceso no autorizado", 403);
	const restaurantId = Number(payload.restaurant_id);
	if (!Number.isInteger(restaurantId) || restaurantId <= 0) return jsonError("La sesión no tiene un restaurante asociado", 404);
	try {
		const responseColumn = await getResponseColumn();
		const responseSelect = responseColumn ? `, r.${responseColumn} AS restaurantResponse` : ", NULL AS restaurantResponse";
		const [rows] = await pool.execute(`SELECT r.reviewId, r.reviewStar, r.reviewText, r.reviewUser, r.reviewDate${responseSelect}
       FROM reviews r
       WHERE r.restaurant_id = ?
       ORDER BY r.reviewDate DESC`, [restaurantId]);
		const reviews = rows.map((row) => ({
			id: String(row.reviewId ?? ""),
			rating: Number(row.reviewStar) || 0,
			comment: row.reviewText ?? "",
			userName: row.reviewUser ?? "Usuario",
			date: row.reviewDate,
			restaurantResponse: row.restaurantResponse ?? null
		}));
		return new Response(JSON.stringify({ reviews }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener reseñas del restaurante:", error);
		return jsonError("No se pudieron cargar las reseñas", 500);
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/reviews@_@ts
var page = () => reviews_exports;
//#endregion
export { page };
