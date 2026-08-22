import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { i as setDataUser, n as loadDataUserFromAPI, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { n as restaurantService, r as RestaurantCard_default } from "./api_CqB2El2a.mjs";
import { t as HeaderPage_default } from "./HeaderPage_CDlO84Oc.mjs";
import { computed, createVNode, defineComponent, mergeProps, onMounted, ref, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { Award, Sparkles, TrendingUp } from "lucide-vue-next";
//#region src/components/UI/Avatar.vue
var _sfc_main$2 = /*@__PURE__*/ defineComponent({
	__name: "Avatar",
	setup(__props, { expose: __expose }) {
		__expose();
		onMounted(async () => {
			await loadDataUserFromAPI();
		});
		const __returned__ = { userInitial: computed(() => {
			return dataUser.user?.name ? dataUser.user.name.charAt(0).toUpperCase() : "?";
		}) };
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "avatar placeholder" }, _attrs))}><div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-neutral text-base-content text-6xl font-bold"><span class="w-full h-full flex justify-center items-center">${ssrInterpolate($setup.userInitial)}</span></div></div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/Avatar.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Avatar_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
//#endregion
//#region src/components/ProfileCard.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "ProfileCard",
	props: { initialUser: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const userDisplay = computed(() => {
			return dataUser.user || props.initialUser;
		});
		const stats = computed(() => [
			{
				icon: Sparkles,
				value: userDisplay.value?.totalPoints ?? 0,
				label: "Puntos",
				highlight: true
			},
			{
				icon: TrendingUp,
				value: userDisplay.value?.totalReviews ?? 0,
				label: "Reseñas",
				highlight: false
			},
			{
				icon: Award,
				value: 0,
				label: "Insignias",
				highlight: false
			}
		]);
		onMounted(() => {
			if (props.initialUser && !dataUser.user) setDataUser(props.initialUser);
		});
		const __returned__ = {
			props,
			userDisplay,
			stats,
			Avatar: Avatar_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden rounded-3xl border border-neutral-600/60 bg-gradient-to-br from-base-100 to-base-200 p-8 md:p-10 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300" }, _attrs))}><div class="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-[100px] animate-pulse"></div><div class="absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-secondary/20 blur-[90px] animate-pulse delay-1000"></div><div class="flex flex-col md:flex-row md:items-center gap-10"><div class="flex items-center gap-6">`);
	_push(ssrRenderComponent($setup["Avatar"], null, null, _parent));
	_push(`<div class="flex flex-col gap-2"><p class="text-sm uppercase tracking-[0.25em] text-accent-content/80 font-medium">Bienvenido de vuelta</p><h1 class="font-display text-4xl md:text-5xl font-extrabold text-base-content leading-tight">${ssrInterpolate($setup.userDisplay?.name ?? "Explorador")}</h1></div></div><div class="md:ml-auto grid grid-cols-3 gap-4"><!--[-->`);
	ssrRenderList($setup.stats, (s) => {
		_push(`<div class="${ssrRenderClass(["rounded-2xl p-5 border transition-all duration-200 hover:scale-105", s.highlight ? "bg-primary text-primary-content border-transparent shadow-lg shadow-primary/30" : "bg-base-100/50 border-base-300/50 hover:border-accent/30"])}"><div class="flex items-center gap-3 mb-3">`);
		ssrRenderVNode(_push, createVNode(resolveDynamicComponent(s.icon), { class: "h-6 w-6 opacity-80" }, null), _parent);
		_push(`<p class="${ssrRenderClass(["text-[12px] uppercase tracking-wider", s.highlight ? "opacity-85" : "text-neutral"])}">${ssrInterpolate(s.label)}</p></div><p class="font-display text-3xl font-bold leading-none">${ssrInterpolate(s.value)}</p></div>`);
	});
	_push(`<!--]--></div></div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProfileCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ProfileCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/RestaurantGrid.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "RestaurantGrid",
	props: { initialRestaurants: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const restaurants = ref(props.initialRestaurants ?? []);
		const loading = ref(!props.initialRestaurants);
		const error = ref("");
		async function loadRestaurants() {
			if (props.initialRestaurants && props.initialRestaurants.length > 0) return;
			loading.value = true;
			error.value = "";
			try {
				const response = await restaurantService.search("", void 0, 1);
				restaurants.value = response.restaurants ?? [];
			} catch (err) {
				console.error("Error cargando restaurantes:", err);
				error.value = "Error al cargar restaurantes desde la base de datos.";
			} finally {
				loading.value = false;
			}
		}
		onMounted(loadRestaurants);
		const __returned__ = {
			props,
			restaurants,
			loading,
			error,
			loadRestaurants,
			RestaurantCard: RestaurantCard_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
	if ($setup.loading) _push(`<div class="text-center py-20"><div class="inline-block"><div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div></div><p class="mt-4 text-neutral">Cargando restaurantes...</p></div>`);
	else if ($setup.error) _push(`<div class="alert alert-error"><span>${ssrInterpolate($setup.error)}</span></div>`);
	else {
		_push(`<div>`);
		if ($setup.restaurants.length === 0) _push(`<div class="text-center py-20 text-neutral rounded-3xl border border-base-300/60 bg-base-100/40"> No se encontraron restaurantes. </div>`);
		else {
			_push(`<div class="grid md:grid-cols-2 gap-6"><!--[-->`);
			ssrRenderList($setup.restaurants, (r) => {
				_push(ssrRenderComponent($setup["RestaurantCard"], {
					key: r.slug,
					r
				}, null, _parent));
			});
			_push(`<!--]--></div>`);
		}
		_push(`</div>`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RestaurantGrid.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RestaurantGrid_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/dashboard.astro
var dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Dashboard,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dashboard;
	const sessionToken = Astro.cookies.get("auth_token")?.value;
	if (!sessionToken) return Astro.redirect("/login");
	if (!verifyToken(sessionToken)) return Astro.redirect("/login");
	let userData = null;
	let initialRestaurants = [];
	try {
		const meResponse = await fetch(new URL("/api/auth/me", Astro.url.origin).toString(), { headers: {
			Cookie: `auth_token=${sessionToken}`,
			Accept: "application/json"
		} });
		if (!meResponse.ok) return Astro.redirect("/login");
		userData = (await meResponse.json()).user ?? null;
		if (!userData) return Astro.redirect("/login");
		const userSystem = userData.sys ?? "CLIENT";
		const restaurantId = userData.restaurant_id ?? null;
		if (userSystem === "RESTAURANT" && restaurantId) return Astro.redirect("/restaurant-admin");
		if (userSystem !== "CLIENT" && userSystem !== "ADMIN") return Astro.redirect("/login");
		initialRestaurants = (await restaurantService.search("")).restaurants ?? [];
	} catch (error) {
		console.error("Error cargando datos del dashboard SSR:", error);
		return Astro.redirect("/login");
	}
	const filterTabs = [
		"Todos",
		"Tendencia",
		"Promocionados"
	];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1 min-w-0">${renderComponent($$result, "HeaderPage", HeaderPage_default, {
		"title": "Dashboard",
		"subtitle": "Descubre nuevos restaurantes cerca de tí"
	})}<div class="px-6 md:px-10 py-8 space-y-8 max-w-350 mx-auto"><div class="flex flex-col gap-4">${renderComponent($$result, "ProfileCard", ProfileCard_default, {
		"initialUser": userData,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/ProfileCard.vue",
		"client:component-export": "default"
	})}</div><section><div class="flex items-end justify-between mb-5"><div><h2 class="font-display text-2xl font-bold">Restaurantes para tí </h2><p class="text-sm text-muted-foreground mt-1">Basado en tu ubicación</p></div><div class="hidden md:flex gap-2">${filterTabs.map((t, i) => renderTemplate`<button${addAttribute(`px-4 h-9 rounded-full text-sm font-medium transition border ${i === 0 ? "bg-foreground text-background border-foreground" : "border-border/60 text-muted-foreground hover:text-foreground hover:border-lime/40"}`, "class")}>${t}</button>`)}</div></div>${renderComponent($$result, "RestaurantGrid", RestaurantGrid_default, {
		"initialRestaurants": initialRestaurants,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RestaurantGrid.vue",
		"client:component-export": "default"
	})}</section><footer class="py-10 text-center text-xs text-muted-foreground">© 2026 rateapp</footer></div></main>` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/dashboard.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/dashboard.astro";
var $$url = "/dashboard";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard@_@astro
var page = () => dashboard_exports;
//#endregion
export { page };
