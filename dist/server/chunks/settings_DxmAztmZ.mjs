import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { t as $$BaseLayout } from "./BaseLayout_BolpOOY-.mjs";
import { t as HeaderPage_default } from "./HeaderPage_CDlO84Oc.mjs";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
//#region src/components/SettingsPage.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "SettingsPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const form = ref({
			name: "",
			email: "",
			phone: "",
			favoriteFood: "",
			totalPoints: 0,
			totalReviews: 0
		});
		const password = ref("");
		const message = ref("");
		const isSaving = ref(false);
		const getLoggedEmail = () => {
			if (typeof window === "undefined") return "";
			const fromStorage = localStorage.getItem("userEmail");
			if (fromStorage) return fromStorage;
			const fromSession = sessionStorage.getItem("userEmail");
			if (fromSession) return fromSession;
			return "";
		};
		const loadUser = async () => {
			const email = getLoggedEmail();
			if (!email) {
				message.value = "No se encontró el email del usuario autenticado.";
				return;
			}
			try {
				const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
				const data = await response.json();
				if (!response.ok || !data.success) throw new Error(data.error || "No se pudo cargar el perfil");
				form.value = {
					...form.value,
					...data.user
				};
			} catch (error) {
				console.error("Error cargando perfil:", error);
				message.value = "No se pudo cargar tu perfil.";
			}
		};
		const saveProfile = async () => {
			isSaving.value = true;
			message.value = "";
			try {
				const payload = {
					email: form.value.email,
					name: form.value.name,
					phone: form.value.phone,
					favoriteFood: form.value.favoriteFood
				};
				if (password.value) payload.password = password.value;
				const response = await fetch("/api/user", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				});
				const data = await response.json();
				if (!response.ok || !data.success) throw new Error(data.error || "No se pudo guardar");
				password.value = "";
				message.value = "Cambios guardados con éxito.";
			} catch (error) {
				console.error("Error guardando perfil:", error);
				message.value = "No se pudieron guardar los cambios.";
			} finally {
				isSaving.value = false;
			}
		};
		onMounted(() => {
			loadUser();
		});
		const __returned__ = {
			form,
			password,
			message,
			isSaving,
			getLoggedEmail,
			loadUser,
			saveProfile,
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full min-h-screen bg-base-100 text-base-content" }, _attrs))}>`);
	_push(ssrRenderComponent($setup["HeaderPage"], {
		title: "Settings",
		subtitle: "Gestiona tu perfil y preferencias"
	}, null, _parent));
	_push(`<div class="mx-auto px-6 py-6 flex flex-col gap-4"><div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"><div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Settings</p><h1 class="text-3xl font-bold">Perfil y preferencias</h1><p class="mt-2 text-sm text-base-content/70"> Actualiza tus datos personales y preferencias culinarias. </p></div></div></div>`);
	if ($setup.message) _push(`<div class="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">${ssrInterpolate($setup.message)}</div>`);
	else _push(`<!---->`);
	_push(`<div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><section class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"><h2 class="text-xl font-semibold">Información personal</h2><div class="mt-6 grid gap-4 md:grid-cols-2"><label class="block"><span class="mb-2 block text-sm font-medium">Nombre</span><input${ssrRenderAttr("value", $setup.form.name)} class="input input-bordered w-full" placeholder="Tu nombre"></label><label class="block"><span class="mb-2 block text-sm font-medium">Email</span><input${ssrRenderAttr("value", $setup.form.email)} type="email" class="input input-bordered w-full" placeholder="tu@email.com"></label><label class="block"><span class="mb-2 block text-sm font-medium">Teléfono</span><input${ssrRenderAttr("value", $setup.form.phone)} class="input input-bordered w-full" placeholder="Tu teléfono"></label><label class="block md:col-span-2"><span class="mb-2 block text-sm font-medium">Comida favorita</span><input${ssrRenderAttr("value", $setup.form.favoriteFood)} class="input input-bordered w-full" placeholder="Ej. Sushi"></label><label class="block md:col-span-2"><span class="mb-2 block text-sm font-medium">Cambiar contraseña</span><input${ssrRenderAttr("value", $setup.password)} type="password" class="input input-bordered w-full" placeholder="Nueva contraseña"></label></div><div class="mt-6 flex justify-end"><button class="btn btn-primary"${ssrIncludeBooleanAttr($setup.isSaving) ? " disabled" : ""}>${ssrInterpolate($setup.isSaving ? "Guardando..." : "Guardar cambios")}</button></div></section><aside class="space-y-6"><div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"><h2 class="text-lg font-semibold">Resumen</h2><div class="mt-4 grid gap-3"><div class="rounded-2xl bg-primary/10 p-4"><p class="text-sm text-base-content/70">Total de puntos</p><p class="text-2xl font-bold text-primary">${ssrInterpolate($setup.form.totalPoints)}</p></div><div class="rounded-2xl bg-secondary/10 p-4"><p class="text-sm text-base-content/70">Reseñas realizadas</p><p class="text-2xl font-bold text-secondary">${ssrInterpolate($setup.form.totalReviews)}</p></div></div></div></aside></div></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SettingsPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var SettingsPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/settings.astro
var settings_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Settings,
	file: () => $$file,
	url: () => $$url
});
var $$Settings = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Settings — rateapp",
		"description": "Manage your account settings and preferences."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SettingsPage", SettingsPage_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/SettingsPage.vue",
		"client:component-export": "default"
	})}` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/settings.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/settings.astro";
var $$url = "/settings";
//#endregion
//#region \0virtual:astro:page:src/pages/settings@_@astro
var page = () => settings_exports;
//#endregion
export { page };
