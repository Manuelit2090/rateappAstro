import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { f as renderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, reactive, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs } from "vue/server-renderer";
//#region src/components/RegisterForm.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "RegisterForm",
	setup(__props, { expose: __expose }) {
		__expose();
		const form = reactive({
			name: "",
			email: "",
			password: ""
		});
		const error = ref("");
		const success = ref("");
		const loading = ref(false);
		async function handleRegister() {
			error.value = "";
			success.value = "";
			loading.value = true;
			try {
				const res = await fetch("/api/auth/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form)
				});
				const data = await res.json();
				if (!res.ok) {
					error.value = data.error || "Error al registrarse";
					return;
				}
				success.value = "¡Cuenta creada! Redirigiendo...";
				setTimeout(() => {
					window.location.href = "/";
				}, 1500);
			} catch {
				error.value = "Error de conexión. Intenta de nuevo.";
			} finally {
				loading.value = false;
			}
		}
		const __returned__ = {
			form,
			error,
			success,
			loading,
			handleRegister
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "register-wrapper" }, _attrs))} data-v-41e357c8><h2 data-v-41e357c8>Crear cuenta</h2>`);
	if ($setup.error) _push(`<div class="error-msg" data-v-41e357c8>${ssrInterpolate($setup.error)}</div>`);
	else _push(`<!---->`);
	if ($setup.success) _push(`<div class="success-msg" data-v-41e357c8>${ssrInterpolate($setup.success)}</div>`);
	else _push(`<!---->`);
	_push(`<div class="form-group" data-v-41e357c8><label data-v-41e357c8>Nombre completo</label><input${ssrRenderAttr("value", $setup.form.name)} type="text" placeholder="Juan Pérez" data-v-41e357c8></div><div class="form-group" data-v-41e357c8><label data-v-41e357c8>Email</label><input${ssrRenderAttr("value", $setup.form.email)} type="email" placeholder="tu@email.com" data-v-41e357c8></div><div class="form-group" data-v-41e357c8><label data-v-41e357c8>Contraseña</label><input${ssrRenderAttr("value", $setup.form.password)} type="password" placeholder="Mínimo 8 caracteres" data-v-41e357c8></div><button${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""} data-v-41e357c8>${ssrInterpolate($setup.loading ? "Creando cuenta..." : "Registrarse")}</button><p data-v-41e357c8>¿Ya tienes cuenta? <a href="/login" data-v-41e357c8>Inicia sesión</a></p></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/RegisterForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RegisterForm_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-41e357c8"]]);
//#endregion
//#region src/pages/register.astro
var register_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Register,
	file: () => $$file,
	url: () => $$url
});
var $$Register = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="es"><head><meta charset="UTF-8"><title>Registro — RateApp</title>${renderHead($$result)}</head><body>${renderComponent($$result, "RegisterForm", RegisterForm_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/RegisterForm.vue",
		"client:component-export": "default"
	})}</body></html>`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/register.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/register.astro";
var $$url = "/register";
//#endregion
//#region \0virtual:astro:page:src/pages/register@_@astro
var page = () => register_exports;
//#endregion
export { page };
