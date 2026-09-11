import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { a as verifyToken, r as hashPassword } from "./auth_D5Os3erJ.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/user.ts
var user_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	PUT: () => PUT
});
function jsonResponse(body, status) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
var GET = async ({ request }) => {
	try {
		const email = new URL(request.url).searchParams.get("email");
		const token = cookiesFromRequest(request);
		const auth = token ? verifyToken(token) : null;
		if (!auth) return new Response(JSON.stringify({
			success: false,
			error: "Sesión no válida o ausente"
		}), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		if (email && email.trim().toLowerCase() !== auth.email.trim().toLowerCase()) return new Response(JSON.stringify({
			success: false,
			error: "El email no coincide con la sesión"
		}), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const [rows] = await pool.execute("SELECT id, name, email, phone, totalPoints, totalReviews FROM users WHERE id = ?", [auth.id]);
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
		const { email, name, phone, password, cuponsBuy } = await request.json() || {};
		const token = cookiesFromRequest(request);
		const auth = token ? verifyToken(token) : null;
		if (!auth) return new Response(JSON.stringify({
			success: false,
			error: "Sesión no válida o ausente"
		}), {
			status: 401,
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
		if (email !== void 0 && typeof email === "string" && email.trim() !== "") {
			fields.push("email = ?");
			values.push(email.trim().toLowerCase());
		}
		if (cuponsBuy !== void 0) {
			if (!Array.isArray(cuponsBuy)) return new Response(JSON.stringify({
				success: false,
				error: "cuponsBuy debe ser un arreglo"
			}), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
			const allowedStates = /* @__PURE__ */ new Set(["canjeado", "no canjeado"]);
			for (const item of cuponsBuy) if (!item || typeof item.id === "undefined" || typeof item.code !== "string" || !allowedStates.has(item.state)) return new Response(JSON.stringify({
				success: false,
				error: "Cada elemento de cuponsBuy debe tener { id, code, state } con state \"canjeado\" o \"no canjeado\""
			}), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
			fields.push("cuponsBuy = ?");
			values.push(JSON.stringify(cuponsBuy));
		}
		if (password !== void 0 && password !== "") {
			fields.push("password = ?");
			values.push(await hashPassword(password));
		}
		values.push(auth.id);
		if (fields.length === 0) return new Response(JSON.stringify({
			success: false,
			error: "No hay campos para actualizar"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await pool.execute(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
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
var DELETE = async ({ request }) => {
	try {
		const token = cookiesFromRequest(request);
		const auth = token ? verifyToken(token) : null;
		if (!auth) return jsonResponse({
			success: false,
			error: "Sesión no válida o ausente"
		}, 401);
		if ((await request.json().catch(() => ({})))?.confirmation !== "ELIMINAR") return jsonResponse({
			success: false,
			error: "Debes confirmar la eliminación escribiendo ELIMINAR"
		}, 400);
		const connection = await pool.getConnection();
		try {
			await connection.beginTransaction();
			const [redemptionTable] = await connection.execute(`SELECT TABLE_NAME FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'customer_redemptions'`);
			if (redemptionTable.length > 0) await connection.execute("DELETE FROM customer_redemptions WHERE customer_id = ?", [auth.id]);
			await connection.execute("DELETE FROM users WHERE id = ?", [auth.id]);
			await connection.commit();
			return new Response(JSON.stringify({
				success: true,
				message: "Cuenta eliminada correctamente"
			}), {
				status: 200,
				headers: {
					"Set-Cookie": "auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
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
		console.error("Error al eliminar la cuenta:", error);
		return jsonResponse({
			success: false,
			error: "Error interno del servidor"
		}, 500);
	}
};
function cookiesFromRequest(request) {
	const authCookie = (request.headers.get("cookie") ?? "").split(";").map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith("auth_token="));
	return authCookie ? decodeURIComponent(authCookie.slice(11)) : null;
}
//#endregion
//#region \0virtual:astro:page:src/pages/api/user@_@ts
var page = () => user_exports;
//#endregion
export { page };
