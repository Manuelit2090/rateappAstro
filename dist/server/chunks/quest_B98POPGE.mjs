import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/api/quest.ts
var quest_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	try {
		const [rows] = await pool.execute("SELECT * FROM quests");
		const quests = Array.isArray(rows) ? rows.map((item) => ({
			id: item.id,
			slug: item.slug,
			description: item.description,
			category: item.category,
			initial_time: item.initial_time,
			expiresIn: item.expiresIn,
			reward: Number(item.rewartPoints ?? 0),
			current: Number(item.current ?? 0),
			total: Number(item.total ?? 1)
		})) : [];
		return new Response(JSON.stringify({
			success: true,
			quests
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error al obtener las quests:", error);
		return new Response(JSON.stringify({
			success: false,
			error: "Error interno del servidor al consultar quests"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/quest@_@ts
var page = () => quest_exports;
//#endregion
export { page };
