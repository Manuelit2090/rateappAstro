import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as renderScript } from "./script_BLWNlJla.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
import { t as $$LayoutPage } from "./LayoutPage_VTAUcAZr.mjs";
//#region src/pages/admin/create.astro
var create_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Create,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Create = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Create;
	const token = Astro.cookies.get("auth_token")?.value;
	if (!token) return Astro.redirect("/admin/dashboard");
	const payload = verifyToken(token);
	if (!payload || payload.sys !== "RESTAURANT") return Astro.redirect("/admin/dashboard");
	try {
		const meResponse = await fetch(new URL("/api/auth/me", Astro.url.origin).toString(), { headers: {
			Cookie: `auth_token=${token}`,
			Accept: "application/json"
		} });
		if (meResponse.ok) {
			const meData = await meResponse.json();
			if (meData.user?.restaurant_id !== null && meData.user?.restaurant_id !== void 0) return Astro.redirect("/admin/dashboard");
		} else return Astro.redirect("/admin/dashboard");
	} catch (error) {
		console.error("Error validando acceso a crear restaurante:", error);
		return Astro.redirect("/admin/dashboard");
	}
	return renderTemplate`${renderComponent($$result, "LayoutPage", $$LayoutPage, { "title": "Crear — Admin" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8"><div class="mx-auto max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-5 items-start"><!-- Columna Izquierda: Información --><section class="md:col-span-2 border border-base-300 bg-base-100 p-6 shadow-sm rounded-2xl"><h2 class="text-xl font-bold text-base-content">Crear un nuevo restaurante</h2><p class="mt-2 text-sm text-base-content/70">Complete el formulario para dar de alta un nuevo establecimiento en la plataforma. Todos los campos con (*) son obligatorios.</p></section><!-- Columna Derecha: Formulario --><section class="md:col-span-3 border border-base-300 bg-base-100 p-6 shadow-sm rounded-2xl"><!-- AGREGADO: Se le colocó el id "restaurantForm" para poder seleccionarlo en JavaScript --><form id="restaurantForm" action="/api/restaurant" method="POST" class="space-y-4"><div><label for="name" class="block text-sm font-medium text-base-content">Nombre del restaurante *</label><input type="text" name="name" id="name" required class="input input-bordered w-full mt-1 bg-base-100 text-base-content"></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="category" class="block text-sm font-medium text-base-content">Categoría *</label><input type="text" name="category" id="category" required placeholder="Ej: Italiana, Japonesa" class="input input-bordered w-full mt-1 bg-base-100 text-base-content"></div><div><label for="cuisine" class="block text-sm font-medium text-base-content">Tipo de cocina</label><input type="text" name="cuisine" id="cuisine" placeholder="Ej: Tradicional, Fusión" class="input input-bordered w-full mt-1 bg-base-100 text-base-content"></div></div><div><label for="address" class="block text-sm font-medium text-base-content">Dirección *</label><input type="text" name="address" id="address" required class="input input-bordered w-full mt-1 bg-base-100 text-base-content"></div><div><label for="description" class="block text-sm font-medium text-base-content">Descripción</label><textarea name="description" id="description" rows="3" class="textarea textarea-bordered w-full mt-1 bg-base-100 text-base-content"></textarea></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="phone" class="block text-sm font-medium text-base-content">Teléfono</label><input type="tel" name="phone" id="phone" class="input input-bordered w-full mt-1 bg-base-100 text-base-content"></div><div><label for="email" class="block text-sm font-medium text-base-content">Correo electrónico</label><input type="email" name="email" id="email" class="input input-bordered w-full mt-1 bg-base-100 text-base-content"></div></div><div><label for="priceRange" class="block text-sm font-medium text-base-content">Rango de precios</label><select name="priceRange" id="priceRange" class="select select-bordered w-full mt-1 bg-base-100 text-base-content"><option value="" disabled selected>Seleccione una opción</option><option value="€">€ (Económico)</option><option value="€€">€€ (Medio)</option><option value="€€€">€€€ (Premium)</option><option value="€€€€">€€€€ (Lujo)</option></select></div><div class="pt-2"><button type="submit" class="btn btn-primary w-full normal-case text-white">Crear restaurante</button></div></form></section></div></main>` })}<!-- NUEVO: Script para controlar el comportamiento del formulario desde el cliente -->${renderScript($$result, "C:/Users/Estudiante/rateappAstro/src/pages/admin/create.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/admin/create.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/admin/create.astro";
var $$url = "/admin/create";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/create@_@astro
var page = () => create_exports;
//#endregion
export { page };
