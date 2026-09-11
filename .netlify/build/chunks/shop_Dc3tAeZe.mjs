import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { n as showAviso } from "./alertContainer_C-aVFGS1.mjs";
import { n as loadDataUserFromAPI, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { t as $$BaseLayout } from "./BaseLayout_DzjekU4l.mjs";
import { t as HeaderPage_default } from "./HeaderPage_CDlO84Oc.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/ShopPage.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "ShopPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const items = ref([]);
		const loading = ref(false);
		const ownedCouponIds = computed(() => new Set((dataUser.user?.cuponsBuy ?? []).map((coupon) => String(coupon.id))));
		function isCouponOwned(couponId) {
			return ownedCouponIds.value.has(String(couponId));
		}
		async function loadItems() {
			loading.value = true;
			try {
				const res = await fetch("/api/shop");
				if (!res.ok) throw new Error("Error al cargar items");
				const data = await res.json();
				items.value = data.items || [];
			} catch (err) {
				console.error(err);
				showAviso("No se pudieron cargar los artículos de la tienda", "error");
			} finally {
				loading.value = false;
			}
		}
		async function redeem(itemId, price) {
			if (isCouponOwned(itemId)) {
				showAviso("Ya compraste este cupón. Lo encontrarás en tu perfil.", "error");
				return;
			}
			try {
				const res = await fetch("/api/shop", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						action: "redeem",
						shop_id: itemId
					})
				});
				const data = await res.json();
				if (!res.ok) {
					showAviso(data.error || "No se pudo canjear", "error");
					return;
				}
				await loadDataUserFromAPI();
				showAviso("Canje exitoso: " + (data.coupon?.code ?? ""), "success");
				await loadItems();
			} catch (err) {
				console.error(err);
				showAviso("Error al canjear el artículo", "error");
			}
		}
		onMounted(async () => {
			await loadDataUserFromAPI();
			await loadItems();
		});
		const __returned__ = {
			items,
			loading,
			ownedCouponIds,
			isCouponOwned,
			loadItems,
			redeem,
			get dataUser() {
				return dataUser;
			},
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto" }, _attrs))}>`);
	_push(ssrRenderComponent($setup["HeaderPage"], {
		title: "Shop",
		subtitle: "Gasta tus puntos y desbloquea recompensas"
	}, null, _parent));
	_push(`<div class="w-full flex flex-col justify-center items-center gap-8 bg-base-100 my-12"><a href="#" class="hover-3d cursor-pointer"><div class="card md:w-200 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]"><div class="card-body"><div class="flex justify-between mb-10"><div class="font-bold">RateApp Wallet</div><div class="text-5xl opacity-10">❁</div></div><div class="text-lg mb-4 opacity-40">0210 8820 1150 0222</div><div class="flex justify-between"><div><div class="text-xs opacity-20">CARD USER</div><div>${ssrInterpolate($setup.dataUser.user?.name || "USER")}</div></div><div><div class="text-xs opacity-20">PUNTOS</div><div>${ssrInterpolate($setup.dataUser.user?.totalPoints || 0)}</div></div></div></div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></a></div>`);
	if ($setup.loading) _push(`<div class="flex justify-center items-center py-12"><span class="loading loading-spinner loading-lg text-primary"></span></div>`);
	else {
		_push(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 border-t-base-200 rounded-2xl bg-base-300"><!--[-->`);
		ssrRenderList($setup.items, (it) => {
			_push(`<div class="group card bg-base-200 border border-base-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"><div class="card-body p-5 justify-between gap-4"><div class="flex flex-col items-start gap-4"><div class="w-full h-32 rounded-2xl overflow-hidden border border-base-200 shrink-0 shadow-sm bg-base-200"><img${ssrRenderAttr("src", it.restaurant_image || "https://pub-d80845b9e313461db9d75fa6897f1bf3.r2.dev/cupon_banner.jpeg")} alt="logo" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"></div><div class="space-y-1.5 flex-1 min-w-0">`);
			if (it.category) _push(`<div class="badge badge-sm bg-primary/10 border-none text-primary font-medium tracking-wide text-[10px] uppercase">${ssrInterpolate(it.category)}</div>`);
			else _push(`<!---->`);
			_push(`<h3 class="font-bold text-base leading-snug text-base-content line-clamp-2 group-hover:text-primary transition-colors duration-200"${ssrRenderAttr("title", it.description)}>${ssrInterpolate(it.description)}</h3><p class="text-xs text-base-content/60 flex items-center gap-1 truncate"><span>Por:</span><span class="font-semibold text-base-content hover:underline cursor-pointer">${ssrInterpolate(it.restaurant_name || "---")}</span></p></div></div><div class="mt-2 space-y-3"><div class="border-t border-dashed border-base-300 pt-4 flex justify-between items-baseline"><span class="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">Valor</span><div class="flex items-baseline gap-1"><span class="text-2xl font-black text-primary tracking-tight">${ssrInterpolate(it.price)}</span><span class="text-xs font-bold text-primary/80 uppercase">pts</span></div></div><div class="card-actions flex gap-2">`);
			if (it.restaurant_slug) _push(`<a${ssrRenderAttr("href", `/restaurant/${it.restaurant_slug}`)} class="btn btn-sm btn-outline border-base-300 hover:border-primary hover:bg-primary/5 hover:text-primary flex-1 font-medium capitalize"> Ver local </a>`);
			else _push(`<!---->`);
			_push(`<button${ssrIncludeBooleanAttr($setup.isCouponOwned(it.id)) ? " disabled" : ""} class="${ssrRenderClass(["btn btn-sm flex-1 font-semibold border-none transition-all duration-200 shadow-sm", $setup.isCouponOwned(it.id) ? "bg-base-200 text-base-content/40 cursor-not-allowed shadow-none" : "bg-primary hover:bg-primary-focus text-primary-content shadow-primary/20"])}">${ssrInterpolate($setup.isCouponOwned(it.id) ? "Canjeado" : "Canjear")}</button></div>`);
			if ($setup.isCouponOwned(it.id)) _push(`<div class="flex items-center justify-center gap-1 text-[11px] font-medium text-success bg-success/10 py-1.5 rounded-lg border border-success/20 animate-fade-in"><span>✓ Ya tienes este cupón</span></div>`);
			else _push(`<!---->`);
			_push(`</div></div></div>`);
		});
		_push(`<!--]--></div>`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ShopPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ShopPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/shop.astro
var shop_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Shop,
	file: () => $$file,
	url: () => $$url
});
var $$Shop = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Tienda — rateapp",
		"description": "Canjea cupones con tus puntos"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ShopPage", ShopPage_default, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/ShopPage.vue",
		"client:component-export": "default"
	})}` })}`;
}, "/home/manuel/RateAppProject/rateappAstro/src/pages/shop.astro", void 0);
var $$file = "/home/manuel/RateAppProject/rateappAstro/src/pages/shop.astro";
var $$url = "/shop";
//#endregion
//#region \0virtual:astro:page:src/pages/shop@_@astro
var page = () => shop_exports;
//#endregion
export { page };
