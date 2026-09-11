import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { i as verifyPassword, n as generateToken, t as buildAuthCookie } from "./auth_D5Os3erJ.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/login.ts
var login_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const body = await request.json().catch(() => null);
		const email = body && typeof body === "object" ? body.email : null;
		const password = body && typeof body === "object" ? body.password : null;
		const emailNormalized = typeof email === "string" ? email.trim().toLowerCase() : "";
		if (!emailNormalized || typeof password !== "string" || !password) return new Response(JSON.stringify({ error: "Email y contraseña son requeridos" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [rows] = await pool.execute("SELECT id, email, password, sys, restaurant_id FROM users WHERE LOWER(email) = ?", [emailNormalized]);
		const customer = rows[0] ?? null;
		if (!customer) return new Response(JSON.stringify({ error: "Email o contraseña incorrectos" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		if (!await verifyPassword(password, customer.password)) return new Response(JSON.stringify({ error: "Email o contraseña incorrectos" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const userSystem = customer.sys === "RESTAURANT" || customer.sys === "ADMIN" ? customer.sys : "CLIENT";
		const restaurantId = customer.restaurant_id ?? null;
		if (userSystem === "RESTAURANT" && restaurantId === null) return new Response(JSON.stringify({ error: "Cuenta de restaurante sin restaurante asociado." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const token = generateToken({
			id: customer.id,
			email: customer.email,
			sys: userSystem,
			restaurant_id: restaurantId
		});
		const redirectPath = userSystem === "CLIENT" ? "/dashboard" : "/admin/dashboard";
		const user = {
			id: customer.id,
			email: customer.email,
			sys: userSystem,
			role: userSystem,
			restaurant_id: restaurantId
		};
		return new Response(JSON.stringify({
			message: "Login exitoso",
			user,
			id: user.id,
			sys: user.sys,
			redirect: redirectPath
		}), {
			status: 200,
			headers: {
				"Set-Cookie": buildAuthCookie(token),
				"Content-Type": "application/json"
			}
		});
	} catch (error) {
		console.error("Error en login:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
