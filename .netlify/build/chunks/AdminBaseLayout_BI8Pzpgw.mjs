import { D as renderHead, I as createAstro, O as addAttribute, S as renderSlot, T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { r as storeUbicacion, t as alertContainer_default } from "./alertContainer_C-aVFGS1.mjs";
import { i as setDataUser, n as loadDataUserFromAPI, r as logoutUser, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { createVNode, defineComponent, onMounted, ref, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { BarChart, Home, LogOut, Menu, MoreHorizontal, Settings, Ticket, TicketX, X } from "lucide-vue-next";
//#region src/components/AppSidebarAdmin.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "AppSidebarAdmin",
	setup(__props, { expose: __expose }) {
		__expose();
		const open = ref(true);
		const routePath = ref("/");
		onMounted(() => {
			if (typeof window !== "undefined") routePath.value = window.location.pathname;
		});
		const items = [
			{
				icon: Home,
				label: "Home",
				to: "/admin/dashboard"
			},
			{
				icon: BarChart,
				label: "Estadísticas",
				to: "/admin/analytics"
			},
			{
				icon: Ticket,
				label: "Crear Cupon",
				to: "/admin/createCupon"
			},
			{
				icon: TicketX,
				label: "Redimir Cupon",
				to: "/admin/redeemCoupon"
			},
			{
				icon: Settings,
				label: "Settings",
				to: "/admin/settings"
			}
		];
		function isActive(to, idx) {
			return routePath.value === to && (idx === 0 || to !== "/");
		}
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
		const __returned__ = {
			open,
			routePath,
			items,
			isActive,
			get logoutUser() {
				return logoutUser;
			},
			get Menu() {
				return Menu;
			},
			get LogOut() {
				return LogOut;
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
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-441cbf6c><aside class="${ssrRenderClass([$setup.open ? "w-64" : "w-20", "shrink-0 transition-all duration-300 border-r border-base-300/60 bg-base-100/40 backdrop-blur-xl flex flex-col sticky top-0 h-screen"])}" data-v-441cbf6c><div class="flex items-center gap-3 px-5 h-20 border-b border-base-300/60" data-v-441cbf6c><button class="grid place-items-center h-10 w-10 rounded-xl bg-base-200 hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Toggle menu" data-v-441cbf6c>`);
	_push(ssrRenderComponent($setup["Menu"], { class: "h-5 w-5" }, null, _parent));
	_push(`</button>`);
	if ($setup.open) _push(`<div class="flex flex-col items-baseline gap-1" data-v-441cbf6c><div class="flex w-full" data-v-441cbf6c><span class="font-display text-2xl font-bold tracking-tight" data-v-441cbf6c>rate</span><span class="font-display text-2xl font-bold text-lime" data-v-441cbf6c>app</span><span class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--p)]" data-v-441cbf6c></span></div><p class="text-xs text-muted-foreground" data-v-441cbf6c> For businesses </p></div>`);
	else _push(`<!---->`);
	_push(`</div><nav class="flex-1 px-3 py-6 space-y-1" data-v-441cbf6c><!--[-->`);
	ssrRenderList($setup.items, (it, idx) => {
		_push(`<a${ssrRenderAttr("href", it.to)} class="${ssrRenderClass(["group relative w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-all", $setup.isActive(it.to, idx) ? "bg-primary text-primary-content shadow-[0_0_24px_-4px_var(--p)]" : "text-neutral-content hover:text-base-content hover:bg-base-200"])}" data-v-441cbf6c>`);
		ssrRenderVNode(_push, createVNode(resolveDynamicComponent(it.icon), { class: "h-5 w-5 shrink-0" }, null), _parent);
		if ($setup.open) _push(`<span data-v-441cbf6c>${ssrInterpolate(it.label)}</span>`);
		else _push(`<!---->`);
		_push(`</a>`);
	});
	_push(`<!--]--></nav><div class="px-3 py-4 border-t border-base-300/60 space-y-3" data-v-441cbf6c><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors" data-v-441cbf6c>`);
	_push(ssrRenderComponent($setup["LogOut"], { class: "h-5 w-5" }, null, _parent));
	if ($setup.open) _push(`<span data-v-441cbf6c>Log Out</span>`);
	else _push(`<!---->`);
	_push(`</button></div></aside></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AppSidebarAdmin.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AppSidebarAdmin_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-441cbf6c"]]);
//#endregion
//#region src/components/MobileDockAdmin.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "MobileDockAdmin",
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
				label: "Home",
				to: "/admin/dashboard"
			},
			{
				icon: BarChart,
				label: "Estadísticas",
				to: "/admin/analytics"
			},
			{
				icon: Ticket,
				label: "Crear Cupon",
				to: "/admin/createCupon"
			},
			{
				icon: TicketX,
				label: "Redimir Cupon",
				to: "/admin/redeemCoupon"
			},
			{
				icon: Settings,
				label: "Settings",
				to: "/admin/settings"
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
			get logoutUser() {
				return logoutUser;
			},
			get Settings() {
				return Settings;
			},
			get MoreHorizontal() {
				return MoreHorizontal;
			},
			get X() {
				return X;
			},
			get LogOut() {
				return LogOut;
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
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-ea5175d2><div class="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2" data-v-ea5175d2><nav class="w-full max-w-sm flex items-center justify-around gap-1 rounded-[28px] border border-base-300/60 bg-base-100/90 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] px-2 py-2" data-v-ea5175d2><!--[-->`);
	ssrRenderList($setup.items, (it, idx) => {
		_push(`<a${ssrRenderAttr("href", it.to)} class="${ssrRenderClass(["flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 transition-all duration-200 ellipsis", $setup.isActive(it.to, idx) ? "bg-primary/10" : "hover:bg-base-200"])}" data-v-ea5175d2>`);
		ssrRenderVNode(_push, createVNode(resolveDynamicComponent(it.icon), { class: ["h-5 w-5 transition-colors", $setup.isActive(it.to, idx) ? "text-primary" : "text-neutral-content"] }, null), _parent);
		_push(`<span class="${ssrRenderClass(["text-[11px] font-medium transition-colors", $setup.isActive(it.to, idx) ? "text-primary" : "text-neutral-content"])}" data-v-ea5175d2>${ssrInterpolate(it.label)}</span></a>`);
	});
	_push(`<!--]--><button class="flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 hover:bg-base-200 transition-colors" data-v-ea5175d2>`);
	_push(ssrRenderComponent($setup["MoreHorizontal"], { class: "h-5 w-5 text-neutral-content" }, null, _parent));
	_push(`<span class="text-[11px] font-medium text-neutral-content" data-v-ea5175d2>More</span></button></nav><div class="mt-2 h-1 w-24 rounded-full bg-base-300/70" data-v-ea5175d2></div></div>`);
	if ($setup.showMore) {
		_push(`<div class="fixed inset-0 z-50 flex flex-col justify-end" data-v-ea5175d2><div class="absolute inset-0 bg-black/40" data-v-ea5175d2></div><div class="relative bg-base-100 rounded-t-2xl border-t border-base-300/60 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]" data-v-ea5175d2><div class="flex items-center justify-between mb-4" data-v-ea5175d2><span class="font-display text-lg font-bold" data-v-ea5175d2>Menu</span><button class="grid place-items-center h-9 w-9 rounded-full hover:bg-base-200" data-v-ea5175d2>`);
		_push(ssrRenderComponent($setup["X"], { class: "h-5 w-5" }, null, _parent));
		_push(`</button></div><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors" data-v-ea5175d2>`);
		_push(ssrRenderComponent($setup["Settings"], { class: "h-5 w-5" }, null, _parent));
		_push(`<span data-v-ea5175d2>Settings</span></button><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors" data-v-ea5175d2>`);
		_push(ssrRenderComponent($setup["LogOut"], { class: "h-5 w-5" }, null, _parent));
		_push(`<span data-v-ea5175d2>Sign out</span></button></div></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/MobileDockAdmin.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var MobileDockAdmin_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ea5175d2"]]);
//#endregion
//#region src/layouts/AdminBaseLayout.astro
createAstro("https://astro.build");
var $$AdminBaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminBaseLayout;
	const { title = "rateapp — Admin Dashboard", description = "Panel de control para administradores de restaurantes." } = Astro.props;
	return renderTemplate`<html lang="en" data-theme="sunset"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="author" content="rateapp"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta name="twitter:card" content="summary"><link rel="icon" href="/public/avatar-user.jpg"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"><!-- Global styles (Tailwind + CSS vars) --><link rel="stylesheet" href="/src/styles/global.css">${renderHead($$result)}</head><body><div class="flex w-full bg-background text-foreground">${renderComponent($$result, "AlertContainer", alertContainer_default, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/UI/alertContainer.vue",
		"client:component-export": "default"
	})}${renderComponent($$result, "AppSideBarAdmin", AppSidebarAdmin_default, {
		"class": "md:block hidden",
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/AppSidebarAdmin.vue",
		"client:component-export": "default"
	})}${renderComponent($$result, "MobileDockAdmin", MobileDockAdmin_default, {
		"class": "md:hidden",
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/MobileDockAdmin.vue",
		"client:component-export": "default"
	})}<div class="md:visible hidden" fab fab-flower><!-- a focusable div with tabindex is necessary to work on all browsers. role="button" is necessary for accessibility --><div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary">${renderComponent($$result, "Menu", Menu, {})}</div><!-- buttons that show up when FAB is open --><a href="/admin/createCupon"><button class="btn btn-lg btn-circle">${renderComponent($$result, "Ticket", Ticket, {})}</button></a><a href="/admin/redeemCoupon"><button class="btn btn-lg btn-circle">${renderComponent($$result, "TicketX", TicketX, {})}</button></a></div>${renderSlot($$result, $$slots["default"])}</div></body></html>`;
}, "/home/manuel/RateAppProject/rateappAstro/src/layouts/AdminBaseLayout.astro", void 0);
//#endregion
export { $$AdminBaseLayout as t };
