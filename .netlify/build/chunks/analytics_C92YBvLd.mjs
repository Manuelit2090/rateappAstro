import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { E as maybeRenderHead, T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BI8Pzpgw.mjs";
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
	if ($setup.loading) _push(`<div class="card bg-base-100 border border-base-200 shadow-xl p-12 text-center"><div class="flex flex-col items-center justify-center gap-3"><span class="loading loading-spinner loading-lg text-warning"></span><p class="text-sm font-semibold opacity-70">Cargando métricas y reseñas...</p></div></div>`);
	else if ($setup.error) _push(`<div class="alert alert-error shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate($setup.error)}</span></div>`);
	else {
		_push(`<!--[--><div class="stats stats-vertical md:stats-horizontal shadow-xl bg-base-100 border border-base-200 w-full"><div class="stat"><div class="stat-title text-xs font-bold uppercase tracking-wider">Promedio general</div><div class="stat-value text-warning flex items-baseline gap-1"><span>${ssrInterpolate($setup.averageRating)}</span><span class="text-base font-medium text-base-content/50">/ 5</span></div><div class="stat-desc font-semibold text-warning">★ Basado en calificaciones</div></div><div class="stat"><div class="stat-title text-xs font-bold uppercase tracking-wider">Total de reseñas</div><div class="stat-value text-base-content">${ssrInterpolate($setup.reviews.length)}</div><div class="stat-desc">Opiniones registradas</div></div><div class="stat"><div class="stat-title text-xs font-bold uppercase tracking-wider">Tendencia mensual</div><div class="${ssrRenderClass([$setup.trend.difference >= 0 ? "text-success" : "text-error", "stat-value"])}">${ssrInterpolate($setup.trend.difference >= 0 ? "+" : "")}${ssrInterpolate($setup.trend.difference)}</div><div class="stat-desc"><span class="font-bold text-base-content">${ssrInterpolate($setup.trend.currentMonth)}</span> este mes · <span class="opacity-70">${ssrInterpolate($setup.trend.previousMonth)} anterior</span></div></div></div><div class="grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="card bg-base-100 border border-base-200 shadow-xl"><div class="card-body p-6"><h2 class="card-title text-base font-bold">Distribución de calificaciones</h2><div class="mt-4 space-y-3"><!--[-->`);
		ssrRenderList($setup.distribution, (item) => {
			_push(`<div class="flex items-center gap-3 text-sm"><span class="w-20 font-semibold flex items-center gap-1">${ssrInterpolate(item.rating)} <span class="text-warning">★</span></span><progress class="progress progress-warning h-2.5 flex-1"${ssrRenderAttr("value", item.percentage)} max="100"></progress><span class="w-12 text-right font-bold text-base-content/70">${ssrInterpolate(item.percentage)}%</span></div>`);
		});
		_push(`<!--]--></div></div></div><div class="card bg-base-100 border border-base-200 shadow-xl"><div class="card-body p-6 justify-between"><div><h2 class="card-title text-base font-bold">Resumen de tendencia</h2><p class="mt-2 text-sm opacity-70 leading-relaxed"> Comparativa directa entre la cantidad de interacción obtenida en el ciclo actual versus el periodo anterior. </p></div><div class="rounded-2xl bg-base-200/50 p-4 border border-base-200 space-y-2 mt-4"><div class="flex justify-between items-center text-sm"><span class="font-medium opacity-70">Reseñas este mes:</span><span class="font-bold badge badge-neutral">${ssrInterpolate($setup.trend.currentMonth)}</span></div><div class="flex justify-between items-center text-sm"><span class="font-medium opacity-70">Reseñas mes anterior:</span><span class="font-bold badge badge-ghost">${ssrInterpolate($setup.trend.previousMonth)}</span></div></div></div></div></div><div class="card bg-base-100 border border-base-200 shadow-xl"><div class="card-body p-6"><h2 class="card-title text-base font-bold mb-2">Historial de reseñas</h2>`);
		if (!$setup.reviews.length) _push(`<div class="py-12 text-center text-base-content/60"><svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 opacity-30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg><p class="font-semibold">No hay reseñas registradas aún</p></div>`);
		else {
			_push(`<div class="overflow-x-auto"><table class="table table-zebra w-full"><thead><tr class="text-xs uppercase font-extrabold text-base-content/60"><th>Usuario</th><th>Valoración</th><th>Comentario</th><th>Fecha</th><th>Respuesta</th></tr></thead><tbody><!--[-->`);
			ssrRenderList($setup.reviews, (review) => {
				_push(`<tr class="hover"><td class="font-bold">${ssrInterpolate(review.userName)}</td><td><div class="flex items-center gap-1 font-bold text-warning"><span>★</span><span>${ssrInterpolate(review.rating)}</span></div></td><td class="min-w-56 max-w-xs whitespace-normal text-sm leading-snug">${ssrInterpolate(review.comment || "Sin comentario")}</td><td class="text-xs opacity-70 whitespace-nowrap">${ssrInterpolate($setup.formatDate(review.date))}</td><td class="min-w-48 max-w-xs whitespace-normal">`);
				if (review.restaurantResponse) _push(`<span class="text-xs bg-base-200 p-2 rounded-lg block border border-base-300">${ssrInterpolate(review.restaurantResponse)}</span>`);
				else _push(`<span class="badge badge-ghost badge-sm opacity-60">Sin respuesta</span>`);
				_push(`</td></tr>`);
			});
			_push(`<!--]--></tbody></table></div>`);
		}
		_push(`</div></div><!--]-->`);
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
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantAnalytics.vue",
		"client:component-export": "default"
	})}</div></main>` })}`;
}, "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/analytics.astro", void 0);
var $$file = "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/analytics.astro";
var $$url = "/admin/analytics";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/analytics@_@astro
var page = () => analytics_exports;
//#endregion
export { page };
