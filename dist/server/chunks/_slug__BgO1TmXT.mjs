import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { i as storeUbicacion, n as showAviso } from "./alertContainer_Dpjkxg2m.mjs";
import { i as setDataUser, n as loadDataUserFromAPI, t as dataUser } from "./dataUser_lBwnqZNM.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { n as syncBadgesForUser } from "./badgeVerifier_La99V4f4.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { Heart, Share2, Star } from "lucide-vue-next";
//#region src/components/RestaurantDetailClient.vue
var _sfc_main$4 = /*@__PURE__*/ defineComponent({
	__name: "RestaurantDetailClient",
	props: { slug: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const liked = computed(() => {
			return dataUser.user?.favoriteRestaurant?.includes(props.slug) ?? false;
		});
		async function toggleLike() {
			if (!dataUser.user) return;
			try {
				const response = await fetch("/api/auth/favorite", {
					method: "POST",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ slug: props.slug })
				});
				if (response.ok) showAviso("Restaurante agregado a favoritos", "success");
				if (!response.ok) {
					await response.json().catch(() => null);
					showAviso("Error al guardar favoritos", "error");
					return;
				}
				const favorites = (await response.json()).favorites || [];
				setDataUser({
					...dataUser.user,
					favoriteRestaurant: favorites
				});
			} catch (error) {
				console.error("Error al actualizar favorito:", error);
			}
		}
		function share() {
			if (navigator.share) navigator.share({
				title: document.title,
				url: location.href
			});
			else {
				navigator.clipboard.writeText(location.href);
				showAviso("Enlace copiado al portapapeles", "info");
			}
		}
		const __returned__ = {
			props,
			liked,
			toggleLike,
			share,
			get Heart() {
				return Heart;
			},
			get Share2() {
				return Share2;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex gap-2" }, _attrs))}><button class="${ssrRenderClass(["grid place-items-center h-10 w-10 rounded-full backdrop-blur-md border transition", $setup.liked ? "bg-secondary text-secondary-content border-secondary" : "bg-base-100/60 border-base-300/60 hover:bg-secondary hover:text-secondary-content"])}"${ssrRenderAttr("aria-label", $setup.liked ? "Unlike" : "Like")}>`);
	_push(ssrRenderComponent($setup["Heart"], { class: ["h-4 w-4", $setup.liked ? "fill-current" : ""] }, null, _parent));
	_push(`</button><button class="grid place-items-center h-10 w-10 rounded-full bg-base-100/60 backdrop-blur-md border border-base-300/60 hover:border-primary/40 transition" aria-label="Share">`);
	_push(ssrRenderComponent($setup["Share2"], { class: "h-4 w-4" }, null, _parent));
	_push(`</button></div>`);
}
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RestaurantDetailClient.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var RestaurantDetailClient_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
//#endregion
//#region src/lib/calculateDistance.ts
/**
* Calcula la distancia entre dos coordenadas geográficas usando la fórmula de Haversine.
* 
* @param userLat - Latitud del usuario en grados decimales.
* @param userLon - Longitud del usuario en grados decimales.
* @param resLat - Latitud del destino/restaurante en grados decimales.
* @param resLon - Longitud del destino/restaurante en grados decimales.
* @returns Distancia calculada en kilómetros (km).
*/
function calculeDistance(userLat, userLon, resLat, resLon) {
	const R = 6371;
	const userLatRad = userLat * (Math.PI / 180);
	const userLonRad = userLon * (Math.PI / 180);
	const resLatRad = resLat * (Math.PI / 180);
	const resLonRad = resLon * (Math.PI / 180);
	const dLat = resLatRad - userLatRad;
	const dLon = resLonRad - userLonRad;
	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(userLatRad) * Math.cos(resLatRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
//#endregion
//#region src/components/RestaurantDistance.vue
var _sfc_main$3 = /*@__PURE__*/ defineComponent({
	__name: "RestaurantDistance",
	props: {
		resLat: {},
		resLon: {}
	},
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const latUser = ref(null);
		const lonUser = ref(null);
		const distanceTotal = ref(0);
		const loading = ref(true);
		const error = ref(null);
		onMounted(async () => {
			try {
				await storeUbicacion.detectarUbicacion();
				const coordinates = storeUbicacion.getCoordinates();
				if (coordinates) {
					latUser.value = coordinates.lat;
					lonUser.value = coordinates.lng;
					console.log("User coords:", {
						lat: latUser.value,
						lng: lonUser.value
					});
					console.log("Restaurant coords:", {
						lat: props.resLat,
						lng: props.resLon
					});
					distanceTotal.value = calculeDistance(latUser.value, lonUser.value, props.resLat, props.resLon);
					console.log("Distance calculated:", distanceTotal.value);
				}
			} catch (err) {
				error.value = "Error calculating distance";
				console.error(err);
			} finally {
				loading.value = false;
			}
		});
		const __returned__ = {
			props,
			latUser,
			lonUser,
			distanceTotal,
			loading,
			error
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	if ($setup.loading) _push(`<div class="text-sm text-neutral">Calculando distancia...</div>`);
	else if ($setup.error) _push(`<div class="text-sm text-error">${ssrInterpolate($setup.error)}</div>`);
	else _push(`<div class="text-sm text-accent-content/85 l"> Distancia: <span class="font-semibold text-primary">${ssrInterpolate($setup.distanceTotal.toFixed(2))} km</span></div>`);
	_push(`</div>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RestaurantDistance.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var RestaurantDistance_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
//#endregion
//#region src/components/WriteReview.vue
var _sfc_main$2 = /*@__PURE__*/ defineComponent({
	__name: "WriteReview",
	props: { restaurantSlug: {} },
	emits: ["submit"],
	setup(__props, { expose: __expose, emit: __emit }) {
		__expose();
		const props = __props;
		const emit = __emit;
		const rating = ref(0);
		const reviewText = ref("");
		const isSubmitting = ref(false);
		const handleStarClick = (star) => {
			rating.value = rating.value === star ? 0 : star;
		};
		const isValid = () => rating.value > 0 && reviewText.value.trim() !== "";
		onMounted(async () => {
			await loadDataUserFromAPI();
		});
		const handleSubmit = async () => {
			if (!isValid()) return;
			isSubmitting.value = true;
			try {
				const review = {
					reviewSlug: props.restaurantSlug,
					reviewStar: rating.value,
					reviewText: reviewText.value.trim(),
					reviewUser: dataUser.user?.id ?? 0,
					reviewDate: /* @__PURE__ */ new Date(),
					reviewItem: []
				};
				emit("submit", review);
				rating.value = 0;
				reviewText.value = "";
			} finally {
				isSubmitting.value = false;
			}
		};
		const __returned__ = {
			props,
			emit,
			rating,
			reviewText,
			isSubmitting,
			handleStarClick,
			isValid,
			handleSubmit,
			get Star() {
				return Star;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-3xl border border-base-300/60 bg-base-100/60 p-6 md:p-8" }, _attrs))}><h2 class="font-display text-xl font-bold mb-6">Escribe tu reseña</h2><form class="space-y-6"><div class="space-y-3"><label class="block text-sm font-semibold">Calificación</label><div class="flex gap-2"><!--[-->`);
	ssrRenderList(5, (star) => {
		_push(`<button type="button" class="${ssrRenderClass(["transition-all duration-200", star <= $setup.rating ? "text-primary scale-110" : "text-base-300 hover:text-primary/50"])}"${ssrRenderAttr("aria-label", `${star} estrella${star > 1 ? "s" : ""}`)}>`);
		_push(ssrRenderComponent($setup["Star"], { class: ["h-8 w-8", star <= $setup.rating ? "fill-current" : ""] }, null, _parent));
		_push(`</button>`);
	});
	_push(`<!--]--></div>`);
	if ($setup.rating > 0) _push(`<p class="text-xs text-neutral">${ssrInterpolate($setup.rating)} ${ssrInterpolate($setup.rating === 1 ? "estrella" : "estrellas")}</p>`);
	else _push(`<!---->`);
	_push(`</div><div class="space-y-3"><label for="review-text" class="block text-sm font-semibold">Tu reseña</label><textarea id="review-text" placeholder="Comparte tu experiencia en este restaurante..." class="textarea textarea-bordered w-full focus:outline-none focus:border-primary min-h-[120px] resize-none" maxlength="500">${ssrInterpolate($setup.reviewText)}</textarea><p class="text-xs text-primary text-right">${ssrInterpolate($setup.reviewText.length)}/500 caracteres</p></div><p class="text-xs text-primary"> Fecha de reseña: ${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("es-CO", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}))}</p><div class="flex gap-3"><button type="submit"${ssrIncludeBooleanAttr(!$setup.isValid() || $setup.isSubmitting) ? " disabled" : ""} class="${ssrRenderClass([
		"btn btn-primary",
		$setup.isSubmitting && "loading",
		(!$setup.isValid() || $setup.isSubmitting) && "btn-disabled opacity-50"
	])}">${ssrInterpolate($setup.isSubmitting ? "Enviando..." : "Enviar reseña")}</button><button type="button" class="btn btn-ghost"> Limpiar </button></div></form></div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/WriteReview.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var WriteReview_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
//#endregion
//#region src/components/WriteReviewWrapper.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "WriteReviewWrapper",
	props: { slug: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const error = ref("");
		const handleReviewSubmit = async (review) => {
			error.value = "";
			try {
				const res = await fetch("/api/auth/reviews", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						restaurantSlug: props.slug,
						rating: review.reviewStar,
						content: review.reviewText,
						reviewItem: review.reviewItem
					})
				});
				const data = await res.json();
				if (!res.ok) {
					error.value = data.error || "Error al subir reseña";
					return;
				}
				await loadDataUserFromAPI();
				const badgeResult = await syncBadgesForUser(dataUser.user);
				if (badgeResult.newBadges.length) showAviso(`¡Reseña enviada con éxito! Has desbloqueado ${badgeResult.newBadges.length} badge${badgeResult.newBadges.length > 1 ? "s" : ""}.`, "success");
				else showAviso("¡Reseña enviada con éxito!", "success");
			} catch (err) {
				console.error(err);
				showAviso("Error al enviar reseña", "error");
			}
		};
		const __returned__ = {
			props,
			error,
			handleReviewSubmit,
			WriteReview: WriteReview_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<!--[-->`);
	_push(ssrRenderComponent($setup["WriteReview"], {
		"restaurant-slug": $setup.props.slug,
		onSubmit: $setup.handleReviewSubmit
	}, null, _parent));
	if ($setup.error) _push(`<p class="text-error text-sm mt-2">${ssrInterpolate($setup.error)}</p>`);
	else _push(`<!---->`);
	_push(`<!--]-->`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/WriteReviewWrapper.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var WriteReviewWrapper_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/UI/Reviews.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "Reviews",
	props: { restaurantSlug: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const restaurantReviews = ref([]);
		const loading = ref(true);
		const error = ref("");
		const loadReviews = async () => {
			loading.value = true;
			error.value = "";
			try {
				const res = await fetch(`/api/auth/reviews?slug=${encodeURIComponent(props.restaurantSlug)}`);
				const data = await res.json();
				if (!res.ok) {
					error.value = data.error || "No se pudieron cargar las reseñas";
					return;
				}
				restaurantReviews.value = data.reviews.map((rev) => ({
					...rev,
					reviewDate: new Date(rev.reviewDate)
				}));
			} catch (err) {
				console.error("Error al cargar reseñas:", err);
				error.value = "No se pudieron cargar las reseñas";
			} finally {
				loading.value = false;
			}
		};
		onMounted(loadReviews);
		const __returned__ = {
			props,
			restaurantReviews,
			loading,
			error,
			loadReviews
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-8 space-y-4" }, _attrs))}>`);
	if ($setup.loading) _push(`<p class="text-sm text-secundary text-center py-6"> Cargando reseñas... </p>`);
	else if ($setup.error) _push(`<p class="text-sm text-error text-center py-6">${ssrInterpolate($setup.error)}</p>`);
	else {
		_push(`<!--[--><!--[-->`);
		ssrRenderList($setup.restaurantReviews, (rev) => {
			_push(`<article class="rounded-2xl border border-base-300/60 bg-base-100/40 p-5"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="grid place-items-center h-9 w-9 rounded-full bg-primary/20 text-primary font-semibold text-sm">${ssrInterpolate(rev.reviewUser.charAt(0).toUpperCase())}</div><div><div class="text-sm font-semibold">${ssrInterpolate(rev.reviewUser)}</div><div class="text-[11px] text-secondary">${ssrInterpolate(rev.reviewDate.toLocaleDateString("es-CO", {
				year: "numeric",
				month: "long",
				day: "numeric"
			}))}</div></div></div><div class="flex items-center gap-0.5"><!--[-->`);
			ssrRenderList(5, (star) => {
				_push(`<svg class="${ssrRenderClass(["h-3.5 w-3.5", star <= rev.reviewStar ? "fill-primary text-primary" : "fill-none text-neutral"])}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`);
			});
			_push(`<!--]--></div></div><p class="text-sm text-neutral-content mt-3 leading-relaxed">${ssrInterpolate(rev.reviewText)}</p>`);
			if (rev.reviewItem?.length) {
				_push(`<div class="mt-3 flex flex-wrap gap-2"><!--[-->`);
				ssrRenderList(rev.reviewItem, (item) => {
					_push(`<span class="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-xs font-medium">${ssrInterpolate(item.item)} <span class="text-neutral">\$${ssrInterpolate(item.total.toLocaleString("es-CO"))}</span></span>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</article>`);
		});
		_push(`<!--]-->`);
		if (!$setup.restaurantReviews.length) _push(`<p class="text-sm text-neutral text-center py-6"> Aún no hay reseñas para este restaurante. </p>`);
		else _push(`<!---->`);
		_push(`<!--]-->`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/UI/Reviews.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Reviews_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/restaurant/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://astro.build");
async function getStaticPaths() {
	const [rows] = await pool.execute("SELECT slug FROM restaurants");
	return rows.map((row) => ({ params: { slug: row.slug } }));
}
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	async function getRestaurantFromDb(slug) {
		const [rows] = await pool.execute("SELECT * FROM restaurants WHERE slug = ?", [slug]);
		if (!rows.length) return null;
		const restaurant = rows[0];
		return {
			id: restaurant.id ?? 0,
			slug: restaurant.slug,
			name: restaurant.name ?? "",
			cuisine: restaurant.cuisine ?? "",
			category: restaurant.category ?? "",
			description: restaurant.description ?? "",
			image: restaurant.image ?? "",
			rating: restaurant.rating ?? 0,
			reviews: restaurant.reviews ?? 0,
			distance: restaurant.distance ?? "",
			priceRange: restaurant.priceRange ?? "",
			promoted: Boolean(restaurant.promoted),
			tags: Array.isArray(restaurant.tags) ? restaurant.tags : restaurant.tags ? restaurant.tags.split(",").map((tag) => tag.trim()) : [],
			phone: restaurant.phone ?? "",
			email: restaurant.email ?? "",
			address: restaurant.address ?? "",
			lat: restaurant.lat ?? 0,
			lon: restaurant.lon ?? 0
		};
	}
	const r = await getRestaurantFromDb(slug);
	if (!r) return Astro.redirect("/404");
	const imageUrl = typeof r.image === "object" ? r.image.src : r.image;
	const latNum = Number(r.lat);
	const lonNum = Number(r.lon);
	const d = 8e-4;
	const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${`${(lonNum - d).toFixed(6)},${(latNum - d).toFixed(6)},${(lonNum + d).toFixed(6)},${(latNum + d).toFixed(6)}`}&layer=mapnik&marker=${latNum.toFixed(6)},${lonNum.toFixed(6)}`;
	const mapLink = `https://www.openstreetmap.org/?mlat=${latNum}&mlon=${lonNum}#map=18/${latNum}/${lonNum}`;
	return renderTemplate`${renderComponent($$result, "LayoutPage", $$BaseLayout, {
		"title": `${r.name} — rateapp`,
		"description": r.description
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1 min-w-0 "><!-- Hero image --><div class="relative h-[42vh] min-h-80 w-full overflow-hidden"><img${addAttribute(imageUrl, "src")}${addAttribute(r.name, "alt")} class="absolute inset-0 h-full w-full object-cover"><div class="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/40 to-base-100/20"></div><div class="relative z-10 flex items-center justify-between px-6 md:px-10 pt-6"><a href="/dashboard" class="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-base-100/60 backdrop-blur-md border border-primary-content/60 text-sm hover:border-primary/40 transition"><!-- ArrowLeft icon --><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>Back</a><!-- Botones de acción (interactivos → Vue) -->${renderComponent($$result, "RestaurantDetailClient", RestaurantDetailClient_default, {
		"client:load": true,
		"slug": slug,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RestaurantDetailClient.vue",
		"client:component-export": "default"
	})}</div></div><!-- Content --><div class="px-6 md:px-10 -mt-20 relative z-10 max-w-350 mx-auto pb-16"><!-- Header card --><section class="rounded-3xl border border-primary-content/60 bg-base-100/80 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"><div><p class="text-[11px] uppercase tracking-[0.2em] text-secondary mb-2">${r.cuisine}</p><h1 class="font-display text-4xl md:text-5xl font-bold leading-tight">${r.name}</h1><p class="text-accent-content/85 mt-3 max-w-2xl">${r.description}</p></div><div class="shrink-0 flex items-center gap-3"><div class="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-primary text-primary-content"><svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><span class="text-lg font-bold">${r.rating}</span></div><div class="text-xs text-neutral"><div class="text-accent-content/85  font-semibold">${r.reviews.length}</div><span class="text-accent-content/85 ">reviews</span></div></div></div><div class="mt-6 flex flex-wrap gap-2">${r.tags.map((t) => renderTemplate`<span class="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary-content/60 text-accent-content/85 ">${t}</span>`)}<span class="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary-content/60 text-accent-content/85 ">${r.priceRange}</span></div><div class="mt-6 pt-6 border-t border-primary-content/60">${renderComponent($$result, "RestaurantDistance", RestaurantDistance_default, {
		"client:load": true,
		"resLat": r.lat,
		"resLon": r.lon,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RestaurantDistance.vue",
		"client:component-export": "default"
	})}</div></section><!-- Grid --><div class="grid lg:grid-cols-3 gap-6 mt-6"><!-- Left: info + reviews --><div class="lg:col-span-2 space-y-6"><!-- Business info --><section class="rounded-3xl border border-primary-content/60 bg-base-100/60 p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"><h2 class="font-display text-xl font-bold mb-5">Business info</h2><dl class="grid sm:grid-cols-2 gap-5"><!-- Category --><div class="flex items-start gap-3"><div class="grid place-items-center h-9 w-9 rounded-xl bg-base-200 text-primary shrink-0"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></div><div class="min-w-0"><dt class="text-[11px] uppercase tracking-wider text-accent-content/85 ">Category</dt><dd class="text-sm font-medium mt-0.5">${r.category}</dd></div></div><!-- Address --><div class="flex items-start gap-3"><div class="grid place-items-center h-9 w-9 rounded-xl bg-base-200 text-primary shrink-0"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><div class="min-w-0"><dt class="text-[11px] uppercase tracking-wider text-accent-content/85 ">Address</dt><dd class="text-sm font-medium mt-0.5">${r.address}</dd></div></div><!-- Phone --><div class="flex items-start gap-3"><div class="grid place-items-center h-9 w-9 rounded-xl bg-base-200 text-primary shrink-0"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div><div class="min-w-0"><dt class="text-[11px] uppercase tracking-wider text-accent-content/85 ">Phone</dt><dd class="text-sm font-medium mt-0.5"><a${addAttribute(`tel:${r.phone}`, "href")} class="hover:text-primary transition">${r.phone}</a></dd></div></div><!-- Email --><div class="flex items-start gap-3"><div class="grid place-items-center h-9 w-9 rounded-xl bg-base-200 text-primary shrink-0"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div><div class="min-w-0"><dt class="text-[11px] uppercase tracking-wider text-accent-content/85 ">Email</dt><dd class="text-sm font-medium mt-0.5"><a${addAttribute(`mailto:${r.email}`, "href")} class="hover:text-primary transition break-all">${r.email}</a></dd></div></div></dl></section><!-- Reviews --><section class="rounded-3xl border border-primary-content/60 bg-base-100/60 p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"><div class="flex items-end justify-between mb-6"><h2 class="font-display text-xl font-bold">Reviews & ranking</h2><button class="text-xs px-3 h-9 rounded-full bg-primary text-primary-content font-semibold hover:opacity-90 transition">Write a review</button></div><div class="grid sm:grid-cols-[auto,1fr] gap-8 items-center"><!-- Big rating number --><div class="text-center"><div class="font-display text-5xl font-bold text-primary">${r.rating}</div><!-- Stars --><div class="flex items-center gap-0.5 justify-center mt-1">${[
		1,
		2,
		3,
		4,
		5
	].map((i) => renderTemplate`<svg${addAttribute(`h-3.5 w-3.5 ${i <= Math.round(r.rating) ? "fill-primary text-primary" : "text-neutral"}`, "class")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`)}</div><p class="text-xs text-muted-foreground mt-1">${r.reviews.length} reviews</p></div>${renderComponent($$result, "WriteReviewWrapper", WriteReviewWrapper_default, {
		"client:load": true,
		"slug": slug,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/WriteReviewWrapper.vue",
		"client:component-export": "default"
	})}</div><!-- Recent reviews -->${renderComponent($$result, "Reviews", Reviews_default, {
		"client:load": true,
		"restaurantSlug": r.slug,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/UI/Reviews.vue",
		"client:component-export": "default"
	})}</section></div><!-- Right: map + at-a-glance --><aside class="space-y-6"><section class="rounded-3xl border border-primary-content/60 bg-base-100/60 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"><div class="p-6 pb-4"><h2 class="font-display text-xl text-accent-content/85  font-bold">Location</h2><p class="text-xs text-neutral mt-1">${r.address}</p></div><div class="relative aspect-square w-full"><iframe${addAttribute(`Map of ${r.name}`, "title")}${addAttribute(mapSrc, "src")} class="absolute inset-0 h-full w-full grayscale-20 contrast-[1.05]" loading="lazy"></iframe></div><div class="p-4 border-t border-primary-content/60"><a${addAttribute(mapLink, "href")} target="_blank" rel="noreferrer" class="flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-primary-content text-sm font-semibold hover:opacity-90 transition"><svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>Open in maps</a></div></section><section class="rounded-3xl border border-primary-content/60 bg-base-100/60 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5  "><h3 class="font-display text-base font-bold mb-3">Detalles del restaurante</h3><ul class="text-sm text-neutral space-y-2"><li class="flex justify-between text-accent-content/85 "><span>Price</span><span class="text-base-content">${r.priceRange}</span></li><li class="flex justify-between text-accent-content/85 "><span>Average rating</span><span class="text-base-content">${r.rating} / 5</span></li><li class="flex justify-between text-accent-content/85 "><span>Total reviews</span><span class="text-base-content">${r.reviews.length}</span></li></ul></section></aside></div></div></main>` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/restaurant/[slug].astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/restaurant/[slug].astro";
var $$url = "/restaurant/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/restaurant/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
