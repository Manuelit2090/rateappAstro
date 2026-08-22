import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { n as loadDataUserFromAPI } from "./dataUser_lBwnqZNM.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { r as RestaurantCard_default, t as favoriteService } from "./api_CqB2El2a.mjs";
import { t as HeaderPage_default } from "./HeaderPage_CDlO84Oc.mjs";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/FavoriteRestaurants.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "FavoriteRestaurants",
	setup(__props, { expose: __expose }) {
		__expose();
		const favorites = ref([]);
		const loading = ref(true);
		const error = ref("");
		async function loadFavoriteRestaurants() {
			loading.value = true;
			error.value = "";
			try {
				const response = await favoriteService.getAll();
				favorites.value = response.favorites ?? [];
			} catch (err) {
				console.error("Error cargando favoritos:", err);
				error.value = "No se pudieron cargar tus restaurantes favoritos.";
			} finally {
				loading.value = false;
			}
		}
		onMounted(async () => {
			await loadDataUserFromAPI();
			await loadFavoriteRestaurants();
		});
		const __returned__ = {
			favorites,
			loading,
			error,
			loadFavoriteRestaurants,
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}>`);
	_push(ssrRenderComponent($setup["HeaderPage"], {
		title: "Favoritos",
		subtitle: "Encuentra tus Restaurantes Favoritos"
	}, null, _parent));
	_push(`<div class="my-4 mx-4">`);
	if ($setup.loading) _push(`<div class="text-center py-20"><div class="inline-block"><div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div></div><p class="mt-4 text-neutral">Cargando tus favoritos...</p></div>`);
	else if ($setup.error) _push(`<div class="py-12 text-center text-error"><p>${ssrInterpolate($setup.error)}</p></div>`);
	else if ($setup.favorites.length > 0) {
		_push(`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		ssrRenderList($setup.favorites, (restaurant) => {
			_push(ssrRenderComponent($setup["RestaurantCard"], {
				key: restaurant.slug,
				r: restaurant
			}, null, _parent));
		});
		_push(`<!--]--></div>`);
	} else _push(`<div class="py-12 text-center"><p>No tienes restaurantes favoritos aún. ¡Comienza a agregar algunos!</p></div>`);
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/FavoriteRestaurants.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var FavoriteRestaurants_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/favorites.astro
var favorites_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Favorites,
	file: () => $$file,
	url: () => $$url
});
var $$Favorites = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Mis Favoritos — rateapp",
		"description": "Ver y gestionar tus restaurantes favoritos"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "FavoriteRestaurants", FavoriteRestaurants_default, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/FavoriteRestaurants.vue",
		"client:component-export": "default"
	})}` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/favorites.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/favorites.astro";
var $$url = "/favorites";
//#endregion
//#region \0virtual:astro:page:src/pages/favorites@_@astro
var page = () => favorites_exports;
//#endregion
export { page };
