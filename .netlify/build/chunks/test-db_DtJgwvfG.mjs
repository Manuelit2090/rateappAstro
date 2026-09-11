import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { D as renderHead, T as renderTemplate } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as renderScript } from "./script_CbvpkAdY.mjs";
//#region src/pages/test-db.astro
var test_db_exports = /* @__PURE__ */ __exportAll({
	default: () => $$TestDb,
	file: () => $$file,
	url: () => $$url
});
var $$TestDb = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html><head><title>Test DB Connection</title><meta charset="utf-8">${renderHead($$result)}</head><body style="font-family: sans-serif; background: #111; color: #fff; padding: 2rem;"><h1>Test DB Connection</h1><div id="db-status-msg">Cargando...</div><pre id="db-status-json" style="background: #222; padding: 1rem; border-radius: 8px; margin-top: 1rem;">Sin datos</pre>${renderScript($$result, "/home/manuel/RateAppProject/rateappAstro/src/pages/test-db.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/home/manuel/RateAppProject/rateappAstro/src/pages/test-db.astro", void 0);
var $$file = "/home/manuel/RateAppProject/rateappAstro/src/pages/test-db.astro";
var $$url = "/test-db";
//#endregion
//#region \0virtual:astro:page:src/pages/test-db@_@astro
var page = () => test_db_exports;
//#endregion
export { page };
