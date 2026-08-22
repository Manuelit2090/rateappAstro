import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/badges.ts
var badges_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
/**
* Función auxiliar para detectar dinámicamente el nombre de la columna en la tabla users
* (Soporta 'badges', 'badge_ids', 'user_badges', etc.)
*/
async function getBadgesColumnName() {
	const [columnsRows] = await pool.execute("SHOW COLUMNS FROM users");
	const fieldNames = columnsRows.map((column) => column.Field);
	const matches = [
		"badges",
		"badge_ids",
		"user_badges",
		"badgeIds"
	];
	return fieldNames.find((field) => matches.includes(field)) || null;
}
/**
* Función auxiliar para parsear los badges recibidos de MySQL (JSON string o Array)
*/
function parseBadges(rawBadges) {
	if (Array.isArray(rawBadges)) return rawBadges;
	if (typeof rawBadges === "string" && rawBadges.trim()) try {
		const parsed = JSON.parse(rawBadges);
		if (Array.isArray(parsed)) return parsed;
	} catch {
		return [];
	}
	return [];
}
var GET = async ({ cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const badgeColumn = await getBadgesColumnName();
		if (!badgeColumn) return new Response(JSON.stringify({ error: "No existe la columna de badges en la tabla users" }), { status: 500 });
		const [rows] = await pool.execute(`SELECT \`${badgeColumn}\` FROM users WHERE id = ?`, [payload.id]);
		const badges = parseBadges(rows[0]?.[badgeColumn]);
		return new Response(JSON.stringify({ badges }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener badges:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request, cookies }) => {
	try {
		const token = cookies.get("auth_token")?.value;
		if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
		const payload = verifyToken(token);
		if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
		const body = await request.json();
		const badgeId = body.badgeId ?? body.badge_id ?? body.id;
		if (badgeId === void 0 || badgeId === null) return new Response(JSON.stringify({ error: "El parámetro badgeId es requerido" }), { status: 400 });
		const badgeColumn = await getBadgesColumnName();
		if (!badgeColumn) return new Response(JSON.stringify({ error: "No existe la columna de badges en la tabla users" }), { status: 500 });
		const [rows] = await pool.execute(`SELECT \`${badgeColumn}\` FROM users WHERE id = ?`, [payload.id]);
		const currentBadges = parseBadges(rows[0]?.[badgeColumn]);
		const hasBadge = currentBadges.some((b) => String(b) === String(badgeId));
		const updatedBadges = hasBadge ? currentBadges.filter((b) => String(b) !== String(badgeId)) : [...currentBadges, badgeId];
		await pool.execute(`UPDATE users SET \`${badgeColumn}\` = ? WHERE id = ?`, [JSON.stringify(updatedBadges), payload.id]);
		return new Response(JSON.stringify({
			unlocked: !hasBadge,
			badges: updatedBadges
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al actualizar badges:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/badges@_@ts
var page = () => badges_exports;
//#endregion
export { page };
