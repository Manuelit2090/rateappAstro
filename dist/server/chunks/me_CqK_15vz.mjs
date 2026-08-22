import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/me.ts
var me_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
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
var GET = async ({ cookies }) => {
	const token = cookies.get("auth_token")?.value;
	if (!token) return new Response(JSON.stringify({ error: "No autenticado" }), { status: 401 });
	const payload = verifyToken(token);
	if (!payload) return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
	const [columnsRows] = await pool.execute("SHOW COLUMNS FROM users");
	const availableFields = new Set(columnsRows.map((column) => column.Field));
	const fields = [
		"id",
		"name",
		"email",
		"totalPoints",
		"totalReviews"
	];
	if (availableFields.has("sys")) fields.push("sys");
	if (availableFields.has("restaurant_id")) fields.push("restaurant_id");
	const badgeColumn = await getBadgesColumnName();
	if (availableFields.has("reviews")) fields.push("reviews");
	if (availableFields.has("favoriteRestaurants")) fields.push("favoriteRestaurants");
	if (availableFields.has("favoriteRestaurant")) fields.push("favoriteRestaurant");
	if (availableFields.has("cuponsBuy")) fields.push("cuponsBuy");
	if (availableFields.has("couponsBuy")) fields.push("couponsBuy");
	const selectFields = [...fields];
	const badgeSelectAlias = "badgeValue";
	if (badgeColumn) selectFields.push(`\`${badgeColumn}\` AS \`${badgeSelectAlias}\``);
	const [rows] = await pool.execute(`SELECT ${selectFields.join(", ")} FROM users WHERE id = ?`, [payload.id]);
	const user = rows[0];
	if (!user) return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
	const normalizedUser = {
		id: user.id,
		name: user.name,
		email: user.email,
		sys: user.sys ?? "CLIENT",
		restaurant_id: user.restaurant_id ?? null,
		role: user.sys ?? "CLIENT",
		totalPoints: user.totalPoints ?? 0,
		totalReviews: user.totalReviews ?? 0,
		reviews: user.reviews ?? [],
		favoriteRestaurants: user.favoriteRestaurants ?? user.favoriteRestaurant ?? [],
		favoriteRestaurant: user.favoriteRestaurant ?? user.favoriteRestaurants ?? [],
		badges: user.badgeValue ?? user.badges ?? [],
		cuponsBuy: user.cuponsBuy ?? user.couponsBuy ?? [],
		couponsBuy: user.couponsBuy ?? user.cuponsBuy ?? []
	};
	return new Response(JSON.stringify({ user: normalizedUser }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/me@_@ts
var page = () => me_exports;
//#endregion
export { page };
