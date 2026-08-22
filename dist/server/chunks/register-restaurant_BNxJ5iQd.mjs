import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { n as generateToken, r as hashPassword, t as buildAuthCookie } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/register-restaurant.ts
var register_restaurant_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const body = await request.json().catch(() => null);
		const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
		const password = typeof body?.password === "string" ? body.password : "";
		const name = typeof body?.name === "string" ? body.name.trim() : "";
		const restaurantName = typeof body?.restaurantName === "string" ? body.restaurantName.trim() : "";
		const address = typeof body?.address === "string" ? body.address.trim() : "";
		const category = typeof body?.category === "string" ? body.category.trim() : "";
		if (!email || !password || !name || !restaurantName || !address || !category) return new Response(JSON.stringify({ error: "Faltan campos obligatorios: email, password, name, restaurantName, address y category son requeridos." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (password.length < 8) return new Response(JSON.stringify({ error: "La contraseña debe tener al menos 8 caracteres." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [existingRows] = await pool.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
		if (existingRows.length > 0) return new Response(JSON.stringify({ error: "El email ya está registrado." }), {
			status: 409,
			headers: { "Content-Type": "application/json" }
		});
		const restaurantSlug = restaurantName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "restaurant";
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();
			const [restaurantInsert] = await connection.execute(`INSERT INTO restaurants (name, slug, address, category)
         VALUES (?, ?, ?, ?)`, [
				restaurantName,
				restaurantSlug,
				address,
				category
			]);
			const restaurantId = Number(restaurantInsert.insertId);
			if (!Number.isInteger(restaurantId) || restaurantId <= 0) throw new Error("No se pudo crear el restaurante.");
			const passwordHash = await hashPassword(password);
			const [userInsert] = await connection.execute(`INSERT INTO users (name, email, password, sys, restaurant_id)
         VALUES (?, ?, ?, 'RESTAURANT', ?)`, [
				name,
				email,
				passwordHash,
				restaurantId
			]);
			const userId = Number(userInsert.insertId);
			if (!Number.isInteger(userId) || userId <= 0) throw new Error("No se pudo crear el usuario del restaurante.");
			await connection.commit();
			const token = generateToken({
				id: userId,
				email,
				sys: "RESTAURANT",
				restaurant_id: restaurantId
			});
			return new Response(JSON.stringify({
				message: "Registro de restaurante exitoso",
				redirect: "/restaurant-admin",
				user: {
					id: userId,
					email,
					sys: "RESTAURANT",
					restaurant_id: restaurantId
				}
			}), {
				status: 201,
				headers: {
					"Set-Cookie": buildAuthCookie(token),
					"Content-Type": "application/json"
				}
			});
		} catch (error) {
			await connection.rollback();
			throw error;
		} finally {
			connection.release();
		}
	} catch (error) {
		console.error("Error en registro de restaurante:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/register-restaurant@_@ts
var page = () => register_restaurant_exports;
//#endregion
export { page };
