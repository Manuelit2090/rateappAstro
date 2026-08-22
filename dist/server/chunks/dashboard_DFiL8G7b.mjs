import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BkWFJBNh.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { computed, defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/RestaurantProfileGrid.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "RestaurantProfileGrid",
	props: { restaurant: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const restaurant = computed(() => props.restaurant ?? null);
		const __returned__ = {
			props,
			restaurant,
			infoItems: computed(() => {
				if (!restaurant.value) return [];
				return [
					{
						label: "Nombre",
						value: restaurant.value.name || "—"
					},
					{
						label: "Categoría",
						value: restaurant.value.category || "—"
					},
					{
						label: "Tipo de cocina",
						value: restaurant.value.cuisine || "—"
					},
					{
						label: "Rango de precio",
						value: restaurant.value.priceRange || "—"
					},
					{
						label: "Teléfono",
						value: restaurant.value.phone || "—"
					},
					{
						label: "Correo",
						value: restaurant.value.email || "—"
					},
					{
						label: "Dirección",
						value: restaurant.value.address || "—"
					},
					{
						label: "Ubicación",
						value: restaurant.value.location || "—"
					},
					{
						label: "Valoración",
						value: restaurant.value.rating ? String(restaurant.value.rating) : "—"
					},
					{
						label: "Distancia",
						value: restaurant.value.distance ? String(restaurant.value.distance) : "—"
					},
					{
						label: "Promocionado",
						value: restaurant.value.promoted ? "Sí" : "No"
					}
				];
			})
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	if ($setup.restaurant) {
		_push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm" }, _attrs))}><div class="mb-6 flex items-center justify-between gap-3"><div><p class="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Restaurante</p><h2 class="mt-2 text-2xl font-bold text-base-content">${ssrInterpolate($setup.restaurant.name || "Sin nombre")}</h2></div><span class="badge badge-primary badge-lg">${ssrInterpolate($setup.restaurant.promoted ? "Destacado" : "Normal")}</span></div><div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
		ssrRenderList($setup.infoItems, (item) => {
			_push(`<article class="rounded-2xl border border-base-300 bg-base-200/40 p-4"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">${ssrInterpolate(item.label)}</p><p class="mt-3 text-base font-semibold text-base-content">${ssrInterpolate(item.value)}</p></article>`);
		});
		_push(`<!--]--></div>`);
		if ($setup.restaurant.description) _push(`<div class="mt-6 rounded-2xl border border-base-300 bg-base-200/30 p-4"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Descripción</p><p class="mt-3 text-sm leading-6 text-base-content/80">${ssrInterpolate($setup.restaurant.description)}</p></div>`);
		else _push(`<!---->`);
		_push(`</section>`);
	} else _push(`<div${ssrRenderAttrs(mergeProps({ class: "alert alert-warning" }, _attrs))}><span>No hay ningun restaurante registrado, iniciando creando uno</span><a href="/admin/create"><button class="p-2 border rounded-lg"><span class="text-sm font-semibold">Crear restaurante</span></button></a></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RestaurantProfileGrid.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RestaurantProfileGrid_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/admin/dashboard.astro
var dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Dashboard,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dashboard;
	const token = Astro.cookies.get("auth_token")?.value;
	if (!token) return Astro.redirect("/login");
	const payload = verifyToken(token);
	if (!payload || payload.sys !== "RESTAURANT") return Astro.redirect("/login");
	let restaurant = null;
	try {
		const meResponse = await fetch(new URL("/api/auth/me", Astro.url.origin).toString(), { headers: {
			Cookie: `auth_token=${token}`,
			Accept: "application/json"
		} });
		if (!meResponse.ok) throw new Error("No se pudo obtener la sesión del restaurante");
		const meData = await meResponse.json();
		const restaurantId = Number(meData.user?.restaurant_id ?? payload.restaurant_id) || null;
		if (restaurantId) {
			const restaurantResponse = await fetch(new URL(`/api/restaurant?id=${restaurantId}`, Astro.url.origin).toString(), { headers: {
				Cookie: `auth_token=${token}`,
				Accept: "application/json"
			} });
			if (restaurantResponse.ok) restaurant = (await restaurantResponse.json()).restaurant ?? null;
		}
	} catch (error) {
		console.error("Error cargando el restaurante del dashboard:", error);
	}
	return renderTemplate`${renderComponent($$result, "AdminBaseLayout", $$AdminBaseLayout, { "title": "Estadísticas — Admin" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="min-h-screen w-full bg-base-100 p-6 text-base-content"><div class="mx-auto w-full space-y-6"><header class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"><p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Dashboard</p><h1 class="mt-3 text-3xl font-bold">Estadísticas del restaurante</h1><p class="mt-2 text-base-content/70">Aquí puedes ver la información del negocio asociado a tu cuenta.</p></header>${renderComponent($$result, "RestaurantProfileGrid", RestaurantProfileGrid_default, {
		"restaurant": restaurant,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RestaurantProfileGrid.vue",
		"client:component-export": "default"
	})}</div></main>` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/admin/dashboard.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/admin/dashboard.astro";
var $$url = "/admin/dashboard";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/dashboard@_@astro
var page = () => dashboard_exports;
//#endregion
export { page };
