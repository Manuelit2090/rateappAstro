import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as renderScript } from "./script_CbvpkAdY.mjs";
import { a as verifyToken } from "./auth_D5Os3erJ.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BI8Pzpgw.mjs";
//#region src/pages/admin/redeemCoupon.astro
var redeemCoupon_exports = /* @__PURE__ */ __exportAll({
	default: () => $$RedeemCoupon,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$RedeemCoupon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$RedeemCoupon;
	const token = Astro.cookies.get("auth_token")?.value;
	if (!token) return Astro.redirect("/login");
	const payload = verifyToken(token);
	if (!payload || payload.sys !== "RESTAURANT") return Astro.redirect("/login");
	const actualRestaurantId = Number(payload.restaurant_id ?? 0);
	return renderTemplate`${renderComponent($$result, "AdminBaseLayout", $$AdminBaseLayout, {
		"title": "Canjear cupón",
		"description": "Canjea cupones con código validado por restaurante"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="min-h-screen w-full bg-base-200 px-4 py-8"><div class="w-full"><section class="card bg-base-100 shadow-xl border border-base-300"><div class="card-body space-y-5"><div><p class="text-sm uppercase tracking-[0.2em] text-primary">Canjear</p><h1 class="mt-2 text-3xl font-bold text-base-content">Cupón del cliente</h1></div><div class="alert alert-info shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Formato requerido: SHOP-XXXX-USERID</span></div><form id="redeemForm" class="space-y-4"><div><label class="label" for="couponCode"><span class="label-text">Código del cupón</span></label><input id="couponCode" name="couponCode" type="text" placeholder="SHOP-ABC123-42" class="input input-bordered w-full uppercase" pattern="SHOP-[A-Z0-9]+-\\d+" required></div><input type="hidden" id="restaurantId"${addAttribute(actualRestaurantId, "value")}><button type="submit" class="btn btn-primary w-full text-white">Validar y canjear</button><div id="redeemMessage" class="hidden alert" role="alert"></div></form></div></section></div></main>` })}${renderScript($$result, "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/redeemCoupon.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/redeemCoupon.astro", void 0);
var $$file = "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/redeemCoupon.astro";
var $$url = "/admin/redeemCoupon";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/redeemCoupon@_@astro
var page = () => redeemCoupon_exports;
//#endregion
export { page };
