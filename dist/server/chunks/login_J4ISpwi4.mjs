import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
import { a as $$Image } from "./_astro_assets_aYaEefuT.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { n as loadDataUserFromAPI } from "./dataUser_lBwnqZNM.mjs";
import { t as $$LayoutPage } from "./LayoutPage_VTAUcAZr.mjs";
/* empty css                 */
import { defineComponent, mergeProps, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { ArrowUp } from "lucide-vue-next";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
//#region src/components/LoginForm.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "LoginForm",
	setup(__props, { expose: __expose }) {
		__expose();
		const name = ref("");
		const accountType = ref("");
		const email = ref("");
		const password = ref("");
		const error = ref("");
		const loading = ref(false);
		const [VueautoAnimate] = useAutoAnimate();
		let loginOrRegister = ref("login");
		async function handleLogin() {
			error.value = "";
			if (!email.value || !password.value) {
				error.value = "Email y contraseña son requeridos";
				return;
			}
			loading.value = true;
			try {
				const payload = {
					email: email.value.trim(),
					password: password.value
				};
				console.log("Payload enviado:", payload);
				const res = await fetch("/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				});
				const data = await res.json();
				if (!res.ok) {
					error.value = data.error || "Error al iniciar sesión";
					return;
				}
				const destination = data.redirect || (data.sys === "RESTAURANT" || data.sys === "ADMIN" ? "/admin/dashboard" : "/dashboard");
				await loadDataUserFromAPI();
				window.location.assign(destination);
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
				const sysToSend = accountType.value === "RESTAURANT" ? "RESTAURANT" : "CLIENT";
				const res = await fetch("/api/auth/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: name.value.trim(),
						email: email.value.trim(),
						password: password.value,
						sys: sysToSend
					})
				});
				const data = await res.json();
				if (!res.ok) {
					error.value = data.error || "Error al registrar usuario";
					return;
				}
				data.redirect;
				await loadDataUserFromAPI();
				if ((data.sys || sysToSend || "CLIENT") === "RESTAURANT") window.location.href = "/admin/dashboard";
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
			VueautoAnimate,
			get loginOrRegister() {
				return loginOrRegister;
			},
			set loginOrRegister(v) {
				loginOrRegister = v;
			},
			handleLogin,
			handleRegister,
			changeLoginOrRegister,
			get ArrowUp() {
				return ArrowUp;
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "card w-full max-w-md bg-base-200/70 backdrop-blur-xl border border-base-300/50 shadow-2xl" }, _attrs))}><div class="card-body p-10"><div class="md:hidden flex justify-center mb-8"><h1 class="text-4xl font-black italic tracking-[-2px] text-primary neon-glow"> RateApp </h1></div><div>`);
	if ($setup.loginOrRegister === "login") _push(`<div class="text-center md:text-left mb-8"><h2 class="text-3xl font-bold text-white">Bienvenido de nuevo</h2><p class="text-base-content/70 mt-2">Accede a tu universo gastronómico digital.</p></div>`);
	else _push(`<!---->`);
	if ($setup.loginOrRegister === "register") _push(`<div class="text-center md:text-left mb-8"><h2 class="text-3xl font-bold text-white">Crea una cuenta</h2><p class="text-base-content/70 mt-2">Y descubre un nuevo mundo gastronómico</p></div>`);
	else _push(`<!---->`);
	_push(`</div>`);
	if ($setup.loginOrRegister === "login") {
		_push(`<div><form class="flex flex-col gap-6"><div class="form-control"><label class="label"><span class="label-text text-base-content/70">Email</span></label><input${ssrRenderAttr("value", $setup.email)} type="email" class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full"></div><div class="form-control"><div class="flex justify-between items-center mb-2"><label class="label-text text-base-content/70">Contraseña</label><a href="#" class="link link-primary text-sm hover:no-underline">¿Olvidaste tu contraseña?</a></div><input${ssrRenderAttr("value", $setup.password)} type="password" class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full"></div><button type="submit" class="btn btn-primary btn-lg rounded-full mt-4 shadow-md hover:shadow-[0_0_25px_rgba(163,255,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 font-bold"${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""}><span>${ssrInterpolate($setup.loading ? "Ingresando..." : "Entrar")}</span>`);
		_push(ssrRenderComponent($setup["ArrowUp"], { size: 24 }, null, _parent));
		_push(`</button></form></div>`);
	} else _push(`<!---->`);
	if ($setup.loginOrRegister === "register") {
		_push(`<div><form class="flex flex-col gap-6"><div class="form-control"><label class="label"><span class="label-text text-base-content/70">Nombre Completo</span></label><input${ssrRenderAttr("value", $setup.name)} type="text" placeholder="Ej. Carlos Pérez" class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full"></div><div class="form-control"><label class="label"><span class="label-text text-base-content/70">Tipo de cuenta</span></label><div class="flex gap-2"><button type="button" class="${ssrRenderClass(["btn", $setup.accountType === "CLIENT" ? "btn-primary" : "btn-outline"])}">Cliente</button><button type="button" class="${ssrRenderClass(["btn", $setup.accountType === "RESTAURANT" ? "btn-primary" : "btn-outline"])}">Restaurant</button></div><p class="text-xs text-muted-foreground mt-2">Si no seleccionas nada, se asignará automáticamente <strong>CLIENT</strong>.</p></div><div class="form-control"><label class="label"><span class="label-text text-base-content/70">Email</span></label><input${ssrRenderAttr("value", $setup.email)} type="email" class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full"></div><div class="form-control"><label class="label"><span class="label-text text-base-content/70">Contraseña (Mín. 8 caracteres)</span></label><input${ssrRenderAttr("value", $setup.password)} type="password" class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full"></div><button type="submit" class="btn btn-primary btn-lg rounded-full mt-4 shadow-md hover:shadow-[0_0_25px_rgba(163,255,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 font-bold"${ssrIncludeBooleanAttr($setup.loading) ? " disabled" : ""}><span>${ssrInterpolate($setup.loading ? "Creando Usuario..." : "Registrarse")}</span>`);
		_push(ssrRenderComponent($setup["ArrowUp"], { size: 24 }, null, _parent));
		_push(`</button></form></div>`);
	} else _push(`<!---->`);
	if ($setup.error) _push(`<p class="text-sm text-error mt-4 text-center font-medium">${ssrInterpolate($setup.error)}</p>`);
	else _push(`<!---->`);
	_push(`<div class="text-center mt-8 text-sm"><span>${ssrInterpolate($setup.loginOrRegister === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?")}</span><button class="btn btn-link text-primary hover:no-underline inline-block ml-1"><span>${ssrInterpolate($setup.loginOrRegister === "login" ? "Regístrate" : "Inicia sesión")}</span></button></div></div></div>`);
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
	return renderTemplate`${maybeRenderHead($$result)}<section class="bg-base-100 text-base-content min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative" data-astro-cid-mu4yxmg7><!-- Elementos Ambientales Decorativos (Orbes de Neón traseros) --><div class="fixed top-[-15%] right-[-15%] w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" style="animation-duration: 4s;" data-astro-cid-mu4yxmg7></div><div class="fixed bottom-[-15%] left-[-15%] w-96 h-96 bg-secondary/15 rounded-full blur-3xl -z-10 animate-pulse" style="animation-duration: 5s;" data-astro-cid-mu4yxmg7></div><!-- Detalles Tecnológicos en Esquinas Globales --><!-- Esquina Superior Izquierda --><div class="absolute top-8 left-8 z-10 hidden sm:block" data-astro-cid-mu4yxmg7><div class="w-16 h-16 border-l-2 border-t-2 border-primary/30" data-astro-cid-mu4yxmg7></div><div class="flex gap-1 mt-2" data-astro-cid-mu4yxmg7><div class="w-1 h-1 rounded-full bg-primary/50" data-astro-cid-mu4yxmg7></div><div class="w-1 h-1 rounded-full bg-primary/30" data-astro-cid-mu4yxmg7></div><div class="w-1 h-1 rounded-full bg-primary/20" data-astro-cid-mu4yxmg7></div></div></div><!-- Esquina Superior Derecha --><div class="absolute top-8 right-8 z-10 hidden sm:block" data-astro-cid-mu4yxmg7><div class="w-16 h-16 border-r-2 border-t-2 border-secondary/30" data-astro-cid-mu4yxmg7></div><div class="flex gap-1 mt-2 justify-end" data-astro-cid-mu4yxmg7><div class="w-1 h-1 rounded-full bg-secondary/20" data-astro-cid-mu4yxmg7></div><div class="w-1 h-1 rounded-full bg-secondary/30" data-astro-cid-mu4yxmg7></div><div class="w-1 h-1 rounded-full bg-secondary/50" data-astro-cid-mu4yxmg7></div></div></div><!-- COLUMNA IZQUIERDA: Logo y Fondo Futurista --><div class="relative hidden lg:flex flex-col items-center justify-center border-r border-base-content/10 bg-neutral/20 backdrop-blur-sm overflow-hidden select-none" data-astro-cid-mu4yxmg7><!-- Patrón de malla cibernética de fondo --><div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" data-astro-cid-mu4yxmg7></div><!-- Orbe de neón interno para la columna del logo --><div class="absolute w-64 h-64 bg-primary/20 rounded-full blur-2xl animate-pulse" data-astro-cid-mu4yxmg7></div><!-- Contenedor del Logotipo (Placeholder Futurista) --><div class="relative z-10 flex flex-col items-center gap-6 p-8 text-center" data-astro-cid-mu4yxmg7><!-- Escudo/Contenedor del Logo --><div class="relative w-40 h-40 flex items-center justify-center border border-primary/40 rounded-xl bg-base-100/50 backdrop-blur-md shadow-[0_0_50px_rgba(var(--p),0.1)] before:absolute before:inset-0 before:border-2 before:border-dashed before:border-primary/20 before:rounded-xl before:animate-[spin_40s_linear_infinite]" data-astro-cid-mu4yxmg7><!-- Glifo Tecnológico Temporal --><span class="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary animate-bounce" style="animation-duration: 3s;" data-astro-cid-mu4yxmg7>${renderComponent($$result, "Image", $$Image, {
		"src": "/avatar-user.jpg",
		"alt": "Avatar del usuario",
		"width": 120,
		"height": 120,
		"data-astro-cid-mu4yxmg7": true
	})}</span><!-- Líneas de escaneo estéticas --><div class="absolute inset-x-0 h-[2px] bg-primary/30 top-0 animate-[scan_2s_linear_infinite]" data-astro-cid-mu4yxmg7></div></div><!-- Textos del Proyecto --><div class="space-y-2" data-astro-cid-mu4yxmg7><h1 class="text-3xl font-black tracking-[0.2em] uppercase text-base-content" data-astro-cid-mu4yxmg7>Rate<span class="text-primary" data-astro-cid-mu4yxmg7>App</span></h1><p class="text-xs tracking-widest text-base-content/60 font-mono" data-astro-cid-mu4yxmg7>[ SYSTEM_ACCESS: STABLE_NODE ]</p></div></div><!-- Líneas de datos simuladas en la parte inferior izquierda --><div class="absolute bottom-8 left-8 font-mono text-[10px] text-base-content/30 space-y-1" data-astro-cid-mu4yxmg7><p data-astro-cid-mu4yxmg7>SYS_STATUS: ACTIVE</p><p data-astro-cid-mu4yxmg7>NETWORK: SECURE_CORE_9</p></div></div><!-- COLUMNA DERECHA: Formulario de Login --><main class="relative flex flex-col items-center justify-center p-6 sm:p-12 z-10" data-astro-cid-mu4yxmg7><!-- Contenedor del Formulario --><div class="w-full max-w-sm bg-base-100/40 lg:bg-transparent p-6 sm:p-0 rounded-2xl border border-base-content/5 lg:border-none backdrop-blur-md lg:backdrop-blur-none shadow-2xl lg:shadow-none" data-astro-cid-mu4yxmg7>${renderComponent($$result, "LoginForm", LoginForm_default, {
		"client:load": true,
		"data-astro-cid-mu4yxmg7": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Users/Estudiante/rateappAstro/src/components/LoginForm.vue",
		"client:component-export": "default"
	})}</div><!-- Footer integrado en la columna derecha --><footer class="w-full text-center text-[10px] sm:text-xs absolute bottom-6 left-0 px-6 font-mono" data-astro-cid-mu4yxmg7><p class="font-medium tracking-widest text-base-content/40" data-astro-cid-mu4yxmg7>© 2026 Rate App</p></footer></main></section>`;
}, "C:/Users/Estudiante/rateappAstro/src/components/astro/loginPanel.astro", void 0);
//#endregion
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "LayoutPage", $$LayoutPage, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "LoginPanel", $$LoginPanel, {})}` })}`;
}, "C:/Users/Estudiante/rateappAstro/src/pages/login.astro", void 0);
var $$file = "C:/Users/Estudiante/rateappAstro/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
