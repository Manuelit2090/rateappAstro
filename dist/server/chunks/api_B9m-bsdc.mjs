import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { n as showAviso } from "./alertContainer_Dpjkxg2m.mjs";
import { i as setDataUser, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { computed, defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Heart, MapPin, Star } from "lucide-vue-next";
//#region src/components/RestaurantCard.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "RestaurantCard",
	props: { r: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const liked = computed(() => {
			return dataUser.user?.favoriteRestaurant?.includes(props.r.slug) ?? false;
		});
		async function toggleLike() {
			if (!dataUser.user) return;
			try {
				const response = await fetch("/api/auth/favorite", {
					method: "POST",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ slug: props.r.slug })
				});
				if (response.ok) showAviso("Restaurante agregado a favoritos", "success");
				if (!response.ok) {
					await response.json().catch(() => null);
					showAviso("Error al guardar favoritos", "error");
					return;
				}
				const data = await response.json();
				setDataUser({
					...dataUser.user,
					favoriteRestaurant: data.favorites || []
				});
			} catch (error) {
				console.error("Error al actualizar favorito:", error);
			}
		}
		const __returned__ = {
			props,
			liked,
			toggleLike,
			get Star() {
				return Star;
			},
			get MapPin() {
				return MapPin;
			},
			get Heart() {
				return Heart;
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
	_push(`<a${ssrRenderAttrs(mergeProps({
		href: `/restaurant/${$props.r.slug}`,
		class: "group block rounded-3xl overflow-hidden border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300"
	}, _attrs))}><article><div class="relative aspect-[16/10] overflow-hidden"><img${ssrRenderAttr("src", typeof $props.r.image === "object" ? $props.r.image.src : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSNfFd3Ldcdi2eQVHpLNWGrUtQY22FPA2sjnTNTD2llw&s=10")}${ssrRenderAttr("alt", $props.r.name)} loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"><div class="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/10 to-transparent"></div>`);
	if ($props.r.promoted) _push(`<span class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-content text-[10px] font-bold uppercase tracking-wider shadow-[0_0_24px_-4px_var(--p)]"><span class="h-1.5 w-1.5 rounded-full bg-lime-foreground animate-pulse"></span> Promoted </span>`);
	else _push(`<!---->`);
	_push(`<div class="absolute top-4 right-4 flex gap-2"><button type="button" class="${ssrRenderClass(["grid place-items-center h-9 w-9 rounded-full backdrop-blur-md border transition-colors", $setup.liked ? "bg-secondary text-secondary-content border-secondary" : "bg-base-100/60 border-base-300/60 hover:bg-secondary hover:text-secondary-content"])}"${ssrRenderAttr("aria-label", $setup.liked ? "Unlike" : "Like")}>`);
	_push(ssrRenderComponent($setup["Heart"], { class: ["h-4 w-4", $setup.liked ? "fill-current" : ""] }, null, _parent));
	_push(`</button></div><div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3"><div><p class="text-[11px] uppercase tracking-[0.2em] text-secondary mb-1">${ssrInterpolate($props.r.cuisine)}</p><h3 class="font-display text-2xl font-bold leading-tight">${ssrInterpolate($props.r.name)}</h3></div><div class="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary text-primary-content">`);
	_push(ssrRenderComponent($setup["Star"], { class: "h-3.5 w-3.5 fill-current" }, null, _parent));
	_push(`<span class="text-sm font-bold">${ssrInterpolate($props.r.rating)}</span></div></div></div><div class="p-5 flex items-center justify-between gap-4"><div class="flex items-center gap-4 text-xs text-accent-content/85"><span class="inline-flex items-center gap-1.5">`);
	_push(ssrRenderComponent($setup["MapPin"], { class: "h-3.5 w-3.5" }, null, _parent));
	_push(` ${ssrInterpolate($props.r.distance)}</span><span>${ssrInterpolate($props.r.priceRange)}</span><span>${ssrInterpolate($props.r.reviews.length)} reviews</span></div><div class="flex gap-1.5"><!--[-->`);
	ssrRenderList($props.r.tags, (tag) => {
		_push(`<span class="text-[10px] text-accent-content/75 uppercase tracking-wider px-2 py-1 rounded-full border border-base-300/60">${ssrInterpolate(tag)}</span>`);
	});
	_push(`<!--]--></div></div></article></a>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RestaurantCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RestaurantCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/lib/api.ts
/**
* @file api.ts
* @description Cliente HTTP centralizado y servicios reutilizables para consumir endpoints de la API.
* @dependencies fetch (nativo)
*/
/**
* Cliente HTTP centralizado para realizar solicitudes a la API.
* Maneja errores automáticamente y serializa/deserializa JSON.
*/
var APIClient = class {
	constructor() {
		if (typeof window !== "undefined") {
			const { hostname, protocol, port } = window.location;
			if (hostname === "localhost" || hostname === "127.0.0.1") this.baseURL = "http://localhost:4321";
			else {
				const currentPort = port ? `:${port}` : "";
				this.baseURL = `${protocol}//${hostname}${currentPort}`;
			}
		} else this.baseURL = "http://localhost:4321";
	}
	/**
	* Realiza solicitud GET a un endpoint.
	* @param endpoint - Ruta relativa del endpoint (ej: /api/users)
	* @returns Promise que resuelve con los datos JSON
	*/
	async get(endpoint) {
		const response = await fetch(this.baseURL + endpoint, { credentials: "include" });
		if (!response.ok) throw new Error(`API Error: ${response.status}`);
		return response.json();
	}
	/**
	* Realiza solicitud POST a un endpoint.
	* @param endpoint - Ruta relativa del endpoint
	* @param data - Objeto a enviar en el body
	* @returns Promise que resuelve con los datos JSON de respuesta
	*/
	async post(endpoint, data) {
		const response = await fetch(this.baseURL + endpoint, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || `API Error: ${response.status}`);
		}
		return response.json();
	}
	async patch(endpoint, data) {
		const response = await fetch(this.baseURL + endpoint, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		if (!response.ok) throw new Error(`API Error: ${response.status}`);
		return response.json();
	}
	async delete(endpoint) {
		const response = await fetch(this.baseURL + endpoint, {
			method: "DELETE",
			credentials: "include"
		});
		if (!response.ok) throw new Error(`API Error: ${response.status}`);
		return response.json();
	}
};
var api = new APIClient();
var restaurantService = {
	getNearby: (lat, lon, radius = 10) => api.get(`/api/restaurants/nearby?lat=${lat}&lon=${lon}&radius=${radius}`),
	search: (q, category, page) => {
		let url = `/api/restaurants/search?q=${q}`;
		if (category) url += `&category=${category}`;
		if (page) url += `&page=${page}`;
		return api.get(url);
	},
	getBySlug: (slug) => api.get(`/api/restaurants/${slug}`)
};
var favoriteService = {
	toggle: (businessId) => api.post("/api/favorites", { business_id: businessId }),
	getAll: () => api.get("/api/favorites")
};
//#endregion
export { restaurantService as n, RestaurantCard_default as r, favoriteService as t };
