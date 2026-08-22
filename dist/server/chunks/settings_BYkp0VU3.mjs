import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { S as createAstro, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BkWFJBNh.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
//#region src/components/RestaurantDashboard.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "RestaurantDashboard",
	props: { restaurantId: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const restaurant = ref({
			name: "",
			category: "",
			cuisine: "",
			description: "",
			rating: 0,
			distance: 0,
			priceRange: "",
			promoted: false,
			phone: "",
			email: "",
			address: "",
			location: ""
		});
		const message = ref("");
		const isSaving = ref(false);
		const activeTab = ref("profile");
		const getRestaurantId = () => {
			if (props.restaurantId) return String(props.restaurantId);
			if (typeof window === "undefined") return "";
			const fromStorage = localStorage.getItem("restaurantId");
			if (fromStorage) return fromStorage;
			const fromSession = sessionStorage.getItem("restaurantId");
			if (fromSession) return fromSession;
			return "";
		};
		const loadRestaurant = async () => {
			const restaurantId = getRestaurantId();
			if (!restaurantId) {
				message.value = "No se encontró el ID del restaurante.";
				return;
			}
			try {
				const response = await fetch(`/api/restaurant?id=${encodeURIComponent(restaurantId)}`);
				const data = await response.json();
				if (!response.ok || !data.success) throw new Error(data.error || "No se pudo cargar el restaurante");
				restaurant.value = {
					...restaurant.value,
					...data.restaurant
				};
			} catch (error) {
				console.error("Error cargando restaurante:", error);
				message.value = "No se pudo cargar la información del restaurante.";
			}
		};
		const saveRestaurant = async () => {
			isSaving.value = true;
			message.value = "";
			try {
				const payload = {
					id: restaurant.value.id,
					name: restaurant.value.name,
					category: restaurant.value.category,
					cuisine: restaurant.value.cuisine,
					description: restaurant.value.description,
					phone: restaurant.value.phone,
					email: restaurant.value.email,
					address: restaurant.value.address,
					priceRange: restaurant.value.priceRange,
					promoted: restaurant.value.promoted
				};
				const response = await fetch("/api/restaurant", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				});
				const data = await response.json();
				if (!response.ok || !data.success) throw new Error(data.error || "No se pudo guardar");
				message.value = "Cambios guardados correctamente.";
			} catch (error) {
				console.error("Error guardando restaurante:", error);
				message.value = "No se pudieron guardar los cambios.";
			} finally {
				isSaving.value = false;
			}
		};
		onMounted(() => {
			loadRestaurant();
		});
		const __returned__ = {
			props,
			restaurant,
			message,
			isSaving,
			activeTab,
			getRestaurantId,
			loadRestaurant,
			saveRestaurant
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8" }, _attrs))}><div class="mx-auto max-w-6xl space-y-6"><div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20"><div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Restaurant Admin</p><h1 class="text-3xl font-bold tracking-tight">Ajustes del restaurante</h1><p class="mt-2 text-sm text-zinc-400"> Edita la información de tu negocio y revisa métricas clave. </p></div></div></div>`);
	if ($setup.message) _push(`<div class="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-300">${ssrInterpolate($setup.message)}</div>`);
	else _push(`<!---->`);
	_push(`<div class="flex gap-3"><button class="${ssrRenderClass([$setup.activeTab === "profile" ? "bg-orange-500 text-zinc-950" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100", "rounded-lg px-4 py-2 text-sm font-semibold transition-colors"])}"> Perfil del Restaurante </button><button class="${ssrRenderClass([$setup.activeTab === "stats" ? "bg-orange-500 text-zinc-950" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100", "rounded-lg px-4 py-2 text-sm font-semibold transition-colors"])}"> Estadísticas Rápidas </button></div>`);
	if ($setup.activeTab === "profile") _push(`<div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><section class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20"><h2 class="text-xl font-semibold">Información del Restaurante</h2><div class="mt-6 grid gap-4 md:grid-cols-2"><label class="block"><span class="mb-2 block text-sm font-medium text-zinc-300">Nombre</span><input${ssrRenderAttr("value", $setup.restaurant.name)} class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"></label><label class="block"><span class="mb-2 block text-sm font-medium text-zinc-300">Categoría</span><input${ssrRenderAttr("value", $setup.restaurant.category)} class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"></label><label class="block"><span class="mb-2 block text-sm font-medium text-zinc-300">Tipo de cocina</span><input${ssrRenderAttr("value", $setup.restaurant.cuisine)} class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"></label><label class="block"><span class="mb-2 block text-sm font-medium text-zinc-300">Rango de precios</span><input${ssrRenderAttr("value", $setup.restaurant.priceRange)} class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"></label><label class="block"><span class="mb-2 block text-sm font-medium text-zinc-300">Teléfono</span><input${ssrRenderAttr("value", $setup.restaurant.phone)} class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"></label><label class="block"><span class="mb-2 block text-sm font-medium text-zinc-300">Correo</span><input${ssrRenderAttr("value", $setup.restaurant.email)} type="email" class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"></label><label class="block md:col-span-2"><span class="mb-2 block text-sm font-medium text-zinc-300">Dirección</span><input${ssrRenderAttr("value", $setup.restaurant.address)} class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500"></label><label class="block md:col-span-2"><span class="mb-2 block text-sm font-medium text-zinc-300">Descripción</span><textarea class="min-h-30 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500">${ssrInterpolate($setup.restaurant.description)}</textarea></label><label class="flex items-center gap-3 rounded-lg border border-zinc-800 px-4 py-3 md:col-span-2"><input${ssrIncludeBooleanAttr(Array.isArray($setup.restaurant.promoted) ? ssrLooseContain($setup.restaurant.promoted, null) : $setup.restaurant.promoted) ? " checked" : ""} type="checkbox" class="h-4 w-4 accent-orange-500"><span class="text-sm font-medium">Promocionado</span></label></div><div class="mt-6 flex justify-end"><button class="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr($setup.isSaving) ? " disabled" : ""}>${ssrInterpolate($setup.isSaving ? "Guardando..." : "Guardar cambios")}</button></div></section><aside class="space-y-6"><div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20"><h3 class="text-lg font-semibold">Resumen rápido</h3><div class="mt-4 space-y-3"><div class="rounded-lg border border-orange-500/20 bg-orange-500/10 p-4"><p class="text-sm text-zinc-400">Estado</p><p class="text-lg font-semibold text-orange-400">${ssrInterpolate($setup.restaurant.promoted ? "Promocionado" : "Normal")}</p></div><div class="rounded-lg border border-zinc-800 bg-zinc-950/70 p-4"><p class="text-sm text-zinc-400">Ubicación</p><p class="text-lg font-semibold text-zinc-100">${ssrInterpolate($setup.restaurant.location || "Sin ubicación")}</p></div></div></div></aside></div>`);
	else if ($setup.activeTab === "stats") _push(`<div class="grid gap-6 md:grid-cols-3"><div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20"><p class="text-sm text-zinc-400">Rating actual</p><p class="mt-2 text-3xl font-bold text-orange-400">${ssrInterpolate($setup.restaurant.rating)}</p></div><div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20"><p class="text-sm text-zinc-400">Reseñas recibidas</p><p class="mt-2 text-3xl font-bold text-emerald-400">${ssrInterpolate($setup.restaurant.rating ? "24" : "0")}</p></div><div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20"><p class="text-sm text-zinc-400">Distancia registrada</p><p class="mt-2 text-3xl font-bold text-sky-400">${ssrInterpolate($setup.restaurant.distance)}</p></div></div>`);
	else _push(`<!---->`);
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RestaurantDashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RestaurantDashboard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/admin/settings.astro
var settings_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Settings,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Settings = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Settings;
	const sessionToken = Astro.cookies.get("auth_token")?.value;
	if (!sessionToken) return Astro.redirect("/login");
	const payload = verifyToken(sessionToken);
	if (!payload || payload.sys !== "RESTAURANT") return Astro.redirect("/login");
	let userData = null;
	let restaurantId = null;
	try {
		const meResponse = await fetch(new URL("/api/auth/me", Astro.url.origin).toString(), { headers: {
			Cookie: `auth_token=${sessionToken}`,
			Accept: "application/json"
		} });
		if (meResponse.ok) {
			userData = (await meResponse.json()).user ?? null;
			restaurantId = Number(userData?.restaurant_id ?? payload.restaurant_id) || null;
		} else restaurantId = payload.restaurant_id ? Number(payload.restaurant_id) : null;
	} catch (error) {
		console.error("Error cargando sesión del restaurante:", error);
		restaurantId = payload.restaurant_id ? Number(payload.restaurant_id) : null;
	}
	return renderTemplate`${renderComponent($$result, "AdminBaseLayout", $$AdminBaseLayout, { "title": "Ajustes del restaurante — Admin" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "RestaurantDashboard", RestaurantDashboard_default, {
		"restaurantId": restaurantId,
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RestaurantDashboard.vue",
		"client:component-export": "default"
	})}` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/admin/settings.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/admin/settings.astro";
var $$url = "/admin/settings";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/settings@_@astro
var page = () => settings_exports;
//#endregion
export { page };
