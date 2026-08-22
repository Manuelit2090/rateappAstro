import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { f as renderHead, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as renderScript } from "./script_BLWNlJla.mjs";
//#region src/pages/test-db.astro
var test_db_exports = /* @__PURE__ */ __exportAll({
	default: () => $$TestDb,
	file: () => $$file,
	url: () => $$url
});
var $$TestDb = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html><head><title>Test DB Connection</title><meta charset="utf-8">${renderHead($$result)}</head><body style="font-family: sans-serif; background: #111; color: #fff; padding: 2rem;"><h1>Test DB Connection</h1><div id="db-status-msg">Cargando...</div><pre id="db-status-json" style="background: #222; padding: 1rem; border-radius: 8px; margin-top: 1rem;">Sin datos</pre>${renderScript($$result, "C:/Users/Estudiante/rateappAstro/src/pages/test-db.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/test-db.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/test-db.astro";
var $$url = "/test-db";
//#endregion
//#region \0virtual:astro:page:src/pages/test-db@_@astro
var page = () => test_db_exports;
//#endregion
export { page };
