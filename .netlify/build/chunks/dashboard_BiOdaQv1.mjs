import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { a as verifyToken } from "./auth_D5Os3erJ.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BI8Pzpgw.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { computed, defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
//#region src/components/RestaurantProfileGrid.vue
var DEFAULT_IMAGE = "https://pub-d80845b9e313461db9d75fa6897f1bf3.r2.dev/avatar-user.jpg";
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "RestaurantProfileGrid",
	props: { restaurant: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const restaurant = computed(() => props.restaurant ?? null);
		const __returned__ = {
			props,
			DEFAULT_IMAGE,
			restaurant,
			headerImage: computed(() => {
				return restaurant.value?.image?.trim() ? restaurant.value.image : DEFAULT_IMAGE;
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
		_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full space-y-6" }, _attrs))}><header class="relative w-full h-64 sm:h-80 rounded-3xl border border-base-200 bg-base-100 shadow-xl transition-all duration-300 overflow-hidden group"><img${ssrRenderAttr("src", $setup.headerImage)}${ssrRenderAttr("alt", $setup.restaurant.name || "Restaurante")} class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"><div class="absolute inset-0 bg-gradient-to-t from-base-300/90 via-black/40 to-transparent"></div><div class="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white"><div class="space-y-2"><div class="flex items-center gap-2 flex-wrap">`);
		if ($setup.restaurant.promoted) _push(`<span class="badge badge-warning font-extrabold text-xs uppercase tracking-wider shadow-md"> Promocionado </span>`);
		else _push(`<!---->`);
		if ($setup.restaurant.category) _push(`<span class="badge badge-neutral text-xs bg-black/40 text-white backdrop-blur-md border-white/20 font-semibold uppercase tracking-wider">${ssrInterpolate($setup.restaurant.category)}</span>`);
		else _push(`<!---->`);
		_push(`</div><h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">${ssrInterpolate($setup.restaurant.name || "Sin nombre registrado")}</h1></div>`);
		if ($setup.restaurant.priceRange) _push(`<div class="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 self-start sm:self-auto shadow-lg"><span class="text-[10px] uppercase font-bold tracking-wider text-white/70 block">Rango de precio</span><span class="text-lg font-extrabold text-warning">${ssrInterpolate($setup.restaurant.priceRange)}</span></div>`);
		else _push(`<!---->`);
		_push(`</div></header><section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start"><article class="sm:col-span-2 lg:col-span-2 card bg-base-100 border border-base-200 shadow-xl p-6 transition-all hover:border-warning/50"><div class="flex items-center gap-2 text-warning mb-3"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60"> Descripción </h3></div><p class="text-base text-base-content/80 leading-relaxed">${ssrInterpolate($setup.restaurant.description || "Sin descripción disponible para este restaurante.")}</p></article><article class="card bg-base-100 border border-base-200 shadow-xl p-6 transition-all hover:border-warning/50 space-y-4"><div class="flex items-center gap-2 text-warning"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg><h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60"> Métricas </h3></div><div class="space-y-3"><div class="flex items-center justify-between p-3 rounded-2xl bg-base-200/50 border border-base-200"><span class="text-xs font-semibold text-base-content/70">Valoración</span><span class="text-sm font-extrabold text-warning">${ssrInterpolate($setup.restaurant.rating ? `★ ${$setup.restaurant.rating}` : "—")}</span></div><div class="flex items-center justify-between p-3 rounded-2xl bg-base-200/50 border border-base-200"><span class="text-xs font-semibold text-base-content/70">Distancia</span><span class="text-sm font-bold text-base-content">${ssrInterpolate($setup.restaurant.distance ? `${$setup.restaurant.distance} km` : "—")}</span></div><div class="flex items-center justify-between p-3 rounded-2xl bg-base-200/50 border border-base-200"><span class="text-xs font-semibold text-base-content/70">Estado Promocional</span><span class="${ssrRenderClass([$setup.restaurant.promoted ? "badge-warning" : "badge-ghost", "text-xs font-bold badge badge-sm"])}">${ssrInterpolate($setup.restaurant.promoted ? "Promocionado" : "Estándar")}</span></div></div></article><article class="card bg-base-100 border border-base-200 shadow-xl p-6 transition-all hover:border-warning/50 space-y-4"><div class="flex items-center gap-2 text-warning"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60"> Contacto </h3></div><div class="space-y-3"><div><p class="text-[11px] font-bold text-base-content/50 uppercase">Teléfono</p><p class="text-sm font-semibold text-base-content mt-0.5 break-all">${ssrInterpolate($setup.restaurant.phone || "—")}</p></div><div class="border-t border-base-200 pt-3"><p class="text-[11px] font-bold text-base-content/50 uppercase">Correo Electrónico</p><p class="text-sm font-semibold text-base-content mt-0.5 break-all">${ssrInterpolate($setup.restaurant.email || "—")}</p></div></div></article><article class="card bg-base-100 border border-base-200 shadow-xl p-6 transition-all hover:border-warning/50 space-y-4"><div class="flex items-center gap-2 text-warning"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60"> Ubicación </h3></div><div class="space-y-3"><div><p class="text-[11px] font-bold text-base-content/50 uppercase">Dirección</p><p class="text-sm font-semibold text-base-content mt-0.5">${ssrInterpolate($setup.restaurant.address || "—")}</p></div><div class="border-t border-base-200 pt-3"><p class="text-[11px] font-bold text-base-content/50 uppercase">Ciudad / Zona</p><p class="text-sm font-semibold text-base-content mt-0.5">${ssrInterpolate($setup.restaurant.location || "—")}</p></div></div></article><article class="card bg-base-100 border border-base-200 shadow-xl p-6 transition-all hover:border-warning/50 space-y-4"><div class="flex items-center gap-2 text-warning"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg><h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60"> Gastronomía </h3></div><div class="space-y-3"><div><p class="text-[11px] font-bold text-base-content/50 uppercase">Categoría</p><p class="text-sm font-semibold text-base-content mt-0.5">${ssrInterpolate($setup.restaurant.category || "—")}</p></div><div class="border-t border-base-200 pt-3"><p class="text-[11px] font-bold text-base-content/50 uppercase">Tipo de Cocina</p><p class="text-sm font-semibold text-base-content mt-0.5">${ssrInterpolate($setup.restaurant.cuisine || "—")}</p></div></div></article></section></div>`);
	} else _push(`<div${ssrRenderAttrs(mergeProps({ class: "card bg-base-100 border border-dashed border-base-300 p-8 sm:p-12 text-center shadow-md" }, _attrs))}><div class="mx-auto max-w-sm space-y-4"><div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10 text-warning"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path></svg></div><div><h3 class="text-lg font-bold text-base-content">No hay restaurante registrado</h3><p class="mt-1 text-sm text-base-content/60">Inicia creando uno nuevo para empezar a gestionar sus datos.</p></div><a href="/admin/create" class="inline-block w-full"><button class="btn btn-warning w-full font-bold"> Crear restaurante </button></a></div></div>`);
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
	return renderTemplate`${renderComponent($$result, "AdminBaseLayout", $$AdminBaseLayout, { "title": "Estadísticas — Admin" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="min-h-screen w-full bg-base-300 p-4 sm:p-6 lg:p-8 text-base-content"><div class="mx-auto max-w-7xl space-y-6"><!-- Header Rediseñado con DaisyUI --><header class="card bg-base-100 border border-base-200 shadow-xl"><div class="card-body flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6"><div class="flex items-center gap-4"><!-- Avatar / Icono del Restaurante --><div class="avatar placeholder"><div class="bg-secundary text-warning-content w-12 h-12 r  p-2">${restaurant?.image ? renderTemplate`<img${addAttribute(restaurant.image, "src")}${addAttribute(restaurant?.name || "Restaurante", "alt")}>` : renderTemplate`<span class="text-xl font-extrabold uppercase">${restaurant?.name ? restaurant.name.substring(0, 2) : "R"}</span>`}</div></div><!-- Títulos e Información --><div><div class="flex items-center gap-2"><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Bienvenido, ${restaurant?.name || "de vuelta"}</h1><span class="badge badge-success badge-xs animate-pulse" title="Panel Activo"></span></div><p class="text-sm opacity-70 mt-0.5">Configura tu perfil, actualiza tus datos y analiza el rendimiento de tus métricas.</p></div></div><!-- Badge de Cuentas / Controles Rápidos --><!-- <div class="flex items-center gap-2 self-end md:self-auto">
            {restaurant?.promoted ? (
              <span class="badge badge-warning gap-1.5 font-bold py-3 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Promocionado
              </span>
            ) : (
              <span class="badge badge-ghost font-semibold py-3 px-4">
                Cuenta Estándar
              </span>
            )}
          </div> --></div></header>${renderComponent($$result, "RestaurantProfileGrid", RestaurantProfileGrid_default, {
		"restaurant": restaurant,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantProfileGrid.vue",
		"client:component-export": "default"
	})}</div></main>` })}`;
}, "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/dashboard.astro", void 0);
var $$file = "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/dashboard.astro";
var $$url = "/admin/dashboard";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/dashboard@_@astro
var page = () => dashboard_exports;
//#endregion
export { page };
