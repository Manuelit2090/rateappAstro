import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { i as storeUbicacion } from "./alertContainer_Dpjkxg2m.mjs";
import { n as loadDataUserFromAPI, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { t as HeaderPage_default } from "./HeaderPage_CDlO84Oc.mjs";
import { r as badges_default, t as checkBadges } from "./badgeVerifier_La99V4f4.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/BadgeList.vue
var _sfc_main$1 = {
	__name: "BadgeList",
	setup(__props, { expose: __expose }) {
		__expose();
		const $listBadges = ref(badges_default);
		const badgeSummary = computed(() => checkBadges(dataUser.user, badges_default));
		const earnedBadgeIds = computed(() => new Set(badgeSummary.value.earnedBadgeIds));
		const getDifficultyBadge = (difficulty) => {
			switch (difficulty?.toLowerCase()) {
				case "facil": return "bg-success/10 text-success border-success/20";
				case "medio": return "bg-warning/10 text-warning border-warning/20";
				case "dificil": return "bg-error/10 text-error border-error/20";
				default: return "bg-neutral/10 text-neutral border-neutral/20";
			}
		};
		const __returned__ = {
			$listBadges,
			badgeSummary,
			earnedBadgeIds,
			getDifficultyBadge,
			computed,
			ref,
			get dataUser() {
				return dataUser;
			},
			get listBadges() {
				return badges_default;
			},
			get checkBadges() {
				return checkBadges;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-base-100" }, _attrs))}><!--[-->`);
	ssrRenderList($setup.$listBadges, (badge) => {
		_push(`<div class="${ssrRenderClass(["relative flex flex-col justify-between p-6 rounded-2xl border border-base-content/10 bg-base-200 hover:border-primary/30 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300 overflow-hidden group", $setup.earnedBadgeIds.has(badge.id) ? "ring-2 ring-success/70" : "opacity-80"])}"><div class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div><div class="relative z-10"><div class="flex items-center justify-between gap-2 mb-4 text-xs font-bold uppercase tracking-wider"><span class="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">${ssrInterpolate(badge.category)}</span><span class="${ssrRenderClass(["px-2.5 py-1 rounded-lg border", $setup.getDifficultyBadge(badge.difficulty)])}">${ssrInterpolate(badge.difficulty)}</span></div><div class="flex items-center justify-between gap-2 mb-2"><h3 class="text-xl font-black text-base-content group-hover:text-primary transition-colors">${ssrInterpolate(badge.badgeName)}</h3>`);
		if ($setup.earnedBadgeIds.has(badge.id)) _push(`<span class="px-2.5 py-1 rounded-full bg-success/15 text-success text-xs font-bold"> Ganada </span>`);
		else _push(`<!---->`);
		_push(`</div><p class="text-sm text-base-content/70 leading-relaxed mb-5">${ssrInterpolate(badge.badgeDescription)}</p></div><div class="relative z-10 mt-auto pt-4 border-t border-dashed border-base-content/10"><span class="block text-xs font-bold text-base-content/40 uppercase tracking-wider mb-1.5"> Requisito </span><p class="text-sm font-medium text-base-content/90 bg-base-300/50 px-3 py-2.5 rounded-xl border border-base-content/5">${ssrInterpolate(badge.requirements)}</p></div></div>`);
	});
	_push(`<!--]--></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BadgeList.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var BadgeList_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/ProfilePage.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "ProfilePage",
	setup(__props, { expose: __expose }) {
		__expose();
		const ciudad = ref("Cargando ubicación...");
		const routePath = ref("");
		onMounted(async () => {
			await loadDataUserFromAPI();
			if (typeof window !== "undefined") {
				routePath.value = window.location.pathname;
				await storeUbicacion.detectarUbicacion();
			}
		});
		const __returned__ = {
			ciudad,
			routePath,
			userInitial: computed(() => {
				return dataUser.user?.name ? dataUser.user.name.charAt(0).toUpperCase() : "?";
			}),
			get ubication() {
				return storeUbicacion;
			},
			get dataUser() {
				return dataUser;
			},
			BadgeList: BadgeList_default,
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full mx-auto" }, _attrs))}>`);
	if ($setup.dataUser.user) {
		_push(`<div class="space-y-6">`);
		_push(ssrRenderComponent($setup["HeaderPage"], {
			title: "perfil",
			subtitle: "Encuentra us estadisticas e información"
		}, null, _parent));
		_push(`<div class="card bg-base-100 shadow-xl overflow-hidden border border-base-200"><div class="h-32 bg-linear-to-r from-primary to-primary-content"></div><div class="card-body relative pt-0 flex flex-col md:flex-row gap-6 items-center md:items-end -mt-16"><div class="avatar placeholder"><div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-neutral text-base-content text-6xl font-bold"><span class="w-full h-full flex justify-center items-center">${ssrInterpolate($setup.userInitial)}</span></div></div><div class="flex-1 text-center md:text-left space-y-1"><h2 class="card-title text-2xl font-bold justify-center md:justify-start">${ssrInterpolate($setup.dataUser.user.name)}</h2><p class="text-base-content/70 flex items-center justify-center md:justify-start gap-2"><svg xmlns="http://w3.org" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> ${ssrInterpolate($setup.dataUser.user.email)}</p></div></div></div><div class="stats stats-vertical lg:stats-horizontal shadow bg-base-100 w-full border border-base-200"><div class="stat"><div class="stat-figure text-primary"><svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><div class="stat-title font-medium">Puntos Totales</div><div class="stat-value text-primary">${ssrInterpolate($setup.dataUser.user.totalPoints)}</div><div class="stat-desc">Acumulados en tu cuenta</div></div><div class="stat"><div class="stat-figure text-secondary"><svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.582 1.832l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.778-.58-.38-1.832.582-1.832h4.906a1 1 0 00.95-.69l1.519-4.674z"></path></svg></div><div class="stat-title font-medium">Reseñas Escritas</div><div class="stat-value text-secondary">${ssrInterpolate($setup.dataUser.user.totalReviews)}</div><div class="stat-desc">Opiniones compartidas</div></div><div class="stat"><div class="stat-figure text-accent"><svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div><div class="stat-title font-medium">Favoritos</div><div class="stat-value text-accent">${ssrInterpolate($setup.dataUser.user.favoriteRestaurant?.length || 0)}</div><div class="stat-desc">Restaurantes guardados</div></div></div>`);
		if ($setup.dataUser.user.currentLocation) _push(`<div class="card bg-base-100 shadow-md border border-base-200"><div class="card-body p-4 flex flex-row items-center gap-4"><div class="p-3 bg-base-200 rounded-lg text-base-content"><svg xmlns="http://w3.org" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><div><h4 class="text-sm font-semibold opacity-70">Ubicación Actual</h4><p class="text-sm font-mono text-secondary"> Ciudad: ${ssrInterpolate($setup.ubication.ciudad)}</p></div></div></div>`);
		else _push(`<!---->`);
		_push(ssrRenderComponent($setup["BadgeList"], null, null, _parent));
		_push(`</div>`);
	} else _push(`<div class="hero min-h-[300px] bg-base-200 rounded-xl"><div class="hero-content text-center"><div class="max-w-md"><svg xmlns="http://w3.org" class="h-14 w-14 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg><h3 class="text-xl font-bold opacity-80">No hay sesión activa</h3><p class="py-2 text-sm opacity-60">Por favor, inicia sesión para ver tu perfil y estadísticas.</p></div></div></div>`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProfilePage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProfilePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/profile.astro
var profile_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Profile,
	file: () => $$file,
	url: () => $$url
});
var $$Profile = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Profile — rateapp",
		"description": "Manage your profile and preferences."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ProfilePage", ProfilePage_default, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/ProfilePage.vue",
		"client:component-export": "default"
	})}` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/profile.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/profile.astro";
var $$url = "/profile";
//#endregion
//#region \0virtual:astro:page:src/pages/profile@_@astro
var page = () => profile_exports;
//#endregion
export { page };
