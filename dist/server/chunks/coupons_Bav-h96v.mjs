import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/coupons.ts
var coupons_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var GET = async () => {
	try {
		const [coupons] = await pool.execute("SELECT id, code, description, points_required, discount_percentage, uses_left FROM coupons WHERE deleted_at IS NULL AND active = 1");
		return new Response(JSON.stringify({ coupons }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener cupones:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
var POST = async ({ request, cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const { coupon_id } = await request.json();
		if (!coupon_id) return new Response(JSON.stringify({ error: "coupon_id requerido" }), { status: 400 });
		const [coupons] = await pool.execute("SELECT * FROM coupons WHERE id = ? AND deleted_at IS NULL AND active = 1", [coupon_id]);
		if (!coupons.length) return new Response(JSON.stringify({ error: "Cupón no encontrado" }), { status: 404 });
		const coupon = coupons[0];
		if (coupon.uses_left <= 0) return new Response(JSON.stringify({ error: "Cupón agotado" }), { status: 410 });
		const [users] = await pool.execute("SELECT totalPoints FROM users WHERE id = ?", [payload.id]);
		if (!users.length) return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
		const customer = users[0];
		if (customer.totalPoints < coupon.points_required) return new Response(JSON.stringify({ error: `Puntos insuficientes. Necesitas ${coupon.points_required}, tienes ${customer.totalPoints}` }), { status: 402 });
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();
			await connection.execute("UPDATE users SET totalPoints = totalPoints - ? WHERE id = ?", [coupon.points_required, payload.id]);
			await connection.execute(`INSERT INTO customer_redemptions (customer_id, coupon_id, created_at) 
         VALUES (?, ?, NOW())`, [payload.id, coupon_id]);
			await connection.execute("UPDATE coupons SET uses_left = uses_left - 1 WHERE id = ?", [coupon_id]);
			await connection.commit();
			connection.release();
			return new Response(JSON.stringify({
				message: "Cupón canjeado exitosamente",
				coupon_code: coupon.code,
				discount: coupon.discount_percentage + "%"
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		} catch (error) {
			await connection.rollback();
			connection.release();
			throw error;
		}
	} catch (error) {
		console.error("Error al canjear cupón:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/coupons@_@ts
var page = () => coupons_exports;
//#endregion
export { page };
