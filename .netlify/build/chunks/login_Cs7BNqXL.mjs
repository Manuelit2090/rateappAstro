import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { E as maybeRenderHead, T as renderTemplate, b as renderComponent } from "./sequence_BMjlvBv6.mjs";
import { t as createComponent } from "./compiler_BiHyCVqT.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { n as loadDataUserFromAPI } from "./dataUser_lBwnqZNM.mjs";
import { t as $$LayoutPage } from "./LayoutPage_DbTrSli2.mjs";
import { defineComponent, mergeProps, ref, useSSRContext } from "vue";
import { ssrGetDirectiveProps, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { AlertCircle, ArrowRight, Lock, Mail, Store, User, UserCheck } from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
//#region src/components/LoginForm.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "LoginForm",
	setup(__props, { expose: __expose }) {
		__expose();
		const name = ref("");
		const accountType = ref("CLIENT");
		const email = ref("");
		const password = ref("");
		const error = ref("");
		const loading = ref(false);
		const loginOrRegister = ref("login");
		function isValidEmail(value) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
		}
		async function handleLogin() {
			error.value = "";
			const normalizedEmail = email.value.trim().toLowerCase();
			if (!normalizedEmail || !password.value) {
				error.value = "Email y contraseña son requeridos";
				return;
			}
			if (!isValidEmail(normalizedEmail)) {
				error.value = "Introduce un email válido";
				return;
			}
			if (loading.value) return;
			loading.value = true;
			try {
				const payload = {
					email: normalizedEmail,
					password: password.value
				};
				const res = await fetch("/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(payload)
				});
				const data = await res.json().catch(() => ({}));
				if (!res.ok) {
					error.value = data.error || "Error al iniciar sesión";
					return;
				}
				const destination = typeof data.redirect === "string" ? data.redirect : data.user?.sys === "CLIENT" || data.sys === "CLIENT" ? "/dashboard" : "/admin/dashboard";
				await loadDataUserFromAPI();
				window.location.href = destination;
			} catch (err) {
				console.error("Error:", err);
				error.value = "Error de conexión. Intenta de nuevo.";
			} finally {
				loading.value = false;
			}
		}
		async function handleRegister() {
			error.value = "";
			if (!name.value || !email.value || !password.value) {
				error.value = "Nombre, email y contraseña son requeridos";
				return;
			}
			if (password.value.length < 8) {
				error.value = "La contraseña debe tener al menos 8 caracteres";
				return;
			}
			loading.value = true;
			try {
				const res = await fetch("/api/auth/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({
						name: name.value.trim(),
						email: email.value.trim(),
						password: password.value,
						sys: accountType.value
					})
				});
				const data = await res.json().catch(() => ({}));
				if (!res.ok) {
					error.value = data.error || "Error al registrar usuario";
					return;
				}
				await loadDataUserFromAPI();
				if ((data.sys || accountType.value) === "RESTAURANT") window.location.href = "/admin/dashboard";
				else window.location.href = "/dashboard";
			} catch (err) {
				console.error("Error:", err);
				error.value = "Error de conexión. Intenta de nuevo.";
			} finally {
				loading.value = false;
			}
		}
		function changeLoginOrRegister() {
			error.value = "";
			loginOrRegister.value = loginOrRegister.value === "login" ? "register" : "login";
		}
		const __returned__ = {
			name,
			accountType,
			email,
			password,
			error,
			loading,
			loginOrRegister,
			isValidEmail,
			handleLogin,
			handleRegister,
			changeLoginOrRegister,
			get ArrowRight() {
				return ArrowRight;
			},
			get Mail() {
				return Mail;
			},
			get Lock() {
				return Lock;
			},
			get User() {
				return User;
			},
			get Store() {
				return Store;
			},
			get UserCheck() {
				return UserCheck;
			},
			get AlertCircle() {
				return AlertCircle;
			},
			get vAutoAnimate() {
				return vAutoAnimate;
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "card w-full max-w-md bg-base-200/60 backdrop-blur-2xl border border-base-300/40 shadow-2xl overflow-hidden" }, _attrs))}><div class="card-body p-8 sm:p-10"><div class="md:hidden flex justify-center mb-6"><h1 class="text-3xl font-black italic tracking-tight text-primary"> RateApp </h1></div><div class="mb-6"><h2 class="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">${ssrInterpolate($setup.loginOrRegister === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta")}</h2><p class="text-sm text-base-content/70 mt-1">${ssrInterpolate($setup.loginOrRegister === "login" ? "Accede a tu universo gastronómico digital." : "Descubre y gestiona las mejores experiencias.")}</p></div><div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, ssrGetDirectiveProps(_ctx, $setup["vAutoAnimate"])))}>`);
	if ($setup.loginOrRegister === "login") {
		_push(`<form class="flex flex-col gap-4"><div class="form-control"><label class="label pb-1"><span class="label-text font-medium text-base-content/80">Correo electrónico</span></label><label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">`);
		_push(ssrRenderComponent($setup["Mail"], { class: "w-4 h-4 text-base-content/50" }, null, _parent));
		_push(`<input${ssrRenderAttr("value", $setup.email)} type="email" placeholder="tu@email.com" class="grow" required></label></div><div class="form-control"><div class="flex justify-between items-center pb-1"><label class="label-text font-medium text-base-content/80">Contraseña</label><a href="#" class="text-xs text-primary hover:underline font-medium">¿Olvidaste tu contraseña?</a></div><label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">`);
		_push(ssrRenderComponent($setup["Lock"], { class: "w-4 h-4 text-base-content/50" }, null, _parent));
		_push(`<input${ssrRenderAttr("value", $setup.password)} type="password" placeholder="••••••••" class="grow" required></label></div><button type="submit" class="btn btn-primary w-full mt-2 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold"${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""}>`);
		if ($setup.loading) _push(`<span class="loading loading-spinner loading-sm"></span>`);
		else {
			_push(`<!--[--><span>Entrar</span>`);
			_push(ssrRenderComponent($setup["ArrowRight"], { class: "w-4 h-4" }, null, _parent));
			_push(`<!--]-->`);
		}
		_push(`</button></form>`);
	} else {
		_push(`<form class="flex flex-col gap-4"><div class="form-control"><label class="label pb-1"><span class="label-text font-medium text-base-content/80">Nombre completo</span></label><label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">`);
		_push(ssrRenderComponent($setup["User"], { class: "w-4 h-4 text-base-content/50" }, null, _parent));
		_push(`<input${ssrRenderAttr("value", $setup.name)} type="text" placeholder="Carlos Pérez" class="grow" required></label></div><div class="form-control"><label class="label pb-1"><span class="label-text font-medium text-base-content/80">Tipo de cuenta</span></label><div class="grid grid-cols-2 gap-2 p-1 bg-base-300/40 rounded-xl border border-base-300/50"><button type="button" class="${ssrRenderClass(["btn btn-sm rounded-lg border-none transition-all gap-2", $setup.accountType === "CLIENT" ? "btn-primary shadow-sm" : "btn-ghost text-base-content/70"])}">`);
		_push(ssrRenderComponent($setup["UserCheck"], { class: "w-4 h-4" }, null, _parent));
		_push(` Cliente </button><button type="button" class="${ssrRenderClass(["btn btn-sm rounded-lg border-none transition-all gap-2", $setup.accountType === "RESTAURANT" ? "btn-primary shadow-sm" : "btn-ghost text-base-content/70"])}">`);
		_push(ssrRenderComponent($setup["Store"], { class: "w-4 h-4" }, null, _parent));
		_push(` Restaurante </button></div></div><div class="form-control"><label class="label pb-1"><span class="label-text font-medium text-base-content/80">Correo electrónico</span></label><label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">`);
		_push(ssrRenderComponent($setup["Mail"], { class: "w-4 h-4 text-base-content/50" }, null, _parent));
		_push(`<input${ssrRenderAttr("value", $setup.email)} type="email" placeholder="tu@email.com" class="grow" required></label></div><div class="form-control"><label class="label pb-1"><span class="label-text font-medium text-base-content/80">Contraseña</span></label><label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">`);
		_push(ssrRenderComponent($setup["Lock"], { class: "w-4 h-4 text-base-content/50" }, null, _parent));
		_push(`<input${ssrRenderAttr("value", $setup.password)} type="password" placeholder="Mínimo 8 caracteres" class="grow" required></label></div><button type="submit" class="btn btn-primary w-full mt-2 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold"${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""}>`);
		if ($setup.loading) _push(`<span class="loading loading-spinner loading-sm"></span>`);
		else {
			_push(`<!--[--><span>Crear cuenta</span>`);
			_push(ssrRenderComponent($setup["ArrowRight"], { class: "w-4 h-4" }, null, _parent));
			_push(`<!--]-->`);
		}
		_push(`</button></form>`);
	}
	if ($setup.error) {
		_push(`<div class="alert alert-error text-xs p-3 rounded-xl flex items-center gap-2 mt-2">`);
		_push(ssrRenderComponent($setup["AlertCircle"], { class: "w-4 h-4 shrink-0" }, null, _parent));
		_push(`<span>${ssrInterpolate($setup.error)}</span></div>`);
	} else _push(`<!---->`);
	_push(`</div><div class="text-center mt-6 pt-4 border-t border-base-300/40 text-sm text-base-content/70"><span>${ssrInterpolate($setup.loginOrRegister === "login" ? "¿Aún no tienes cuenta?" : "¿Ya tienes una cuenta?")}</span><button class="text-primary font-semibold hover:underline ml-1 focus:outline-none">${ssrInterpolate($setup.loginOrRegister === "login" ? "Regístrate aquí" : "Inicia sesión")}</button></div></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LoginForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var LoginForm_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/components/astro/loginPanel.astro
var $$LoginPanel = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative grid min-h-screen grid-cols-1 overflow-hidden bg-base-100 text-base-content md:grid-cols-2"><!-- Detalles de esquinas tecnológicas --><div class="pointer-events-none absolute left-8 top-8 z-10 hidden sm:block" aria-hidden="true"><div class="h-16 w-16 border-l-2 border-t-2 border-primary/70 shadow-[0_0_18px_var(--color-primary)]"></div><div class="mt-2 flex gap-1"><span class="h-1 w-1 rounded-full bg-primary"></span><span class="h-1 w-1 rounded-full bg-secondary"></span><span class="h-1 w-1 rounded-full bg-accent"></span></div></div><div class="pointer-events-none absolute right-8 top-8 z-10 hidden sm:block" aria-hidden="true"><div class="ml-auto h-16 w-16 border-r-2 border-t-2 border-secondary/70 shadow-[0_0_18px_var(--color-secondary)]"></div><div class="mt-2 flex justify-end gap-1"><span class="h-1 w-1 rounded-full bg-accent"></span><span class="h-1 w-1 rounded-full bg-secondary"></span><span class="h-1 w-1 rounded-full bg-primary"></span></div></div><!-- COLUMNA IZQUIERDA: Cuadro neón giratorio y logo --><div class="relative hidden min-h-screen flex-col items-center justify-center overflow-hidden border-r border-primary/20 bg-base-200 px-8 backdrop-blur-sm select-none md:flex"><div class="relative z-10 flex flex-col items-center gap-6 p-8 text-center"><div class="relative flex h-64 w-64 items-center justify-center"><!-- 1. Cuadro Neón exterior que gira mediante CSS puro --><div class="spin-element absolute inset-0 rounded-2xl border-2 border-primary bg-transparent" aria-hidden="true"></div><!-- 2. Marco secundario con bordes punteados --><div class="pointer-events-none absolute inset-3 rounded-xl border-2 border-dashed border-secondary/60 bg-transparent" aria-hidden="true"></div><!-- 3. Contenedor central donde flota el logo --><div class="relative flex h-52 w-52 items-center justify-center overflow-hidden rounded-2xl border border-accent/50 bg-base-100 p-5 shadow-[0_0_24px_var(--color-secondary)] backdrop-blur-md"><!-- Logo con animación de rebote independiente --><img src="/avatar-user.png" alt="Avatar de RateApp" width="120" height="120" onerror="this.onerror=null; this.src='/avatar-user.jpg'" class="bounce-element relative z-10 h-36 w-36 object-contain"><!-- Línea de escaneo --><div class="scan-element pointer-events-none absolute inset-x-5 top-5 h-0.5 bg-secondary" aria-hidden="true"></div></div><!-- Líneas de escaneo estéticas --><div class="absolute inset-x-0 h-[2px] bg-primary/30 top-0 animate-[scan_2s_linear_infinite]"></div></div><!-- Título de la App --><div class="space-y-2"><h1 class="text-3xl font-black uppercase tracking-[0.2em] text-base-content">Rate<span class="text-primary">App</span></h1></div></div></div><!-- COLUMNA DERECHA: Formulario e interfaz sin alteraciones --><main class="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 sm:p-12"><div class="w-full max-w-sm rounded-2xl border border-base-content/5 bg-base-100/40 p-6 shadow-2xl backdrop-blur-md sm:p-8 md:border-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">${renderComponent($$result, "LoginForm", LoginForm_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/home/manuel/RateAppProject/rateappAstro/src/components/LoginForm.vue",
		"client:component-export": "default"
	})}</div><footer class="mt-8 w-full shrink-0 px-6 text-center font-mono text-xs text-base-content/60">© 2026 Rate App — Todos los derechos reservados.</footer></main></section>`;
}, "/home/manuel/RateAppProject/rateappAstro/src/components/astro/loginPanel.astro", void 0);
//#endregion
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "LayoutPage", $$LayoutPage, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "LoginPanel", $$LoginPanel, {})}` })}`;
}, "/home/manuel/RateAppProject/rateappAstro/src/pages/login.astro", void 0);
var $$file = "/home/manuel/RateAppProject/rateappAstro/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
