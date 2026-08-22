import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/user.ts
var user_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT
});
var GET = async ({ request }) => {
	try {
		const email = new URL(request.url).searchParams.get("email");
		if (!email) return new Response(JSON.stringify({
			success: false,
			error: "Falta el email"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
		const user = rows?.[0];
		if (!user) return new Response(JSON.stringify({
			success: false,
			error: "Usuario no encontrado"
		}), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({
			success: true,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone ?? "",
				favoriteFood: user.favoriteFood ?? "",
				totalPoints: user.totalPoints ?? 0,
				totalReviews: user.totalReviews ?? 0
			}
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener el usuario:", error);
		return new Response(JSON.stringify({
			success: false,
			error: "Error al obtener el usuario"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async ({ request }) => {
	try {
		const { email, name, phone, favoriteFood, password } = await request.json() || {};
		if (!email) return new Response(JSON.stringify({
			success: false,
			error: "Falta el email del usuario"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const fields = [];
		const values = [];
		if (name !== void 0) {
			fields.push("name = ?");
			values.push(name);
		}
		if (phone !== void 0) {
			fields.push("phone = ?");
			values.push(phone);
		}
		if (favoriteFood !== void 0) {
			fields.push("favoriteFood = ?");
			values.push(favoriteFood);
		}
		if (password !== void 0 && password !== "") {
			fields.push("password = ?");
			values.push(password);
		}
		values.push(email);
		if (fields.length === 0) return new Response(JSON.stringify({
			success: false,
			error: "No hay campos para actualizar"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await pool.execute(`UPDATE users SET ${fields.join(", ")} WHERE email = ?`, values);
		return new Response(JSON.stringify({
			success: true,
			message: "Cambios guardados con éxito"
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al actualizar el usuario:", error);
		return new Response(JSON.stringify({
			success: false,
			error: "Error al actualizar el usuario"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/user@_@ts
var page = () => user_exports;
//#endregion
export { page };
