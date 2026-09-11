import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, reactive, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-4 right-4 z-50 flex flex-col gap-2 w-80" }, _attrs))} data-v-fed49d7a><div${ssrRenderAttrs({
		name: "aviso",
		class: "flex flex-col gap-2"
	})} data-v-fed49d7a>`);
	ssrRenderList($setup.listaAvisos, (aviso) => {
		_push(`<div class="${ssrRenderClass([$setup.alertClass?.[aviso.type], "alert"])}" data-v-fed49d7a>`);
		if (aviso.type && $setup.alertIcon[aviso.type]) _push(`<span class="mr-2 flex shrink-0" data-v-fed49d7a>${$setup.alertIcon[aviso.type] ?? ""}</span>`);
		else _push(`<!---->`);
		_push(`<span class="text-sm" data-v-fed49d7a>${ssrInterpolate(aviso.message)}</span></div>`);
	});
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/alertContainer.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var alertContainer_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fed49d7a"]]);
//#endregion
export { showAviso as n, storeUbicacion as r, alertContainer_default as t };
