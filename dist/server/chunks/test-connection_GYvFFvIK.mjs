import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/test-connection.ts
var test_connection_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	try {
		const [result] = await pool.execute("SELECT 1 as connected");
		if (result.length > 0) return new Response(JSON.stringify({
			status: "connected",
			message: "Conexión a la base de datos exitosa",
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({
			status: "error",
			message: "Error de conexión a la base de datos",
			error: String(error)
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/test-connection@_@ts
var page = () => test_connection_exports;
//#endregion
export { page };
