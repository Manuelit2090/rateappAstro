import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BkWFJBNh.mjs";
//#region src/pages/admin/analytics.astro
var analytics_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Analytics,
	file: () => $$file,
	url: () => $$url
});
var $$Analytics = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminBaseLayout", $$AdminBaseLayout, { "title": "Estadísticas — Admin" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1 min-h-screen p-6 md:p-10"><div class="max-w-7xl mx-auto"><h1 class="text-2xl font-semibold mb-4">Estadísticas</h1><section class="grid grid-cols-1 lg:grid-cols-2 gap-4"><div class="rounded-lg border p-4 bg-base-100/50">Gráfico de actividad (placeholder)</div><div class="rounded-lg border p-4 bg-base-100/50">Métricas claves (placeholder)</div></section></div></main>` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/admin/analytics.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/admin/analytics.astro";
var $$url = "/admin/analytics";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/analytics@_@astro
var page = () => analytics_exports;
//#endregion
export { page };
