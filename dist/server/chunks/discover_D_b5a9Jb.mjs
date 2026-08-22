import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { n as restaurantService, r as RestaurantCard_default } from "./api_CqB2El2a.mjs";
import { t as HeaderPage_default } from "./HeaderPage_CDlO84Oc.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { MapPin, Sparkles, TrendingUp } from "lucide-vue-next";
//#region src/components/DiscoverPage.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "DiscoverPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const filters = [
			"All",
			"Trending",
			"New",
			"Promoted",
			"Top rated"
		];
		const activeFilter = ref("All");
		const query = ref("");
		const restaurants = ref([]);
		const loading = ref(false);
		const error = ref("");
		const featured = computed(() => restaurants.value[0] ?? null);
		const list = computed(() => {
			let r = [...restaurants.value];
			if (activeFilter.value === "Promoted") r = r.filter((x) => x.promoted);
			if (activeFilter.value === "Top rated") r = r.sort((a, b) => b.avg_rating - a.avg_rating);
			if (activeFilter.value === "Trending") r = r.sort((a, b) => b.review_count - a.review_count);
			if (activeFilter.value === "New") r = r.filter((x) => x.tags?.includes("New"));
			if (query.value.trim()) {
				const q = query.value.toLowerCase();
				r = r.filter((x) => x.name.toLowerCase().includes(q) || x.cuisine.toLowerCase().includes(q) || x.category.toLowerCase().includes(q));
			}
			return r;
		});
		const categories = [
			{
				label: "Burgers",
				icon: "🍔"
			},
			{
				label: "Ramen",
				icon: "🍜"
			},
			{
				label: "Pizza",
				icon: "🍕"
			},
			{
				label: "Sushi",
				icon: "🍣"
			},
			{
				label: "Brunch",
				icon: "🥐"
			},
			{
				label: "Tacos",
				icon: "🌮"
			},
			{
				label: "Coffee",
				icon: "☕"
			},
			{
				label: "Desserts",
				icon: "🍰"
			}
		];
		const moods = [
			"Date night",
			"Quick bite",
			"With friends",
			"Working solo",
			"Celebration",
			"Hidden gem"
		];
		onMounted(async () => {
			await loadRestaurants();
		});
		async function loadRestaurants() {
			loading.value = true;
			error.value = "";
			try {
				const response = await restaurantService.search("", void 0, 1);
				restaurants.value = response.restaurants || [];
			} catch (err) {
				console.error("Error cargando restaurantes:", err);
				error.value = "Error al cargar restaurantes";
			} finally {
				loading.value = false;
			}
		}
		async function searchRestaurants(category) {
			loading.value = true;
			error.value = "";
			try {
				const response = await restaurantService.search(query.value, category, 1);
				restaurants.value = response.restaurants || [];
			} catch (err) {
				console.error("Error buscando:", err);
				error.value = "Error en la búsqueda";
			} finally {
				loading.value = false;
			}
		}
		const __returned__ = {
			filters,
			activeFilter,
			query,
			restaurants,
			loading,
			error,
			featured,
			list,
			categories,
			moods,
			loadRestaurants,
			searchRestaurants,
			get TrendingUp() {
				return TrendingUp;
			},
			get MapPin() {
				return MapPin;
			},
			get Sparkles() {
				return Sparkles;
			},
			RestaurantCard: RestaurantCard_default,
			HeaderPage: HeaderPage_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-1 min-w-0" }, _attrs))}>`);
	_push(ssrRenderComponent($setup["HeaderPage"], {
		title: "Discover",
		subtitle: "Explora restaurantes cerca de ti"
	}, null, _parent));
	_push(`<div class="px-6 md:px-10 py-8 space-y-10 max-w-350 mx-auto">`);
	if ($setup.featured) {
		_push(`<section class="relative overflow-hidden rounded-3xl border border-base-300/60">`);
		if ($setup.featured.image) _push(`<img${ssrRenderAttr("src", $setup.featured.image)}${ssrRenderAttr("alt", $setup.featured.name)} class="absolute inset-0 h-full w-full object-cover">`);
		else _push(`<!---->`);
		_push(`<div class="absolute inset-0 bg-linear-to-r from-base-100 via-base-100/80 to-base-100/10"></div><div class="relative p-8 md:p-12 max-w-2xl"><span class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-primary mb-3">`);
		_push(ssrRenderComponent($setup["Sparkles"], { class: "h-3.5 w-3.5" }, null, _parent));
		_push(` Selección del editor </span><h2 class="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-3">${ssrInterpolate($setup.featured.name)}</h2><p class="text-accent-content/85 mb-6 line-clamp-2">${ssrInterpolate($setup.featured.description)}</p><div class="flex items-center gap-3"><a${ssrRenderAttr("href", `/restaurant/${$setup.featured.slug}`)} class="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-content text-sm font-semibold hover:shadow-[0_0_24px_-4px_var(--p)] transition"> View restaurant </a><span class="text-xs text-accent-content/85text-accent-content/85 inline-flex items-center gap-1.5">`);
		_push(ssrRenderComponent($setup["MapPin"], { class: "h-3.5 w-3.5" }, null, _parent));
		_push(` ${ssrInterpolate($setup.featured.address)}</span></div></div></section>`);
	} else _push(`<!---->`);
	_push(`<section><div class="flex items-end justify-between mb-5 flex-wrap gap-3"><div><h3 class="font-display text-2xl font-bold flex items-center gap-2">`);
	_push(ssrRenderComponent($setup["TrendingUp"], { class: "h-5 w-5 text-primary" }, null, _parent));
	_push(` Descubre Restaurantes </h3><p class="text-sm text-neutral mt-1">${ssrInterpolate($setup.list.length)} Restaurantes encontrados</p></div><div class="flex gap-2 flex-wrap"><!--[-->`);
	ssrRenderList($setup.filters, (f) => {
		_push(`<button class="${ssrRenderClass(["px-4 h-9 rounded-full text-sm font-medium transition border", $setup.activeFilter === f ? "bg-base-content text-base-100 border-base-content" : "border-base-300/60 text-neutral hover:text-base-content hover:border-primary/40"])}">${ssrInterpolate(f)}</button>`);
	});
	_push(`<!--]--></div></div>`);
	if ($setup.loading) _push(`<div class="text-center py-20"><div class="inline-block"><div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div></div><p class="mt-4 text-neutral">Cargando restaurantes...</p></div>`);
	else if ($setup.error) _push(`<div class="alert alert-error"><span>${ssrInterpolate($setup.error)}</span></div>`);
	else if ($setup.list.length > 0) {
		_push(`<div class="grid md:grid-cols-2 gap-6"><!--[-->`);
		ssrRenderList($setup.list, (r) => {
			_push(ssrRenderComponent($setup["RestaurantCard"], {
				key: r.slug,
				r
			}, null, _parent));
		});
		_push(`<!--]--></div>`);
	} else _push(`<div class="text-center py-20 text-neutral rounded-3xl border border-base-300/60 bg-base-100/40"> Nothing matches &quot;${ssrInterpolate($setup.query)}&quot;. Try a different cuisine. </div>`);
	_push(`</section><footer class="py-10 text-center text-xs text-neutral"> © 2026 rateapp · Crafted for hungry humans </footer></div></main>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/DiscoverPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DiscoverPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/discover.astro
var discover_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Discover,
	file: () => $$file,
	url: () => $$url
});
var $$Discover = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Discover — rateapp",
		"description": "Explore trending spots, new openings and hidden gems near you."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "DiscoverPage", DiscoverPage_default, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/DiscoverPage.vue",
		"client:component-export": "default"
	})}` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/discover.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/discover.astro";
var $$url = "/discover";
//#endregion
//#region \0virtual:astro:page:src/pages/discover@_@astro
var page = () => discover_exports;
//#endregion
export { page };
