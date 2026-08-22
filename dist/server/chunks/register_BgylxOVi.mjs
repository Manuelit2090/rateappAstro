import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { n as generateToken, r as hashPassword } from "./auth_-mFB-2Pn.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/auth/register.ts
var register_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { name, email, password, sys } = await request.json();
		if (!name || !email || !password) return new Response(JSON.stringify({ error: "Nombre, email y contraseña son requeridos" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (password.length < 8) return new Response(JSON.stringify({ error: "La contraseña debe tener al menos 8 caracteres" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [existing] = await pool.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
		if (existing.length > 0) return new Response(JSON.stringify({ error: "El email ya está registrado" }), {
			status: 409,
			headers: { "Content-Type": "application/json" }
		});
		const passwordHash = await hashPassword(password);
		const recoveryCode = Math.floor(1e5 + Math.random() * 9e5).toString();
		const sysValue = typeof sys === "string" && ["CLIENT", "RESTAURANT"].includes(sys) ? sys : "CLIENT";
		const [result] = await pool.execute(`INSERT INTO users (name, email, password, totalPoints, totalReviews, recovery_code, sys, restaurant_id)
       VALUES (?, ?, ?, 0, 0, ?, ?, NULL)`, [
			name,
			email,
			passwordHash,
			recoveryCode,
			sysValue
		]);
		const [rows] = await pool.execute("SELECT id, email, name, sys, restaurant_id FROM users WHERE id = ?", [result.insertId]);
		const customer = rows[0];
		const token = generateToken({
			id: customer.id,
			email: customer.email,
			sys: customer.sys ?? "CLIENT",
			restaurant_id: customer.restaurant_id ?? null
		});
		return new Response(JSON.stringify({
			message: "Registro exitoso",
			id: customer.id,
			sys: customer.sys ?? sysValue
		}), {
			status: 201,
			headers: {
				"Set-Cookie": `auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict`,
				"Content-Type": "application/json"
			}
		});
	} catch (error) {
		console.error("Error en registro:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/register@_@ts
var page = () => register_exports;
//#endregion
export { page };
