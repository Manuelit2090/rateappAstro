import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BkWFJBNh.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
//#region src/components/RestaurantAnalytics.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "RestaurantAnalytics",
	setup(__props, { expose: __expose }) {
		__expose();
		/**
		* @file RestaurantAnalytics.vue
		* @description Muestra métricas y el historial de reseñas del restaurante autenticado.
		* @dependencies Vue 3
		*/
		const reviews = ref([]);
		const loading = ref(true);
		const error = ref("");
		/**
		* Convierte una fecha de API a una fecha legible para el panel.
		* @param value - Fecha serializada recibida desde la API.
		* @returns Fecha localizada o un guion si no es válida.
		*/
		const formatDate = (value) => {
			const date = new Date(value);
			return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("es-ES");
		};
		/**
		* Carga las reseñas del restaurante asociado a la cookie de sesión.
		* @returns Promise resuelta cuando termina la carga.
		*/
		const loadReviews = async () => {
			loading.value = true;
			error.value = "";
			try {
				const response = await fetch("/api/admin/reviews");
				const data = await response.json();
				if (!response.ok) throw new Error(data.error || "No se pudieron cargar las reseñas");
				reviews.value = Array.isArray(data.reviews) ? data.reviews : [];
			} catch (loadError) {
				console.error("Error cargando Analytics:", loadError);
				error.value = loadError instanceof Error ? loadError.message : "No se pudieron cargar las reseñas";
			} finally {
				loading.value = false;
			}
		};
		const averageRating = computed(() => {
			if (!reviews.value.length) return "0.0";
			return (reviews.value.reduce((sum, review) => sum + review.rating, 0) / reviews.value.length).toFixed(1);
		});
		const distribution = computed(() => [
			5,
			4,
			3,
			2,
			1
		].map((rating) => {
			const count = reviews.value.filter((review) => review.rating === rating).length;
			return {
				rating,
				count,
				percentage: reviews.value.length ? Math.round(count / reviews.value.length * 100) : 0
			};
		}));
		const trend = computed(() => {
			const now = /* @__PURE__ */ new Date();
			const currentMonth = reviews.value.filter((review) => {
				const date = new Date(review.date);
				return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
			}).length;
			const previous = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			const previousMonth = reviews.value.filter((review) => {
				const date = new Date(review.date);
				return date.getFullYear() === previous.getFullYear() && date.getMonth() === previous.getMonth();
			}).length;
			return {
				currentMonth,
				previousMonth,
				difference: currentMonth - previousMonth
			};
		});
		onMounted(() => void loadReviews());
		const __returned__ = {
			reviews,
			loading,
			error,
			formatDate,
			loadReviews,
			averageRating,
			distribution,
			trend
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
	if ($setup.loading) _push(`<div class="rounded-lg border p-6 text-center text-base-content/70">Cargando reseñas...</div>`);
	else if ($setup.error) _push(`<div class="rounded-lg border border-error/30 bg-error/10 p-6 text-error">${ssrInterpolate($setup.error)}</div>`);
	else {
		_push(`<!--[--><div class="grid grid-cols-1 gap-4 md:grid-cols-3"><div class="rounded-lg border p-4 bg-base-100/50"><p class="text-sm text-base-content/70">Promedio general</p><p class="mt-2 text-3xl font-bold text-primary">${ssrInterpolate($setup.averageRating)} <span class="text-xl">/ 5</span></p></div><div class="rounded-lg border p-4 bg-base-100/50"><p class="text-sm text-base-content/70">Total de reseñas</p><p class="mt-2 text-3xl font-bold">${ssrInterpolate($setup.reviews.length)}</p></div><div class="rounded-lg border p-4 bg-base-100/50"><p class="text-sm text-base-content/70">Tendencia mensual</p><p class="${ssrRenderClass([$setup.trend.difference >= 0 ? "text-success" : "text-error", "mt-2 text-3xl font-bold"])}">${ssrInterpolate($setup.trend.difference >= 0 ? "+" : "")}${ssrInterpolate($setup.trend.difference)}</p><p class="text-xs text-base-content/60">${ssrInterpolate($setup.trend.currentMonth)} este mes · ${ssrInterpolate($setup.trend.previousMonth)} anterior</p></div></div><div class="grid grid-cols-1 gap-4 lg:grid-cols-2"><div class="rounded-lg border p-4 bg-base-100/50"><h2 class="font-semibold">Distribución de calificaciones</h2><div class="mt-4 space-y-3"><!--[-->`);
		ssrRenderList($setup.distribution, (item) => {
			_push(`<div class="flex items-center gap-3 text-sm"><span class="w-12">${ssrInterpolate(item.rating)} estrellas</span><progress class="progress progress-primary h-2 flex-1"${ssrRenderAttr("value", item.percentage)} max="100"></progress><span class="w-10 text-right text-base-content/70">${ssrInterpolate(item.percentage)}%</span></div>`);
		});
		_push(`<!--]--></div></div><div class="rounded-lg border p-4 bg-base-100/50"><h2 class="font-semibold">Resumen de tendencia</h2><p class="mt-4 text-sm text-base-content/70">Comparativa de reseñas registradas entre el mes actual y el anterior.</p></div></div><div class="rounded-lg border bg-base-100/50 p-4"><h2 class="font-semibold">Historial de reseñas</h2>`);
		if (!$setup.reviews.length) _push(`<p class="py-8 text-center text-base-content/70">No hay reseñas registradas aún</p>`);
		else {
			_push(`<div class="mt-4 overflow-x-auto"><table class="table w-full"><thead><tr><th>Usuario</th><th>Valoración</th><th>Comentario</th><th>Fecha</th><th>Respuesta</th></tr></thead><tbody><!--[-->`);
			ssrRenderList($setup.reviews, (review) => {
				_push(`<tr><td>${ssrInterpolate(review.userName)}</td><td class="text-primary">${ssrInterpolate(review.rating)} / 5</td><td class="min-w-56 whitespace-normal">${ssrInterpolate(review.comment || "Sin comentario")}</td><td>${ssrInterpolate($setup.formatDate(review.date))}</td><td class="min-w-48 whitespace-normal text-base-content/70">${ssrInterpolate(review.restaurantResponse || "Sin respuesta")}</td></tr>`);
			});
			_push(`<!--]--></tbody></table></div>`);
		}
		_push(`</div><!--]-->`);
	}
	_push(`</section>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RestaurantAnalytics.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RestaurantAnalytics_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/admin/analytics.astro
var analytics_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Analytics,
	file: () => $$file,
	url: () => $$url
});
var $$Analytics = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminBaseLayout", $$AdminBaseLayout, { "title": "Estadísticas — Admin" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1 min-h-screen p-6 md:p-10"><div class="max-w-7xl mx-auto"><h1 class="text-2xl font-semibold mb-4">Estadísticas</h1>${renderComponent($$result, "RestaurantAnalytics", RestaurantAnalytics_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RestaurantAnalytics.vue",
		"client:component-export": "default"
	})}</div></main>` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/admin/analytics.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/admin/analytics.astro";
var $$url = "/admin/analytics";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/analytics@_@astro
var page = () => analytics_exports;
//#endregion
export { page };
