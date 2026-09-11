import { D as renderHead, I as createAstro, O as addAttribute, S as renderSlot, T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { r as storeUbicacion, t as alertContainer_default } from "./alertContainer_C-aVFGS1.mjs";
import { i as setDataUser, n as loadDataUserFromAPI, r as logoutUser, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { createVNode, defineComponent, mergeProps, onMounted, ref, resolveComponent, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { CircleUser, Compass, Heart, Home, LogOut, MapPin, Menu, Search, Settings, TicketPercent, X } from "lucide-vue-next";
//#region src/components/AppSidebar.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "AppSidebar",
	setup(__props, { expose: __expose }) {
		__expose();
		const open = ref(true);
		const routePath = ref("/");
		onMounted(async () => {
			await loadDataUserFromAPI();
			if (typeof window !== "undefined") {
				routePath.value = window.location.pathname;
				await storeUbicacion.detectarUbicacion();
				if (dataUser.user) {
					const coordinates = storeUbicacion.getCoordinates();
					if (coordinates) {
						const updatedUser = {
							...dataUser.user,
							currentLocation: coordinates
						};
						setDataUser(updatedUser);
					}
				}
			}
		});
		const items = [
			{
				icon: Home,
				label: "Feed",
				to: "/dashboard"
			},
			{
				icon: Compass,
				label: "Discover",
				to: "/discover"
			},
			{
				icon: Search,
				label: "Search",
				to: "/search"
			},
			{
				icon: TicketPercent,
				label: "Shop",
				to: "/shop"
			},
			{
				icon: Heart,
				label: "Favorites",
				to: "/favorites"
			},
			{
				icon: CircleUser,
				label: "Profile",
				to: "/profile"
			}
		];
		async function logoutUser() {
			try {
				const response = await fetch("/api/auth/logout", { headers: {
					"Content-Type": "application/json",
					method: "GET",
					credentials: "include"
				} });
				if (response.ok) {
					const data = await response.json();
					console.log(data.message);
					window.location.href = "/login";
				} else console.error("Error al cerrar sesión");
			} catch (error) {
				console.error("Error de red:", error);
			}
		}
		function isActive(to, idx) {
			return routePath.value === to && (idx === 0 || to !== "/");
		}
		const __returned__ = {
			open,
			routePath,
			items,
			get logoutUser() {
				return logoutUser;
			},
			isActive,
			get ubication() {
				return storeUbicacion;
			},
			get Menu() {
				return Menu;
			},
			get Settings() {
				return Settings;
			},
			get LogOut() {
				return LogOut;
			},
			get MapPin() {
				return MapPin;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))} data-v-37464788><aside class="${ssrRenderClass([$setup.open ? "w-64" : "w-20", "shrink-0 transition-all duration-300 border-r border-base-300/60 bg-base-100/40 backdrop-blur-xl flex flex-col sticky top-0 h-screen"])}" data-v-37464788><div class="flex items-center gap-3 px-5 h-20" data-v-37464788><button class="grid place-items-center h-10 w-10 rounded-xl bg-base-200 hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Toggle menu" data-v-37464788>`);
	_push(ssrRenderComponent($setup["Menu"], { class: "h-5 w-5" }, null, _parent));
	_push(`</button>`);
	if ($setup.open) _push(`<div class="flex items-baseline gap-1" data-v-37464788><span class="font-display text-2xl font-bold tracking-tight" data-v-37464788>rate</span><span class="font-display text-2xl font-bold text-lime" data-v-37464788>app</span><span class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--p)]" data-v-37464788></span></div>`);
	else _push(`<!---->`);
	_push(`</div><nav class="flex-1 px-3 py-6 space-y-1" data-v-37464788><!--[-->`);
	ssrRenderList($setup.items, (it, idx) => {
		_push(`<a${ssrRenderAttr("href", it.to)} class="${ssrRenderClass(["group relative w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-all", $setup.isActive(it.to, idx) ? "bg-primary text-primary-content shadow-[0_0_24px_-4px_var(--p)]" : "text-neutral-content hover:text-base-content hover:bg-base-200"])}" data-v-37464788>`);
		ssrRenderVNode(_push, createVNode(resolveDynamicComponent(it.icon), { class: "h-5 w-5 shrink-0" }, null), _parent);
		if ($setup.open) _push(`<span data-v-37464788>${ssrInterpolate(it.label)}</span>`);
		else _push(`<!---->`);
		if (it.badge && $setup.open) _push(`<span class="${ssrRenderClass(["ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md", $setup.isActive(it.to, idx) ? "bg-base-100/20" : "bg-primary/15 text-primary"])}" data-v-37464788>${ssrInterpolate(it.badge)}</span>`);
		else _push(`<!---->`);
		_push(`</a>`);
	});
	_push(`<!--]--></nav><div class="px-3 py-4 border-t border-base-300/60 space-y-3" data-v-37464788><div class="rounded-2xl border border-base-200 bg-base-200/60 p-3 text-sm text-neutral" data-v-37464788><div class="flex items-center gap-2 overflow-hidden" data-v-37464788>`);
	_push(ssrRenderComponent($setup["MapPin"], { class: "h-4 w-4 shrink-0 text-neutral-content" }, null, _parent));
	_push(`<span class="font-semibold text-accent-content/85" data-v-37464788>Ubicación</span></div><p class="mt-2 text-xs leading-5 text-base-content/80 overflow-hidden" data-v-37464788>${ssrInterpolate($setup.ubication.ciudad)}</p></div><a href="/settings" class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors" data-v-37464788>`);
	_push(ssrRenderComponent($setup["Settings"], { class: "h-5 w-5" }, null, _parent));
	if ($setup.open) _push(`<span data-v-37464788>Settings</span>`);
	else _push(`<!---->`);
	_push(`</a><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors" data-v-37464788>`);
	_push(ssrRenderComponent($setup["LogOut"], { class: "h-5 w-5" }, null, _parent));
	if ($setup.open) _push(`<span data-v-37464788>Log Out</span>`);
	else _push(`<!---->`);
	_push(`</button></div></aside></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AppSidebar.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AppSidebar_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-37464788"]]);
//#endregion
//#region src/components/MobileDock.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "MobileDock",
	setup(__props, { expose: __expose }) {
		__expose();
		const routePath = ref("/");
		const showMore = ref(false);
		onMounted(async () => {
			await loadDataUserFromAPI();
			if (typeof window !== "undefined") {
				routePath.value = window.location.pathname;
				await storeUbicacion.detectarUbicacion();
				if (dataUser.user) {
					const coordinates = storeUbicacion.getCoordinates();
					if (coordinates) {
						const updatedUser = {
							...dataUser.user,
							currentLocation: coordinates
						};
						setDataUser(updatedUser);
					}
				}
			}
		});
		const items = [
			{
				icon: Home,
				label: "Feed",
				to: "/dashboard"
			},
			{
				icon: Compass,
				label: "Discover",
				to: "/discover"
			},
			{
				icon: TicketPercent,
				label: "Shop",
				to: "/shop"
			},
			{
				icon: Search,
				label: "Search",
				to: "/search"
			},
			{
				icon: Heart,
				label: "Favorites",
				to: "/favorites"
			},
			{
				icon: CircleUser,
				label: "Profile",
				to: "/profile"
			}
		];
		function isActive(to, idx) {
			return routePath.value === to && (idx === 0 || to !== "/");
		}
		const __returned__ = {
			routePath,
			showMore,
			items,
			isActive,
			get ubication() {
				return storeUbicacion;
			},
			get logoutUser() {
				return logoutUser;
			},
			get Settings() {
				return Settings;
			},
			get LogOut() {
				return LogOut;
			},
			get X() {
				return X;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_MoreHorizontal = resolveComponent("MoreHorizontal");
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-0ce5ad51><div class="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2" data-v-0ce5ad51><nav class="w-full max-w-sm flex items-center justify-around gap-1 rounded-[28px] border border-base-300/60 bg-base-100/90 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] px-2 py-2" data-v-0ce5ad51><!--[-->`);
	ssrRenderList($setup.items, (it, idx) => {
		_push(`<a${ssrRenderAttr("href", it.to)} class="${ssrRenderClass(["flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 transition-all duration-200", $setup.isActive(it.to, idx) ? "bg-primary/10" : "hover:bg-base-200"])}" data-v-0ce5ad51>`);
		ssrRenderVNode(_push, createVNode(resolveDynamicComponent(it.icon), { class: ["h-5 w-5 transition-colors", $setup.isActive(it.to, idx) ? "text-primary" : "text-neutral-content"] }, null), _parent);
		_push(`<span class="${ssrRenderClass(["text-[11px] font-medium transition-colors", $setup.isActive(it.to, idx) ? "text-primary" : "text-neutral-content"])}" data-v-0ce5ad51>${ssrInterpolate(it.label)}</span></a>`);
	});
	_push(`<!--]--><button class="flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 hover:bg-base-200 transition-colors" data-v-0ce5ad51>`);
	_push(ssrRenderComponent(_component_MoreHorizontal, { class: "h-5 w-5 text-neutral-content" }, null, _parent));
	_push(`<span class="text-[11px] font-medium text-neutral-content" data-v-0ce5ad51>More</span></button></nav><div class="mt-2 h-1 w-24 rounded-full bg-base-300/70" data-v-0ce5ad51></div></div>`);
	if ($setup.showMore) {
		_push(`<div class="fixed inset-0 z-50 flex flex-col justify-end" data-v-0ce5ad51><div class="absolute inset-0 bg-black/40" data-v-0ce5ad51></div><div class="relative bg-base-100 rounded-t-2xl border-t border-base-300/60 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]" data-v-0ce5ad51><div class="flex items-center justify-between mb-4" data-v-0ce5ad51><span class="font-display text-lg font-bold" data-v-0ce5ad51>Menu</span><button class="grid place-items-center h-9 w-9 rounded-full hover:bg-base-200" data-v-0ce5ad51>`);
		_push(ssrRenderComponent($setup["X"], { class: "h-5 w-5" }, null, _parent));
		_push(`</button></div><div class="rounded-2xl border border-base-200 bg-base-200/60 p-3 text-sm text-neutral mb-3" data-v-0ce5ad51><div class="flex items-center gap-2" data-v-0ce5ad51><span class="font-semibold text-accent-content/85" data-v-0ce5ad51>Ubicación</span></div><p class="mt-1 text-xs leading-5 text-base-content/80" data-v-0ce5ad51>${ssrInterpolate($setup.ubication.ciudad)}</p></div><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors" data-v-0ce5ad51>`);
		_push(ssrRenderComponent($setup["Settings"], { class: "h-5 w-5" }, null, _parent));
		_push(`<span data-v-0ce5ad51>Settings</span></button><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors" data-v-0ce5ad51>`);
		_push(ssrRenderComponent($setup["LogOut"], { class: "h-5 w-5" }, null, _parent));
		_push(`<span data-v-0ce5ad51>Sign out</span></button></div></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/MobileDock.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var MobileDock_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0ce5ad51"]]);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://astro.build");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title = "rateapp — Discover & review the world's best food", description = "rateapp is the modern food review platform. Earn points, complete weekly quests, and discover top-rated restaurants near you." } = Astro.props;
	return renderTemplate`<html lang="en" data-theme="abyss"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="author" content="rateapp"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta name="twitter:card" content="summary"><link rel="icon" href="/public/avatar-user.jpg"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"><!-- Global styles (Tailwind + CSS vars) --><link rel="stylesheet" href="/src/styles/global.css">${renderHead($$result)}</head><body><div class="flex w-full bg-background text-foreground">${renderComponent($$result, "AlertContainer", alertContainer_default, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/UI/alertContainer.vue",
		"client:component-export": "default"
	})}${renderComponent($$result, "AppSideBar", AppSidebar_default, {
		"class": "md:block hidden",
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/AppSidebar.vue",
		"client:component-export": "default"
	})}${renderComponent($$result, "MobileDock", MobileDock_default, {
		"class": "md:hidden",
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/MobileDock.vue",
		"client:component-export": "default"
	})}${renderSlot($$result, $$slots["default"])}</div></body></html>`;
}, "/home/manuel/RateAppProject/rateappAstro/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { $$BaseLayout as t };
