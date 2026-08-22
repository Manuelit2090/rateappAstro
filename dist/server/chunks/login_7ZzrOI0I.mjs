import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { i as verifyPassword, n as generateToken, r as hashPassword } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/login.ts
var login_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { email, password } = await request.json();
		const emailNormalized = typeof email === "string" ? email.trim().toLowerCase() : email;
		if (!email || !password) return new Response(JSON.stringify({ error: "Email y contraseña son requeridos" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [rows] = await pool.execute("SELECT id, name, email, password, sys, restaurant_id FROM users WHERE LOWER(email) = ?", [emailNormalized]);
		const user = rows[0] ?? null;
		console.log("Usuario encontrado en DB:", user);
		if (!user) {
			console.debug("Login failed: no user for email", emailNormalized);
			return new Response(JSON.stringify({ error: "Email o contraseña incorrectos" }), { status: 401 });
		}
		if (!await verifyPassword(password, user.password)) {
			const pwdSample = typeof user.password === "string" ? user.password.slice(0, 6) + "..." + user.password.slice(-3) : String(user.password);
			const isBcrypt = typeof user.password === "string" && user.password.startsWith("$2");
			console.debug("Login failed: password mismatch for user id", user.id, "isBcrypt=", isBcrypt, "pwdLen=", typeof user.password === "string" ? user.password.length : "n/a", "sample=", pwdSample);
			return new Response(JSON.stringify({ error: "Email o contraseña incorrectos" }), { status: 401 });
		}
		const isPasswordValid = await verifyPassword(password, user.password);
		console.log("Resultado de bcrypt:", isPasswordValid);
		if (!isPasswordValid) return new Response(JSON.stringify({ error: "Email o contraseña incorrectos: bcrypt no coincide" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		if (!user.password.startsWith("$2")) {
			const newHash = await hashPassword(password);
			await pool.execute("UPDATE users SET password = ? WHERE id = ?", [newHash, user.id]);
		}
		const userSystem = user.sys === "RESTAURANT" || user.sys === "ADMIN" ? user.sys : "CLIENT";
		const restaurantId = user.restaurant_id ?? null;
		if (userSystem === "RESTAURANT" && restaurantId === null) return new Response(JSON.stringify({ error: "Cuenta de restaurante sin restaurante asociado." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const token = generateToken({
			id: user.id,
			email: user.email,
			sys: userSystem,
			restaurant_id: restaurantId
		});
		const secureFlag = process.env.NODE_ENV === "production" ? "Secure; " : "";
		return new Response(JSON.stringify({
			message: "Login exitoso",
			id: user.id,
			sys: userSystem
		}), {
			status: 200,
			headers: {
				"Set-Cookie": `auth_token=${token}; HttpOnly; ${secureFlag}Path=/; Max-Age=604800; SameSite=Strict`,
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
