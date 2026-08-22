import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/points.ts
var points_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const [rows] = await pool.execute("SELECT totalPoints FROM users WHERE id = ?", [payload.id]);
		if (!rows.length) return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
		return new Response(JSON.stringify({ points: rows[0].totalPoints }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/points@_@ts
var page = () => points_exports;
//#endregion
export { page };
