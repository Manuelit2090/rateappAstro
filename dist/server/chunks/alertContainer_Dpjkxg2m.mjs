import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { i as setDataUser, n as loadDataUserFromAPI, r as logoutUser, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { createVNode, defineComponent, mergeProps, onMounted, reactive, ref, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { CircleUser, Compass, Heart, Home, LogOut, MoreHorizontal, Settings, X } from "lucide-vue-next";
import { useStore } from "@nanostores/vue";
import { atom } from "nanostores";
//#region src/components/UI/storeUbication.ts
var storeUbicacion = reactive({
	ciudad: "Obteniendo ubicación...",
	latitud: null,
	longitud: null,
	async detectarUbicacion() {
		if (!navigator.geolocation) {
			this.ciudad = "Geolocalización no soportada";
			return;
		}
		const posicion = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: false,
				timeout: 1e4,
				maximumAge: 6e4
			});
		}).catch(async (error) => {
			console.error("Geolocation error:", error);
			switch (error.code) {
				case 1:
					this.ciudad = "Permiso de ubicación denegado";
					break;
				case 2:
					this.ciudad = "Ubicación no disponible desde el servicio de red";
					break;
				case 3:
					this.ciudad = "Tiempo de espera agotado";
					break;
				default: this.ciudad = "Error al obtener ubicación";
			}
			await this._obtenerUbicacionPorIp();
			return null;
		});
		if (!posicion) return;
		this.latitud = posicion.coords.latitude;
		this.longitud = posicion.coords.longitude;
		try {
			const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitud}&lon=${this.longitud}`;
			const data = await (await fetch(url, { headers: { "Accept": "application/json" } })).json();
			if (data.address) this.ciudad = data.address.city || data.address.town || data.address.village || data.address.municipality || "Ciudad no detectada";
		} catch (error) {
			this.ciudad = "Error al obtener ciudad";
			console.error(error);
		}
	},
	async _obtenerUbicacionPorIp() {
		try {
			const response = await fetch("https://ipapi.co/json/");
			if (!response.ok) throw new Error("IP geolocation no disponible");
			const data = await response.json();
			if (data) {
				this.ciudad = data.city || data.region || data.country_name || this.ciudad;
				if (!this.latitud && data.latitude && data.longitude) {
					this.latitud = typeof data.latitude === "string" ? parseFloat(data.latitude) : data.latitude;
					this.longitud = typeof data.longitude === "string" ? parseFloat(data.longitude) : data.longitude;
				}
			}
		} catch (error) {
			console.error("IP fallback failed:", error);
		}
	},
	getCoordinates() {
		if (this.latitud !== null && this.longitud !== null) return {
			lat: this.latitud,
			lng: this.longitud
		};
		return null;
	}
});
//#endregion
//#region src/components/MobileDock.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
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
					if (coordinates) setDataUser({
						...dataUser.user,
						currentLocation: coordinates
					});
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
			get MoreHorizontal() {
				return MoreHorizontal;
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
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-2b3672b9><div class="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2" data-v-2b3672b9><nav class="w-full max-w-sm flex items-center justify-around gap-1 rounded-[28px] border border-base-300/60 bg-base-100/90 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] px-2 py-2" data-v-2b3672b9><!--[-->`);
	ssrRenderList($setup.items, (it, idx) => {
		_push(`<a${ssrRenderAttr("href", it.to)} class="${ssrRenderClass(["flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 transition-all duration-200", $setup.isActive(it.to, idx) ? "bg-primary/10" : "hover:bg-base-200"])}" data-v-2b3672b9>`);
		ssrRenderVNode(_push, createVNode(resolveDynamicComponent(it.icon), { class: ["h-5 w-5 transition-colors", $setup.isActive(it.to, idx) ? "text-primary" : "text-neutral-content"] }, null), _parent);
		_push(`<span class="${ssrRenderClass(["text-[11px] font-medium transition-colors", $setup.isActive(it.to, idx) ? "text-primary" : "text-neutral-content"])}" data-v-2b3672b9>${ssrInterpolate(it.label)}</span></a>`);
	});
	_push(`<!--]--><button class="flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 hover:bg-base-200 transition-colors" data-v-2b3672b9>`);
	_push(ssrRenderComponent($setup["MoreHorizontal"], { class: "h-5 w-5 text-neutral-content" }, null, _parent));
	_push(`<span class="text-[11px] font-medium text-neutral-content" data-v-2b3672b9>More</span></button></nav><div class="mt-2 h-1 w-24 rounded-full bg-base-300/70" data-v-2b3672b9></div></div>`);
	if ($setup.showMore) {
		_push(`<div class="fixed inset-0 z-50 flex flex-col justify-end" data-v-2b3672b9><div class="absolute inset-0 bg-black/40" data-v-2b3672b9></div><div class="relative bg-base-100 rounded-t-2xl border-t border-base-300/60 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]" data-v-2b3672b9><div class="flex items-center justify-between mb-4" data-v-2b3672b9><span class="font-display text-lg font-bold" data-v-2b3672b9>Menu</span><button class="grid place-items-center h-9 w-9 rounded-full hover:bg-base-200" data-v-2b3672b9>`);
		_push(ssrRenderComponent($setup["X"], { class: "h-5 w-5" }, null, _parent));
		_push(`</button></div><div class="rounded-2xl border border-base-200 bg-base-200/60 p-3 text-sm text-neutral mb-3" data-v-2b3672b9><div class="flex items-center gap-2" data-v-2b3672b9><span class="font-semibold text-accent-content/85" data-v-2b3672b9>Ubicación</span></div><p class="mt-1 text-xs leading-5 text-base-content/80" data-v-2b3672b9>${ssrInterpolate($setup.ubication.ciudad)}</p></div><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors" data-v-2b3672b9>`);
		_push(ssrRenderComponent($setup["Settings"], { class: "h-5 w-5" }, null, _parent));
		_push(`<span data-v-2b3672b9>Settings</span></button><button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors" data-v-2b3672b9>`);
		_push(ssrRenderComponent($setup["LogOut"], { class: "h-5 w-5" }, null, _parent));
		_push(`<span data-v-2b3672b9>Sign out</span></button></div></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/MobileDock.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var MobileDock_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2b3672b9"]]);
//#endregion
//#region src/store/alerts.ts
/**
* @file avisos.ts
* @description Store reactivo (nanostores) para el sistema de avisos/notificaciones.
* @note A diferencia de `reactive()` de Vue, un nanostore es el mismo objeto sin
*       importar en qué isla de Astro (Vue) se importe, así que sirve para
*       disparar un aviso desde un componente y mostrarlo en otro distinto.
* @dependencies nanostores
*/
var DEFAULT_DURATION = 4e3;
var avisos = atom([]);
/**
* Muestra un nuevo aviso. Se autoelimina pasado `duration` ms.
* @returns el id generado, útil si quieres cerrarlo manualmente antes.
*/
function showAviso(message, type = "info", duration = DEFAULT_DURATION) {
	const id = crypto.randomUUID();
	const nuevoAviso = {
		id,
		message,
		type,
		duration
	};
	avisos.set([...avisos.get(), nuevoAviso]);
	if (duration > 0) setTimeout(() => removeAviso(id), duration);
	return id;
}
/**
* Elimina un aviso puntual por id (ej. al hacer click en cerrar, o al vencer el timeout).
*/
function removeAviso(id) {
	avisos.set(avisos.get().filter((a) => a.id !== id));
}
//#endregion
//#region src/components/UI/alertContainer.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "alertContainer",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			listaAvisos: useStore(avisos),
			alertClass: {
				success: "alert-success",
				error: "alert-error",
				info: "alert-info",
				warning: "alert-warning"
			},
			alertIcon: {
				success: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 shrink-0 stroke-current\" fill=\"none\" viewBox=\"0 0 24 24\"> <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" /> </svg>",
				error: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 shrink-0 stroke-current\" fill=\"none\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v2m0 4h.01m-.64 4.849l4.849-4.849M3 15a12 12 0 0118 0m-18 0a12 12 0 0018 0z\" /> </svg>",
				info: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 shrink-0 stroke-current\" fill=\"none\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>",
				warning: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 shrink-0 stroke-current\" fill=\"none\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v2m0 4h.01m-.64 4.849l4.849-4.849M3 15a12 12 0 0118 0m-18 0a12 12 0 0018 0z\" /></svg>"
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-4 right-4 z-50 flex flex-col gap-2 w-80" }, _attrs))} data-v-e836045f><div${ssrRenderAttrs({
		name: "aviso",
		class: "flex flex-col gap-2"
	})} data-v-e836045f>`);
	ssrRenderList($setup.listaAvisos, (aviso) => {
		_push(`<div class="${ssrRenderClass([$setup.alertClass?.[aviso.type], "alert"])}" data-v-e836045f>`);
		if (aviso.type && $setup.alertIcon[aviso.type]) _push(`<span class="mr-2 flex shrink-0" data-v-e836045f>${$setup.alertIcon[aviso.type] ?? ""}</span>`);
		else _push(`<!---->`);
		_push(`<span class="text-sm" data-v-e836045f>${ssrInterpolate(aviso.message)}</span></div>`);
	});
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/alertContainer.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var alertContainer_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e836045f"]]);
//#endregion
export { storeUbicacion as i, showAviso as n, MobileDock_default as r, alertContainer_default as t };
