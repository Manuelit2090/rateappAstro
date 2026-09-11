import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { t as RestaurantSearchBar_default } from "./RestaurantSearchBar_CJK5ijZ-.mjs";
import { computed, createVNode, defineComponent, mergeProps, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode } from "vue/server-renderer";
import { CircleUserRound, Compass, Cookie, Goal, Heart } from "lucide-vue-next";
//#region src/components/UI/HeaderPage.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "HeaderPage",
	props: {
		title: {
			type: String,
			default: "RateApp"
		},
		subtitle: {
			type: String,
			default: "Encuentra tu proximo restaurante favorito"
		}
	},
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const __returned__ = {
			props,
			iconComponent: computed(() => {
				const t = props.title.toLowerCase();
				if (t.includes("discover") || t.includes("descubrir")) return Compass;
				if (t.includes("quest") || t.includes("misiones")) return Goal;
				if (t.includes("favorites") || t.includes("favoritos")) return Heart;
				if (t.includes("profile") || t.includes("perfil")) return CircleUserRound;
				return Cookie;
			}),
			SearchBar: RestaurantSearchBar_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-20 flex items-center gap-4 px-6 md:px-10 h-20 border-b border-base-300/60 bg-base-100/70 backdrop-blur-xl" }, _attrs))}><div class="flex items-center gap-3"><div class="grid place-items-center h-10 w-10 rounded-xl bg-secondary/15 text-secondary">`);
	ssrRenderVNode(_push, createVNode(resolveDynamicComponent($setup.iconComponent), { class: "h-5 w-5" }, null), _parent);
	_push(`</div><div><h1 class="font-display text-lg font-bold leading-none">${ssrInterpolate($setup.props.title)}</h1><p class="text-xs text-neutral-content mt-1">${ssrInterpolate($setup.props.subtitle)}</p></div></div><div class="ml-auto relative w-full max-w-md hidden md:block">`);
	_push(ssrRenderComponent($setup["SearchBar"], null, null, _parent));
	_push(`</div></header>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/HeaderPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HeaderPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { HeaderPage_default as t };
