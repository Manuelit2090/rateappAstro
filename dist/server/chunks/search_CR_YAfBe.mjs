import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { n as restaurantService, r as RestaurantCard_default } from "./api_CqB2El2a.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext, watch } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/RequireAuth.vue
/**
* Componente de guardia que verifica si el usuario está autenticado.
* Redirige a /login si no está autenticado mediante verificación del token JWT.
*/
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "RequireAuth",
	setup(__props, { expose: __expose }) {
		__expose();
		onMounted(async () => {
			if (typeof window === "undefined") return;
			try {
				if (!(await fetch("/api/auth/me", {
					method: "GET",
					credentials: "include"
				})).ok) window.location.replace("/login");
			} catch (error) {
				console.error("Error verificando autenticación:", error);
				window.location.replace("/login");
			}
		});
		const __returned__ = {};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({
		style: { "display": "none" },
		"aria-hidden": "true"
	}, _attrs))}></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RequireAuth.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var RequireAuth_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/UI/RestaurantSearch.vue
var _sfc_main = {
	__name: "RestaurantSearch",
	setup(__props, { expose: __expose }) {
		__expose();
		const query = ref("");
		const results = ref([]);
		const isLoading = ref(false);
		onMounted(() => {
			if (typeof window !== "undefined") {
				const params = new URLSearchParams(window.location.search);
				query.value = params.get("q") || "";
			}
		});
		const updateSearchUrl = () => {
			if (typeof window === "undefined") return;
			const url = new URL(window.location.href);
			if (query.value.trim()) url.searchParams.set("q", query.value.trim());
			else url.searchParams.delete("q");
			window.history.replaceState({}, "", url);
		};
		const normalizedQuery = computed(() => query.value.trim().toLowerCase());
		const normalizeString = (value) => {
			if (!value) return "";
			return String(value).toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
		};
		watch(query, async (newQuery) => {
			if (!newQuery.trim()) {
				results.value = [];
				return;
			}
			try {
				isLoading.value = true;
				const response = await restaurantService.search(normalizeString(newQuery));
				results.value = response.restaurants || response.data || response || [];
				console.log("Array final de resultados:", results.value);
			} catch (error) {
				console.error("Error al buscar restaurantes:", error);
				results.value = [];
			} finally {
				isLoading.value = false;
			}
		}, { immediate: true });
		const __returned__ = {
			query,
			results,
			isLoading,
			updateSearchUrl,
			normalizedQuery,
			normalizeString,
			ref,
			computed,
			onMounted,
			watch,
			RestaurantCard: RestaurantCard_default,
			get restaurantService() {
				return restaurantService;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p class="text-sm uppercase tracking-[0.28em] text-muted-foreground">Search results</p><h1 class="text-3xl md:text-4xl font-bold">${ssrInterpolate($setup.query ? `Resultados para "${$setup.query}"` : "Resultados de búsqueda")}</h1><p class="text-sm text-muted-foreground mt-2">${ssrInterpolate($setup.query ? `${$setup.results.length} restaurante${$setup.results.length === 1 ? "" : "s"} encontrados` : "Ingresa un término de búsqueda en el dashboard o usa el campo de búsqueda para ver resultados.")}</p></div><form class="w-full max-w-xl"><label class="sr-only" for="search-query">Buscar restaurantes</label><input id="search-query" type="search"${ssrRenderAttr("value", $setup.query)} placeholder="Buscar restaurantes, platos, barrios..." class="w-full h-12 rounded-full border border-border/60 bg-surface px-4 text-sm text-foreground outline-none focus:border-lime/60 focus:ring-2 focus:ring-lime/20"></form></div>`);
	if ($setup.normalizedQuery && $setup.results.length === 0) _push(`<div class="rounded-3xl border border-yellow-300 bg-yellow-100/80 p-6 text-sm text-yellow-900"> No se encontraron restaurantes para &quot;${ssrInterpolate($setup.query)}&quot;. Intenta otra búsqueda. </div>`);
	else _push(`<!---->`);
	_push(`<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
	ssrRenderList($setup.results, (restaurant) => {
		_push(ssrRenderComponent($setup["RestaurantCard"], {
			key: restaurant.id,
			r: restaurant
		}, null, _parent));
	});
	_push(`<!--]--></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/RestaurantSearch.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RestaurantSearch_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/search.astro
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Search,
	file: () => $$file,
	url: () => $$url
});
var $$Search = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "RequireAuth", RequireAuth_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RequireAuth.vue",
		"client:component-export": "default"
	})}${maybeRenderHead($$result)}<div class="flex min-h-screen bg-background text-foreground"><main class="flex-1 min-w-0"><div class="px-6 md:px-10 py-8 space-y-8 max-w-[1400px] mx-auto"><section class="space-y-6">${renderComponent($$result, "RestaurantSearch", RestaurantSearch_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/UI/RestaurantSearch.vue",
		"client:component-export": "default"
	})}</section></div></main></div>` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/search.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/search.astro";
var $$url = "/search";
//#endregion
//#region \0virtual:astro:page:src/pages/search@_@astro
var page = () => search_exports;
//#endregion
export { page };
