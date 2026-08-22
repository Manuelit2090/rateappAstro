import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { n as loadDataUserFromAPI, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { t as RestaurantSearchBar_default } from "./RestaurantSearchBar_CJK5ijZ-.mjs";
import { computed, createVNode, defineComponent, mergeProps, onMounted, ref, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import { Clock, Sparkles, Target, Trophy, Users } from "lucide-vue-next";
//#region src/components/QuestCard.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "QuestCard",
	props: { q: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const difficultyColor = {
			Easy: "text-primary border-primary/40 bg-primary/10",
			Medium: "text-secondary border-secondary/40 bg-secondary/10",
			Hard: "text-warning border-warning/40 bg-warning/10",
			Epic: "text-accent border-accent/40 bg-accent/10"
		};
		const pct = computed(() => Math.round(props.q.current / props.q.total * 100));
		const __returned__ = {
			props,
			difficultyColor,
			pct,
			done: computed(() => pct.value >= 100),
			get Clock() {
				return Clock;
			},
			get Users() {
				return Users;
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
	_push(`<article${ssrRenderAttrs(mergeProps({ class: "group relative rounded-3xl border border-base-300/60 bg-base-100/60 p-6 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300" }, _attrs))}>`);
	if ($props.q.tag) _push(`<span class="absolute -top-2 right-6 px-2.5 py-1 rounded-full bg-primary text-primary-content text-[10px] font-bold uppercase tracking-wider shadow-[0_0_24px_-4px_var(--p)]">${ssrInterpolate($props.q.tag)}</span>`);
	else _push(`<!---->`);
	_push(`<div class="flex items-start gap-4 mb-4"><div class="grid place-items-center h-12 w-12 rounded-2xl bg-secondary/15 text-secondary shrink-0 group-hover:bg-primary/15 group-hover:text-primary transition-colors">`);
	ssrRenderVNode(_push, createVNode(resolveDynamicComponent($props.q.icon), { class: "h-5 w-5" }, null), _parent);
	_push(`</div><div class="min-w-0 flex-1"><div class="flex items-center gap-2 mb-1"><span class="text-[10px] uppercase tracking-[0.2em] text-secondary">${ssrInterpolate($props.q.category)}</span><span class="${ssrRenderClass(["text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md border", $setup.difficultyColor[$props.q.difficulty]])}">${ssrInterpolate($props.q.difficulty)}</span></div><h3 class="font-display text-lg font-semibold leading-tight">${ssrInterpolate($props.q.title)}</h3></div><div class="text-right shrink-0"><div class="font-display text-xl font-bold text-primary leading-none">+${ssrInterpolate($props.q.reward)}</div><div class="text-[10px] uppercase tracking-wider text-info mt-1">points</div></div></div><p class="text-sm text-accent-content mb-5 leading-relaxed">${ssrInterpolate($props.q.description)}</p><div class="space-y-2 mb-5"><div class="flex items-center justify-between text-xs text-primary-content/80"><span>${ssrInterpolate($props.q.current)} / ${ssrInterpolate($props.q.total)}</span><span class="${ssrRenderClass($setup.done ? "text-primary font-semibold" : "")}">${ssrInterpolate($setup.pct)}%`);
	if ($setup.done) _push(`<!--[--> · Complete<!--]-->`);
	else _push(`<!---->`);
	_push(`</span></div><div class="h-1.5 rounded-full bg-accent-content overflow-hidden"><div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style="${ssrRenderStyle({ width: `${Math.min($setup.pct, 100)}%` })}"></div></div></div><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-3 text-[11px] text-secondary-content"><span class="inline-flex items-center gap-1.5">`);
	_push(ssrRenderComponent($setup["Clock"], { class: "h-3.5 w-3.5" }, null, _parent));
	_push(` ${ssrInterpolate($props.q.expiresIn)}</span><span class="inline-flex items-center gap-1.5">`);
	_push(ssrRenderComponent($setup["Users"], { class: "h-3.5 w-3.5" }, null, _parent));
	_push(` ${ssrInterpolate($props.q.participants.toLocaleString())}</span></div><button class="${ssrRenderClass(["text-xs font-semibold px-3.5 h-9 rounded-full transition-colors", $setup.done ? "bg-base-200 text-neutral cursor-default" : "bg-primary text-primary-content hover:shadow-[0_0_24px_-4px_var(--p)]"])}"${ssrIncludeBooleanAttr($setup.done) ? " disabled" : ""}>${ssrInterpolate($setup.done ? "Claimed" : "Start quest")}</button></div></article>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/QuestCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var QuestCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/QuestsPage.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "QuestsPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const filters = [
			"All",
			"Daily",
			"Weekly",
			"Seasonal",
			"Legendary"
		];
		const activeFilter = ref("All");
		const quests = ref([]);
		const isLoading = ref(true);
		const errorMessage = ref("");
		const visible = computed(() => activeFilter.value === "All" ? quests.value : quests.value.filter((q) => q.category === activeFilter.value));
		const totalPoints = computed(() => quests.value.reduce((sum, q) => sum + q.reward, 0));
		const earned = computed(() => quests.value.filter((q) => q.current >= q.total).reduce((sum, q) => sum + q.reward, 0));
		const available = computed(() => totalPoints.value - earned.value);
		const inProgress = computed(() => quests.value.filter((q) => q.current > 0 && q.current < q.total).length);
		const loadQuests = async () => {
			isLoading.value = true;
			errorMessage.value = "";
			try {
				const response = await fetch("/api/quest");
				const data = await response.json();
				if (!response.ok || !data.success) throw new Error(data.error || "Unable to load quests");
				quests.value = Array.isArray(data.quests) ? data.quests.map((item) => ({
					id: item.id,
					slug: item.slug ?? String(item.id ?? ""),
					title: item.title ?? item.slug ?? "Quest",
					description: item.description ?? "Complete this quest to earn points.",
					category: item.category ?? "Daily",
					difficulty: item.difficulty ?? "Medium",
					reward: Number(item.reward ?? item.rewartPoints ?? 0),
					current: Number(item.current ?? 0),
					total: Number(item.total ?? 1),
					expiresIn: item.expiresIn ?? item.expires_in ?? "No deadline",
					participants: Number(item.participants ?? 0),
					tag: item.tag ?? "",
					icon: item.icon ?? Target
				})) : [];
			} catch (error) {
				console.error("Error al cargar las quests:", error);
				quests.value = [];
				errorMessage.value = "No se pudieron cargar las quests en este momento.";
			} finally {
				isLoading.value = false;
			}
		};
		onMounted(async () => {
			loadQuests();
			await loadDataUserFromAPI();
		});
		const __returned__ = {
			filters,
			activeFilter,
			quests,
			isLoading,
			errorMessage,
			visible,
			totalPoints,
			earned,
			available,
			inProgress,
			loadQuests,
			get Trophy() {
				return Trophy;
			},
			get Target() {
				return Target;
			},
			get Sparkles() {
				return Sparkles;
			},
			QuestCard: QuestCard_default,
			SearchBar: RestaurantSearchBar_default,
			get dataUser() {
				return dataUser;
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
	_push(`<main${ssrRenderAttrs(mergeProps({ class: "flex-1 min-w-0" }, _attrs))}><header class="sticky top-0 z-20 flex items-center gap-4 px-6 md:px-10 h-20 border-b border-border/60 bg-background/70 backdrop-blur-xl"><div class="flex items-center gap-3"><div class="grid place-items-center h-10 w-10 rounded-xl bg-lime/15 text-primary">`);
	_push(ssrRenderComponent($setup["Trophy"], { class: "h-5 w-5" }, null, _parent));
	_push(`</div><div><h1 class="font-primary text-lg font-bold leading-none">Quests</h1><p class="text-xs text-primary-content mt-1">Earn points. Become a tastemaker.</p></div></div>`);
	_push(ssrRenderComponent($setup["SearchBar"], null, null, _parent));
	_push(`</header><div class="px-6 md:px-10 py-8 space-y-8 max-w-[1400px] mx-auto"><section class="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-base-100 via-neutral/60 to-primary/80 p-8 md:p-10"><div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-lime/20 blur-3xl pointer-events-none"></div><div class="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-peach/15 blur-3xl pointer-events-none"></div><div class="relative grid md:grid-cols-[1fr_auto] gap-8 items-end"><div><span class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-lime mb-3">`);
	_push(ssrRenderComponent($setup["Sparkles"], { class: "h-3.5 w-3.5" }, null, _parent));
	_push(` Misiones </span><h2 class="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-3"> Aventuras para humanos hambrientos </h2><p class="text-neutral-content max-w-xl">`);
	if ($setup.isLoading) _push(`<!--[-->Loading quests from the server...<!--]-->`);
	else if ($setup.errorMessage) _push(`<!--[-->${ssrInterpolate($setup.errorMessage)}<!--]-->`);
	else _push(`<!--[--> Completa ${ssrInterpolate($setup.quests.length)} misiones y obtenen puntos e insignias para disfrutar al maximo tu experiencia en restaurantes. <!--]-->`);
	_push(`</p></div><div class="flex items-center gap-4 flex-wrap"><div class="rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm p-4 w-full"><div class="font-display text-2xl font-bold text-peach">${ssrInterpolate($setup.dataUser.user?.totalPoints ?? 0)}</div><div class="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Available</div></div></div></div></section><div class="flex items-center justify-between gap-4 flex-wrap"><div class="flex items-center gap-2 flex-wrap"><!--[-->`);
	ssrRenderList($setup.filters, (f) => {
		_push(`<button class="${ssrRenderClass(["px-4 h-9 rounded-full text-sm font-medium transition border", $setup.activeFilter === f ? "bg-foreground text-background border-foreground" : "border-border/60 text-muted-foreground hover:text-foreground hover:border-lime/40"])}">${ssrInterpolate(f)}</button>`);
	});
	_push(`<!--]--></div></div>`);
	if ($setup.isLoading) {
		_push(`<div class="text-center py-20 text-muted-foreground">`);
		_push(ssrRenderComponent($setup["Target"], { class: "h-10 w-10 mx-auto mb-3 opacity-50" }, null, _parent));
		_push(` Loading quests... </div>`);
	} else if ($setup.errorMessage) {
		_push(`<div class="text-center py-20 text-muted-foreground">`);
		_push(ssrRenderComponent($setup["Target"], { class: "h-10 w-10 mx-auto mb-3 opacity-50" }, null, _parent));
		_push(` ${ssrInterpolate($setup.errorMessage)}</div>`);
	} else if ($setup.visible.length === 0) {
		_push(`<div class="text-center py-20 text-muted-foreground">`);
		_push(ssrRenderComponent($setup["Target"], { class: "h-10 w-10 mx-auto mb-3 opacity-50" }, null, _parent));
		_push(` No quests in this category. </div>`);
	} else {
		_push(`<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5"><!--[-->`);
		ssrRenderList($setup.visible, (q) => {
			_push(ssrRenderComponent($setup["QuestCard"], {
				key: q.slug,
				q
			}, null, _parent));
		});
		_push(`<!--]--></div>`);
	}
	_push(`<footer class="py-10 text-center text-xs text-muted-foreground"> � 2026 rateapp � Crafted for hungry humans </footer></div></main>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/QuestsPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var QuestsPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/quests.astro
var quests_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Quests,
	file: () => $$file,
	url: () => $$url
});
var $$Quests = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Quests — rateapp",
		"description": "Complete quests, earn points, and level up your taste."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="flex min-h-screen bg-background text-foreground">${renderComponent($$result, "QuestsPage", QuestsPage_default, {
		"client:idle": true,
		"client:component-hydration": "idle",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/QuestsPage.vue",
		"client:component-export": "default"
	})}</div>` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/quests.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/quests.astro";
var $$url = "/quests";
//#endregion
//#region \0virtual:astro:page:src/pages/quests@_@astro
var page = () => quests_exports;
//#endregion
export { page };
