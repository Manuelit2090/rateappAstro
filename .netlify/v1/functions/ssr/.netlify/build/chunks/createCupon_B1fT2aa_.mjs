import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { E as maybeRenderHead, I as createAstro, O as addAttribute, T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as renderScript } from "./script_CbvpkAdY.mjs";
import { a as verifyToken } from "./auth_D5Os3erJ.mjs";
import { t as $$AdminBaseLayout } from "./AdminBaseLayout_BI8Pzpgw.mjs";
import { t as pool } from "./db_8ik5yfcT.mjs";
//#region src/pages/admin/createCupon.astro
var createCupon_exports = /* @__PURE__ */ __exportAll({
	default: () => $$CreateCupon,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$CreateCupon = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CreateCupon;
	const token = Astro.cookies.get("auth_token")?.value;
	if (!token) return Astro.redirect("/login");
	const payload = verifyToken(token);
	if (!payload || payload.sys !== "RESTAURANT") return Astro.redirect("/login");
	const restaurantId = Number(payload.restaurant_id ?? 0);
	const [couponRows] = await pool.execute(`SELECT s.idCoupons, s.description, s.price, s.category, s.restaurantId, s.expirationDate, s.createdAt
   FROM shop s
   WHERE s.restaurantId = ?
   ORDER BY s.createdAt DESC`, [restaurantId]);
	const coupons = couponRows || [];
	return renderTemplate`${renderComponent($$result, "AdminBaseLayout", $$AdminBaseLayout, {
		"title": "Cupones admin",
		"description": "Gestión de cupones del restaurante"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="min-h-screen bg-base-200 px-4 py-8"><div class="mx-auto w-full grid gap-6 lg:grid-cols-[1fr_2fr]"><section class="card bg-base-100 shadow-xl border border-base-300"><div class="card-body"><div class="mb-4"><p class="text-sm uppercase tracking-[0.2em] text-primary">Administración</p><h1 class="mt-2 text-3xl font-bold text-base-content">Crear cupón</h1></div><form id="couponForm" class="space-y-4"><div><label class="label" for="description"><span class="label-text">Descripción</span></label><textarea id="description" name="description" rows="3" class="textarea textarea-bordered w-full" placeholder="Ej: 20% en postres" required></textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="label" for="category"><span class="label-text">Categoría</span></label><select id="category" name="category" class="select select-bordered w-full" required><option value="">Selecciona</option><option value="descuento">Descuento</option><option value="promocion">Promoción</option><option value="menu">Menú</option><option value="especial">Especial</option></select></div><div><label class="label" for="price"><span class="label-text">Puntos</span></label><input id="price" name="price" type="number" min="1" class="input input-bordered w-full" placeholder="120" required></div></div><div><label class="label" for="expirationDate"><span class="label-text">Fecha de expiración</span></label><input id="expirationDate" name="expirationDate" type="date" class="input input-bordered w-full"></div><input type="hidden" id="restaurantId" name="restaurantId"${addAttribute(restaurantId, "value")}><div class="pt-2"><button type="submit" class="btn btn-primary w-full text-white">Guardar cupón</button></div><div id="couponMessage" class="hidden alert" role="alert"></div></form></div></section><section class="card bg-base-100 shadow-xl border border-base-300"><div class="card-body"><div class="flex items-center justify-between gap-3"><div><p class="text-sm uppercase tracking-[0.2em] text-secondary">Cupones</p><h2 class="text-2xl font-bold text-base-content">Lista de cupones</h2></div><span class="badge badge-primary badge-outline">${coupons.length}</span></div><div class="overflow-x-auto mt-4"><table class="table table-zebra"><thead><tr><th>Nombre</th><th>Categoría</th><th>Puntos</th><th>Expira</th><th>Acción</th></tr></thead><tbody>${coupons.length > 0 ? coupons.map((coupon) => renderTemplate`<tr><td>${coupon.description}</td><td>${coupon.category}</td><td>${coupon.price}</td><td>${coupon.expirationDate ? new Date(coupon.expirationDate).toLocaleDateString("es-ES") : "Sin fecha"}</td><td><button class="btn btn-error btn-sm delete-coupon"${addAttribute(coupon.idCoupons, "data-coupon-id")}>Eliminar</button></td></tr>`) : renderTemplate`<tr><td colspan="5" class="text-center text-base-content/60 py-6">No hay cupones creados todavía.</td></tr>`}</tbody></table></div></div></section></div></main>` })}${renderScript($$result, "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/createCupon.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/createCupon.astro", void 0);
var $$file = "/home/manuel/RateAppProject/rateappAstro/src/pages/admin/createCupon.astro";
var $$url = "/admin/createCupon";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/createCupon@_@astro
var page = () => createCupon_exports;
//#endregion
export { page };
