import { S as createAstro, f as renderHead, i as renderComponent, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { r as MobileDock_default, t as alertContainer_default } from "./alertContainer_Dpjkxg2m.mjs";
import { createVNode, defineComponent, onMounted, ref, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { BarChart, Home, Menu, Settings } from "lucide-vue-next";
//#region src/components/AppSidebarAdmin.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
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
				icon: Settings,
				label: "Settings",
				to: "/admin/settings"
			}
		];
		function isActive(to, idx) {
			return routePath.value === to && (idx === 0 || to !== "/");
		}
		const __returned__ = {
			open,
			routePath,
			items,
			isActive,
			get Menu() {
				return Menu;
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
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-9cf29af5><aside class="${ssrRenderClass([$setup.open ? "w-64" : "w-20", "shrink-0 transition-all duration-300 border-r border-base-300/60 bg-base-100/40 backdrop-blur-xl flex flex-col sticky top-0 h-screen"])}" data-v-9cf29af5><div class="flex items-center gap-3 px-5 h-20 border-b border-base-300/60" data-v-9cf29af5><button class="grid place-items-center h-10 w-10 rounded-xl bg-base-200 hover:bg-primary/10 hover:text-primary transition-colors" aria-label="Toggle menu" data-v-9cf29af5>`);
	_push(ssrRenderComponent($setup["Menu"], { class: "h-5 w-5" }, null, _parent));
	_push(`</button>`);
	if ($setup.open) _push(`<div class="flex flex-col items-baseline gap-1" data-v-9cf29af5><div class="flex w-full" data-v-9cf29af5><span class="font-display text-2xl font-bold tracking-tight" data-v-9cf29af5>rate</span><span class="font-display text-2xl font-bold text-lime" data-v-9cf29af5>app</span><span class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--p)]" data-v-9cf29af5></span></div><p class="text-xs text-muted-foreground" data-v-9cf29af5> For businesses </p></div>`);
	else _push(`<!---->`);
	_push(`</div><nav class="flex-1 px-3 py-6 space-y-1" data-v-9cf29af5><!--[-->`);
	ssrRenderList($setup.items, (it, idx) => {
		_push(`<a${ssrRenderAttr("href", it.to)} class="${ssrRenderClass(["group relative w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-all", $setup.isActive(it.to, idx) ? "bg-primary text-primary-content shadow-[0_0_24px_-4px_var(--p)]" : "text-neutral-content hover:text-base-content hover:bg-base-200"])}" data-v-9cf29af5>`);
		ssrRenderVNode(_push, createVNode(resolveDynamicComponent(it.icon), { class: "h-5 w-5 shrink-0" }, null), _parent);
		if ($setup.open) _push(`<span data-v-9cf29af5>${ssrInterpolate(it.label)}</span>`);
		else _push(`<!---->`);
		_push(`</a>`);
	});
	_push(`<!--]--></nav></aside></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AppSidebarAdmin.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppSidebarAdmin_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9cf29af5"]]);
//#endregion
//#region src/layouts/AdminBaseLayout.astro
createAstro("https://astro.build");
var $$AdminBaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminBaseLayout;
	const { title = "rateapp — Admin Dashboard", description = "Panel de control para administradores de restaurantes." } = Astro.props;
	return renderTemplate`<html lang="en" data-theme="sunset"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="author" content="rateapp"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta name="twitter:card" content="summary"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"><!-- Global styles (Tailwind + CSS vars) --><link rel="stylesheet" href="/src/styles/global.css">${renderHead($$result)}</head><body><div class="flex w-full bg-background text-foreground">${renderComponent($$result, "AlertContainer", alertContainer_default, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/UI/alertContainer.vue",
		"client:component-export": "default"
	})}${renderComponent($$result, "AppSideBar", AppSidebarAdmin_default, {
		"class": "md:block hidden",
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/AppSidebarAdmin.vue",
		"client:component-export": "default"
	})}${renderComponent($$result, "MobileDock", MobileDock_default, {
		"class": "md:hidden",
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/MobileDock.vue",
		"client:component-export": "default"
	})}${renderSlot($$result, $$slots["default"])}</div></body></html>`;
}, "C:/Users/Estudiante/rateappAstro/src/layouts/AdminBaseLayout.astro", void 0);
//#endregion
export { $$AdminBaseLayout as t };
