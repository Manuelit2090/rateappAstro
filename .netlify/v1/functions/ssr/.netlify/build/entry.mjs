import { D as MiddlewareNotAResponse, E as MiddlewareNoDataOrNextCalled, G as SessionStorageInitError, H as ReservedSlotName, K as SessionStorageSaveError, N as NoManifestAvailable, Q as AstroError, T as LocalsReassigned, U as ResponseSentError, Z as i18nNoLocaleFoundInPath, a as ClientAddressNotAvailable, et as isAstroError, i as CacheNotEnabled, n as ActionsReturnedInvalidDataError, p as ForbiddenRewrite, q as StaticClientAddressNotAvailable, r as AstroResponseHeadersReassigned, t as ActionNotFoundError, w as LocalsNotAnObject, z as PrerenderClientAddressNotAvailable } from "./chunks/errors-data_CyKOah3-.mjs";
import { $ as REDIRECT_STATUS_CODES, A as isRenderInstruction, B as routeHasHtmlExtension, C as renderSlotToString, F as renderEndpoint, G as readBodyWithLimit, H as isRoute500, J as shouldAppendForwardSlash, K as createAsyncManifestMemo, L as getCustom404Route, M as pushDirective, P as escape, Q as ASTRO_GENERATOR, R as getCustom500Route, U as getErrorRoutePath, V as isRoute404, W as BodySizeLimitError, X as s, Y as AstroIntegrationLogger, Z as ASTRO_ERROR_HEADER, a as getRouteCache, at as normalizeTheLocale, bt as decodeKey, c as getResolvedLogger, ct as appendForwardSlash, d as getOriginPathname, dt as hasFileExtension, et as REROUTABLE_STATUS_CODES, f as setOriginPathname, ft as isInternalPath, g as SERVER_ISLAND_COMPONENT, gt as removeLeadingForwardSlash, h as DEFAULT_404_ROUTE, ht as prependForwardSlash, i as getProps, it as responseSentSymbol$1, j as normalizeCspResourceEntry, l as getEnvironment, lt as collapseDuplicateSlashes, m as validateAndDecodePathname, mt as joinPaths, n as defineMiddleware, nt as fetchStateSymbol, o as getRouteGenerator, ot as normalizeThePath, p as MultiLevelEncodingError, q as createManifestMemo, r as getParams, rt as originPathnameSymbol, s as getLogger, st as pathHasLocale, t as sequence, tt as clientAddressSymbol, u as copyRequest, ut as collapseDuplicateTrailingSlashes, v as renderPage, vt as removeTrailingForwardSlash, w as isRenderTemplateResult, x as chunkToString, xt as generateCspDigest, y as renderJSX, yt as stripRequestBase, z as getDefaultStatusCode } from "./chunks/sequence_BMjlvBv6.mjs";
import { n as matchPattern } from "./chunks/remote_BOuOrwzx.mjs";
import { t as destr } from "./chunks/dist_Cy2RTTvx.mjs";
import { createSSRApp, defineComponent, h } from "vue";
import { renderToString } from "vue/server-renderer";
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData)
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region node_modules/.pnpm/@astrojs+vue@7.0.2_@types+node@26.2.0_astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1_d404395fee28a5803364d3d3d084c573/node_modules/@astrojs/vue/dist/context.js
var contexts = /* @__PURE__ */ new WeakMap();
var ID_PREFIX = "s";
function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) return contexts.get(rendererContextResult);
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		}
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}
function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}
//#endregion
//#region node_modules/.pnpm/@astrojs+vue@7.0.2_@types+node@26.2.0_astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1_d404395fee28a5803364d3d3d084c573/node_modules/@astrojs/vue/dist/static-html.js
var static_html_default = defineComponent({
	props: {
		value: String,
		name: String,
		hydrate: {
			type: Boolean,
			default: true
		}
	},
	setup({ name, value, hydrate }) {
		if (!value) return () => null;
		let tagName = hydrate ? "astro-slot" : "astro-static-slot";
		return () => h(tagName, {
			name,
			innerHTML: value
		});
	}
});
//#endregion
//#region node_modules/.pnpm/@astrojs+vue@7.0.2_@types+node@26.2.0_astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1_d404395fee28a5803364d3d3d084c573/node_modules/@astrojs/vue/dist/server.js
async function check(Component) {
	return !!Component["ssrRender"] || !!Component["__ssrInlineRender"];
}
async function renderToStaticMarkup(Component, inputProps, slotted, metadata) {
	let prefix;
	if (this && this.result) prefix = incrementId(this.result);
	const attrs = { prefix };
	const slots = {};
	const props = { ...inputProps };
	delete props.slot;
	for (const [key, value] of Object.entries(slotted)) slots[key] = () => h(static_html_default, {
		value,
		name: key === "default" ? void 0 : key,
		hydrate: metadata?.astroStaticSlot ? !!metadata.hydrate : true
	});
	const app = createSSRApp({ render: () => h(Component, props, slots) });
	app.config.idPrefix = prefix;
	await void 0;
	return {
		html: await renderToString(app),
		attrs
	};
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [Object.assign({
	"name": "@astrojs/vue",
	"clientEntrypoint": "@astrojs/vue/client.js",
	"serverEntrypoint": "@astrojs/vue/server.js"
}, { ssr: {
	name: "@astrojs/vue",
	check,
	renderToStaticMarkup,
	supportsAstroStaticSlot: true
} })];
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/i18n/domain.js
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		let host = request.headers.get("X-Forwarded-Host");
		let protocol = request.headers.get("X-Forwarded-Proto");
		if (protocol) protocol = protocol + ":";
		else protocol = url.protocol;
		if (!host) host = request.headers.get("Host");
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/cookie@2.0.1/node_modules/cookie/dist/index.js
/**
* RegExp to match cookie-name in RFC 6265 sec 4.1.1
* This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
* which has been replaced by the token definition in RFC 7230 appendix B.
*
* cookie-name       = token
* token             = 1*tchar
* tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
*                     "*" / "+" / "-" / "." / "^" / "_" /
*                     "`" / "|" / "~" / DIGIT / ALPHA
*
* Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
* Allow same range as cookie value, except `=`, which delimits end of name.
*/
var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
/**
* RegExp to match cookie-value in RFC 6265 sec 4.1.1
*
* cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
* cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
*                     ; US-ASCII characters excluding CTLs,
*                     ; whitespace DQUOTE, comma, semicolon,
*                     ; and backslash
*
* Allowing more characters: https://github.com/jshttp/cookie/issues/191
* Comma, backslash, and DQUOTE are not part of the parsing algorithm.
*/
var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
/**
* RegExp to match domain-value in RFC 6265 sec 4.1.1
*
* domain-value      = <subdomain>
*                     ; defined in [RFC1034], Section 3.5, as
*                     ; enhanced by [RFC1123], Section 2.1
* <subdomain>       = <label> | <subdomain> "." <label>
* <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
*                     Labels must be 63 characters or less.
*                     'let-dig' not 'letter' in the first char, per RFC1123
* <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
* <let-dig-hyp>     = <let-dig> | "-"
* <let-dig>         = <letter> | <digit>
* <letter>          = any one of the 52 alphabetic characters A through Z in
*                     upper case and a through z in lower case
* <digit>           = any one of the ten digits 0 through 9
*
* Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
*
* > (Note that a leading %x2E ("."), if present, is ignored even though that
* character is not permitted, but a trailing %x2E ("."), if present, will
* cause the user agent to ignore the attribute.)
*/
var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
/**
* RegExp to match path-value in RFC 6265 sec 4.1.1
*
* path-value        = <any CHAR except CTLs or ";">
* CHAR              = %x01-7F
*                     ; defined in RFC 5234 appendix B.1
*/
var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
/**
* RegExp to match RFC 6265 cookie-octet values (without % to preserve roundtrip) that need no URL encoding.
*/
var cookieOctetRegExp = /^[!#$&'()*+\-.\/0-9:<=>?@A-Z[\]\^_`a-z{|}~]*$/;
var NullObject = /* @__PURE__ */ (() => {
	const C = function() {};
	C.prototype = Object.create(null);
	return C;
})();
/**
* Parse a `Cookie` header.
*
* Parse the given cookie header string into an object
* The object has the various cookies as keys(names) => values
*/
function parseCookie(str, options) {
	const obj = new NullObject();
	const len = str.length;
	if (len < 2) return obj;
	const dec = options?.decode || decode;
	let index = 0;
	do {
		const eqIdx = eqIndex(str, index, len);
		if (eqIdx === len) break;
		const endIdx = endIndex(str, index, len);
		if (eqIdx > endIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = valueSlice(str, index, eqIdx);
		if (obj[key] === void 0) obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
		index = endIdx + 1;
	} while (index < len);
	return obj;
}
/**
* Serialize data into a cookie header.
*
* Serialize a name value pair into a cookie string suitable for
* http headers. An optional options object specifies cookie parameters.
*
* stringifySetCookie({ name: 'foo', value: 'bar', httpOnly: true })
*   => "foo=bar; HttpOnly"
*/
function stringifySetCookie(cookie, options) {
	const enc = options?.encode || defaultEncode;
	if (!cookieNameRegExp.test(cookie.name)) throw new TypeError(`argument name is invalid: ${cookie.name}`);
	const value = cookie.value == null ? "" : enc(cookie.value);
	if (!cookieValueRegExp.test(value)) throw new TypeError(`argument val is invalid: ${cookie.value}`);
	let str = cookie.name + "=" + value;
	if (cookie.maxAge !== void 0) {
		if (!Number.isInteger(cookie.maxAge)) throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
		str += "; Max-Age=" + cookie.maxAge;
	}
	if (cookie.domain) {
		if (!domainValueRegExp.test(cookie.domain)) throw new TypeError(`option domain is invalid: ${cookie.domain}`);
		str += "; Domain=" + cookie.domain;
	}
	if (cookie.path) {
		if (!pathValueRegExp.test(cookie.path)) throw new TypeError(`option path is invalid: ${cookie.path}`);
		str += "; Path=" + cookie.path;
	}
	if (cookie.expires) {
		if (!Number.isFinite(cookie.expires.valueOf())) throw new TypeError(`option expires is invalid: ${cookie.expires}`);
		str += "; Expires=" + cookie.expires.toUTCString();
	}
	if (cookie.httpOnly) str += "; HttpOnly";
	if (cookie.secure) str += "; Secure";
	if (cookie.partitioned) str += "; Partitioned";
	if (cookie.priority) switch (typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0) {
		case "low":
			str += "; Priority=Low";
			break;
		case "medium":
			str += "; Priority=Medium";
			break;
		case "high":
			str += "; Priority=High";
			break;
		default: throw new TypeError(`option priority is invalid: ${cookie.priority}`);
	}
	if (cookie.sameSite) switch (typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite) {
		case true:
		case "strict":
			str += "; SameSite=Strict";
			break;
		case "lax":
			str += "; SameSite=Lax";
			break;
		case "none":
			str += "; SameSite=None";
			break;
		default: throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
	}
	return str;
}
/**
* Find the next `;` character, or return `len`.
*/
function endIndex(str, min, len) {
	const index = str.indexOf(";", min);
	return index === -1 ? len : index;
}
/**
* Find the next `=` character, or return `len`.
*/
function eqIndex(str, min, len) {
	const index = str.indexOf("=", min);
	return index === -1 ? len : index;
}
/**
* Slice out a value between startPod to max.
*/
function valueSlice(str, min, max) {
	if (min === max) return "";
	let start = min;
	let end = max;
	do {
		const code = str.charCodeAt(start);
		if (code !== 32 && code !== 9) break;
	} while (++start < end);
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 32 && code !== 9) break;
		end--;
	}
	return str.slice(start, end);
}
/**
* URL-decode string value. Optimized to skip native call when no %.
*/
function decode(str) {
	if (str.indexOf("%") === -1) return str;
	try {
		return decodeURIComponent(str);
	} catch (e) {
		return str;
	}
}
/**
* URL-encode string value. Optimized to skip native call for roundtrip-safe cookie-octet values.
*/
function defaultEncode(str) {
	return cookieOctetRegExp.test(str) ? str : encodeURIComponent(str);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	constructor(request) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) {
			const warning = /* @__PURE__ */ new Error("Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
			warning.name = "Warning";
			console.warn(warning);
		}
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = /* @__PURE__ */ Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/fetch/features.js
var FetchFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
function markFeatureUsed(manifest, feature) {
	const entry = usedFeatures.get(manifest);
	if (entry) entry.bits |= feature;
	else usedFeatures.set(manifest, { bits: feature });
}
function getUsedFeatures(manifest) {
	return usedFeatures.get(manifest)?.bits ?? 0;
}
//#endregion
//#region node_modules/.pnpm/devalue@5.9.1/node_modules/devalue/src/constants.js
var MAX_ARRAY_LEN = 2 ** 32 - 1;
var MAX_ARRAY_INDEX = MAX_ARRAY_LEN - 1;
//#endregion
//#region node_modules/.pnpm/devalue@5.9.1/node_modules/devalue/src/utils.js
var DevalueError = class extends Error {
	/**
	* @param {string} message
	* @param {string[]} keys
	* @param {any} [value] - The value that failed to be serialized
	* @param {any} [root] - The root value being serialized
	*/
	constructor(message, keys, value, root) {
		super(message);
		this.name = "DevalueError";
		this.path = keys.join("");
		this.value = value;
		this.root = root;
	}
};
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
/** @param {any} thing */
function is_plain_object(thing) {
	const proto = Object.getPrototypeOf(thing);
	return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
/** @param {any} thing */
function get_type(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}
/** @param {string} char */
function get_escaped_char(char) {
	switch (char) {
		case "\"": return "\\\"";
		case "<": return "\\u003C";
		case "\\": return "\\\\";
		case "\n": return "\\n";
		case "\r": return "\\r";
		case "	": return "\\t";
		case "\b": return "\\b";
		case "\f": return "\\f";
		case "\u2028": return "\\u2028";
		case "\u2029": return "\\u2029";
		default: return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
	}
}
/** @param {string} str */
function stringify_string(str) {
	let result = "";
	let last_pos = 0;
	const len = str.length;
	for (let i = 0; i < len; i += 1) {
		const char = str[i];
		const replacement = get_escaped_char(char);
		if (replacement) {
			result += str.slice(last_pos, i) + replacement;
			last_pos = i + 1;
		}
	}
	return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
/** @param {Record<string | symbol, any>} object */
function enumerable_symbols(object) {
	return Object.getOwnPropertySymbols(object).filter((symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable);
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
/** @param {string} key */
function stringify_key(key) {
	return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
/** @param {number} n */
function is_valid_array_index(n) {
	if (!Number.isInteger(n)) return false;
	if (n < 0) return false;
	if (n > MAX_ARRAY_INDEX) return false;
	return true;
}
/** @param {number} n */
function is_valid_array_len(n) {
	if (!Number.isInteger(n)) return false;
	if (n < 0) return false;
	if (n > MAX_ARRAY_LEN) return false;
	return true;
}
/** @param {string} s */
function is_valid_array_index_string(s) {
	if (s.length === 0) return false;
	if (s.length > 1 && s.charCodeAt(0) === 48) return false;
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c < 48 || c > 57) return false;
	}
	return is_valid_array_index(+s);
}
/**
* Returns the length of the leading run of valid array indices in `keys`.
* @param {readonly string[]} keys
*/
function array_index_cut(keys) {
	for (var i = keys.length - 1; i >= 0; i--) if (is_valid_array_index_string(keys[i])) break;
	return i + 1;
}
/**
* Finds the populated indices of an array.
* @param {unknown[]} array
*/
function valid_array_indices(array) {
	const keys = Object.keys(array);
	keys.length = array_index_cut(keys);
	return keys;
}
//#endregion
//#region node_modules/.pnpm/devalue@5.9.1/node_modules/devalue/src/base64.js
/**	@type {(array_buffer: ArrayBuffer) => string} */
function encode_native(array_buffer) {
	return new Uint8Array(array_buffer).toBase64();
}
/**	@type {(base64: string) => ArrayBuffer} */
function decode_native(base64) {
	return Uint8Array.fromBase64(base64).buffer;
}
/** @type {(array_buffer: ArrayBuffer) => string} */
function encode_buffer(array_buffer) {
	return Buffer.from(array_buffer).toString("base64");
}
/**	@type {(base64: string) => ArrayBuffer} */
function decode_buffer(base64) {
	return Uint8Array.from(Buffer.from(base64, "base64")).buffer;
}
/** @type {(array_buffer: ArrayBuffer) => string} */
function encode_legacy(array_buffer) {
	const array = new Uint8Array(array_buffer);
	let binary = "";
	const chunk_size = 32768;
	for (let i = 0; i < array.length; i += chunk_size) {
		const chunk = array.subarray(i, i + chunk_size);
		binary += String.fromCharCode.apply(null, chunk);
	}
	return btoa(binary);
}
/**	@type {(base64: string) => ArrayBuffer} */
function decode_legacy(base64) {
	const binary_string = atob(base64);
	const len = binary_string.length;
	const array = new Uint8Array(len);
	for (let i = 0; i < len; i++) array[i] = binary_string.charCodeAt(i);
	return array.buffer;
}
var native = typeof Uint8Array.fromBase64 === "function";
var buffer = typeof process === "object" && process.versions?.node !== void 0;
var encode64 = native ? encode_native : buffer ? encode_buffer : encode_legacy;
var decode64 = native ? decode_native : buffer ? decode_buffer : decode_legacy;
//#endregion
//#region node_modules/.pnpm/devalue@5.9.1/node_modules/devalue/src/operations.js
/**
* Merges caller-provided operation overrides over the defaults. Iterating the
* default keys (rather than the override's own keys) means nullish members
* fall back to the default, and inherited members — e.g. from a class
* instance — are picked up.
*
* @template {Record<string, any>} T
* @param {T} defaults
* @param {Partial<T> | undefined} overrides
* @returns {T}
*/
function merge_operations(defaults, overrides) {
	if (!overrides) return defaults;
	const merged = {};
	for (const key of Object.keys(defaults)) merged[key] = overrides[key] ?? defaults[key];
	return merged;
}
/** @type {{ kind: 'not-plain' }} */
var NOT_PLAIN = Object.freeze({ kind: "not-plain" });
/** @type {{ kind: 'symbol-keys' }} */
var SYMBOL_KEYS = Object.freeze({ kind: "symbol-keys" });
var default_stringify_operations = Object.freeze({
	identify: (value) => value,
	typeOf: (value) => value === null ? "null" : typeof value,
	toPrimitive: (value) => value,
	tagOf: (value) => get_type(value),
	isThenable: (value) => typeof value.then === "function",
	toPromise: (thenable) => Promise.resolve(thenable),
	unbox: (boxed) => boxed.valueOf(),
	toISOString: (date) => isNaN(date.getDate()) ? "" : date.toISOString(),
	toStringValue: (value) => value.toString(),
	regExpInfo: (regexp) => ({
		source: regexp.source,
		flags: regexp.flags
	}),
	valuesOf: (set) => set,
	entriesOf: (map) => map,
	viewInfo: (view) => ({
		buffer: view.buffer,
		byteOffset: view.byteOffset,
		byteLength: view.byteLength,
		length: view.length,
		bufferByteLength: view.buffer.byteLength
	}),
	toArrayBuffer: (buffer) => buffer,
	lengthOf: (array) => array.length,
	hasOwn: (value, key) => Object.hasOwn(value, key),
	indicesOf: (array) => valid_array_indices(array),
	shapeOf: (value) => {
		if (!is_plain_object(value)) return NOT_PLAIN;
		if (enumerable_symbols(value).length > 0) return SYMBOL_KEYS;
		return {
			kind: Object.getPrototypeOf(value) === null ? "null-proto" : "plain",
			keys: Object.keys(value)
		};
	},
	get: (value, key) => value[key]
});
var default_parse_operations = Object.freeze({
	fromPrimitive: (primitive) => primitive,
	fromISOString: (iso) => new Date(iso),
	fromStringValue: (tag, text) => {
		if (tag === "URL") return new URL(text);
		if (tag === "URLSearchParams") return new URLSearchParams(text);
		return Temporal[tag.slice(9)].from(text);
	},
	fromArrayBuffer: (buffer) => buffer,
	fromRegExpInfo: (source, flags) => new RegExp(source, flags),
	fromViewInfo: (tag, buffer, byteOffset, length) => {
		const Constructor = globalThis[tag];
		return byteOffset !== void 0 ? new Constructor(buffer, byteOffset, length) : new Constructor(buffer);
	},
	box: (value) => Object(value),
	createArray: (length) => new Array(length),
	createSparseArray: (length) => {
		/** @type {any[]} */
		const array = [];
		array[MAX_ARRAY_INDEX] = void 0;
		delete array[MAX_ARRAY_INDEX];
		array.length = length;
		return array;
	},
	createObject: () => ({}),
	createNullPrototypeObject: () => Object.create(null),
	createSet: () => /* @__PURE__ */ new Set(),
	createMap: () => /* @__PURE__ */ new Map(),
	set: (target, key, value) => {
		target[key] = value;
	},
	addValue: (set, value) => {
		set.add(value);
	},
	addEntry: (map, key, value) => {
		map.set(key, value);
	}
});
//#endregion
//#region node_modules/.pnpm/devalue@5.9.1/node_modules/devalue/src/parse.js
/**
* Revive a value serialized with `devalue.stringify`
* @param {string} serialized
* @param {Record<string, (value: any) => any>} [revivers]
* @param {import('./types.js').ParseOptions} [options]
*/
function parse(serialized, revivers, options) {
	return unflatten$1(JSON.parse(serialized), revivers, options);
}
/**
* Revive a value flattened with `devalue.stringify`
* @param {number | any[]} parsed
* @param {Record<string, (value: any) => any>} [revivers]
* @param {import('./types.js').ParseOptions} [options]
*/
function unflatten$1(parsed, revivers, options) {
	/** @type {import('./types.js').ParseOperations} */
	const ops = merge_operations(default_parse_operations, options?.operations);
	if (typeof parsed === "number") return hydrate(parsed, true);
	if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Invalid input");
	const values = parsed;
	const hydrated = Array(values.length);
	/**
	* A set of values currently being hydrated with custom revivers,
	* used to detect invalid cyclical dependencies
	* @type {Set<number> | null}
	*/
	let hydrating = null;
	/**
	* @param {number} index
	* @returns {any}
	*/
	function hydrate(index, standalone = false) {
		if (index === -1) return ops.fromPrimitive(void 0);
		if (index === -3) return ops.fromPrimitive(NaN);
		if (index === -4) return ops.fromPrimitive(Infinity);
		if (index === -5) return ops.fromPrimitive(-Infinity);
		if (index === -6) return ops.fromPrimitive(-0);
		if (standalone || typeof index !== "number") throw new Error(`Invalid input`);
		if (index in hydrated) return hydrated[index];
		const value = values[index];
		if (!value || typeof value !== "object") hydrated[index] = ops.fromPrimitive(value);
		else if (Array.isArray(value)) {
			if (typeof value[0] === "string") {
				const type = value[0];
				const reviver = revivers && Object.hasOwn(revivers, type) ? revivers[type] : void 0;
				if (reviver) {
					let i = value[1];
					if (typeof i !== "number") i = values.push(value[1]) - 1;
					if (Object.hasOwn(hydrated, i)) return hydrated[index] = reviver(hydrated[i]);
					hydrating ??= /* @__PURE__ */ new Set();
					if (hydrating.has(i)) throw new Error("Invalid circular reference");
					hydrating.add(i);
					hydrated[index] = reviver(hydrate(i));
					hydrating.delete(i);
					return hydrated[index];
				}
				switch (type) {
					case "Date":
						hydrated[index] = ops.fromISOString(value[1]);
						break;
					case "Set":
						const set = ops.createSet();
						hydrated[index] = set;
						for (let i = 1; i < value.length; i += 1) ops.addValue(set, hydrate(value[i]));
						break;
					case "Map":
						const map = ops.createMap();
						hydrated[index] = map;
						for (let i = 1; i < value.length; i += 2) ops.addEntry(map, hydrate(value[i]), hydrate(value[i + 1]));
						break;
					case "RegExp":
						hydrated[index] = ops.fromRegExpInfo(value[1], value[2]);
						break;
					case "Object": {
						const wrapped_index = value[1];
						if (typeof values[wrapped_index] === "object" && values[wrapped_index][0] !== "BigInt") throw new Error("Invalid input");
						hydrated[index] = ops.box(hydrate(wrapped_index));
						break;
					}
					case "BigInt":
						hydrated[index] = ops.fromPrimitive(BigInt(value[1]));
						break;
					case "null":
						const obj = ops.createNullPrototypeObject();
						hydrated[index] = obj;
						for (let i = 1; i < value.length; i += 2) {
							if (value[i] === "__proto__") throw new Error("Cannot parse an object with a `__proto__` property");
							ops.set(obj, value[i], hydrate(value[i + 1]));
						}
						break;
					case "Int8Array":
					case "Uint8Array":
					case "Uint8ClampedArray":
					case "Int16Array":
					case "Uint16Array":
					case "Float16Array":
					case "Int32Array":
					case "Uint32Array":
					case "Float32Array":
					case "Float64Array":
					case "BigInt64Array":
					case "BigUint64Array":
					case "DataView": {
						if (values[value[1]][0] !== "ArrayBuffer") throw new Error("Invalid data");
						const buffer = hydrate(value[1]);
						hydrated[index] = ops.fromViewInfo(type, buffer, value[2], value[3]);
						break;
					}
					case "ArrayBuffer": {
						const base64 = value[1];
						if (typeof base64 !== "string") throw new Error("Invalid ArrayBuffer encoding");
						hydrated[index] = ops.fromArrayBuffer(decode64(base64));
						break;
					}
					case "URL":
					case "URLSearchParams":
					case "Temporal.Duration":
					case "Temporal.Instant":
					case "Temporal.PlainDate":
					case "Temporal.PlainTime":
					case "Temporal.PlainDateTime":
					case "Temporal.PlainMonthDay":
					case "Temporal.PlainYearMonth":
					case "Temporal.ZonedDateTime":
						hydrated[index] = ops.fromStringValue(type, value[1]);
						break;
					default: throw new Error(`Unknown type ${type}`);
				}
			} else if (value[0] === -7) {
				const len = value[1];
				if (!is_valid_array_len(len)) throw new Error("Invalid input");
				const array = ops.createSparseArray(len);
				hydrated[index] = array;
				for (let i = 2; i < value.length; i += 2) {
					const idx = value[i];
					if (!is_valid_array_index(idx) || idx >= len) throw new Error("Invalid input");
					ops.set(array, idx, hydrate(value[i + 1]));
				}
			} else {
				const array = ops.createArray(value.length);
				hydrated[index] = array;
				for (let i = 0; i < value.length; i += 1) {
					const n = value[i];
					if (n === -2) continue;
					ops.set(array, i, hydrate(n));
				}
			}
		} else {
			const object = ops.createObject();
			hydrated[index] = object;
			for (const key of Object.keys(value)) {
				if (key === "__proto__") throw new Error("Cannot parse an object with a `__proto__` property");
				ops.set(object, key, hydrate(value[key]));
			}
		}
		return hydrated[index];
	}
	return hydrate(0);
}
//#endregion
//#region node_modules/.pnpm/devalue@5.9.1/node_modules/devalue/src/stringify.js
/**
* Turn a value into a JSON string that can be parsed with `devalue.parse`
* @param {any} value
* @param {Record<string, (value: any) => any>} [reducers]
* @param {import('./types.js').StringifyOptions} [options]
*/
function stringify$2(value, reducers, options) {
	const stringified = run(false, value, reducers, options);
	return typeof stringified === "string" ? stringified : `[${stringified.join(",")}]`;
}
/**
* @param {boolean} async
* @param {any} value
* @param {Record<string, (value: any) => any>} [reducers]
* @param {import('./types.js').StringifyOptions} [options]
*/
function run(async, value, reducers, options) {
	const ops = merge_operations(default_stringify_operations, options?.operations);
	/** @type {any[]} */
	const stringified = [];
	/** @type {Map<any, number>} */
	const indexes = /* @__PURE__ */ new Map();
	/** @type {Array<{ key: string, fn: (value: any) => any }>} */
	const custom = [];
	if (reducers) for (const key of Object.getOwnPropertyNames(reducers)) custom.push({
		key,
		fn: reducers[key]
	});
	/** @type {string[]} */
	const keys = [];
	let p = 0;
	/**
	* @param {any} thing
	* @param {number} [index]
	*/
	function flatten(thing, index) {
		const type = ops.typeOf(thing);
		if (type === "undefined") return -1;
		/** @type {number | undefined} */
		let number;
		if (type === "number") {
			number = ops.toPrimitive(thing);
			if (Number.isNaN(number)) return -3;
			if (number === Infinity) return -4;
			if (number === -Infinity) return -5;
			if (number === 0 && 1 / number < 0) return -6;
		}
		const id = ops.identify(thing);
		if (indexes.has(id)) return indexes.get(id);
		index ??= p++;
		indexes.set(id, index);
		for (const { key, fn } of custom) {
			const value = fn(thing);
			if (value) {
				stringified[index] = `["${key}",${flatten(value)}]`;
				return index;
			}
		}
		if (type === "function") throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
		else if (type === "symbol") throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
		/** @type {string | Promise<any>} */
		let str = "";
		if (type !== "object") str = stringify_primitive(type === "number" ? number : ops.toPrimitive(thing));
		else if (ops.isThenable(thing)) {
			if (!async) throw new DevalueError(`Cannot stringify a Promise or thenable — use stringifyAsync instead`, keys, thing, value);
			str = ops.toPromise(thing).then((value) => {
				const i = flatten(value, index);
				if (i < 0) stringified[index] = i;
			});
		} else {
			const tag = ops.tagOf(thing);
			switch (tag) {
				case "Number":
				case "String":
				case "Boolean":
				case "BigInt":
					str = `["Object",${flatten(ops.unbox(thing))}]`;
					break;
				case "Date":
					str = `["Date","${ops.toISOString(thing)}"]`;
					break;
				case "URL":
					str = `["URL",${stringify_string(ops.toStringValue(thing))}]`;
					break;
				case "URLSearchParams":
					str = `["URLSearchParams",${stringify_string(ops.toStringValue(thing))}]`;
					break;
				case "RegExp":
					const { source, flags } = ops.regExpInfo(thing);
					str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
					break;
				case "Array": {
					let mostly_dense = false;
					const length = ops.lengthOf(thing);
					str = "[";
					for (let i = 0; i < length; i += 1) {
						if (i > 0) str += ",";
						if (ops.hasOwn(thing, i)) {
							keys.push(`[${i}]`);
							str += flatten(ops.get(thing, i));
							keys.pop();
						} else if (mostly_dense) str += -2;
						else {
							const populated_keys = ops.indicesOf(thing);
							const population = populated_keys.length;
							const d = String(length).length;
							if ((length - population) * 3 > 4 + d + population * (d + 1)) {
								str = "[-7," + length;
								for (let j = 0; j < populated_keys.length; j++) {
									const key = populated_keys[j];
									keys.push(`[${key}]`);
									str += "," + key + "," + flatten(ops.get(thing, key));
									keys.pop();
								}
								break;
							} else {
								mostly_dense = true;
								str += -2;
							}
						}
					}
					str += "]";
					break;
				}
				case "Set":
					str = "[\"Set\"";
					for (const value of ops.valuesOf(thing)) str += `,${flatten(value)}`;
					str += "]";
					break;
				case "Map":
					str = "[\"Map\"";
					for (const [key, value] of ops.entriesOf(thing)) {
						const key_type = ops.typeOf(key);
						const key_is_primitive = key_type !== "object" && key_type !== "function" && key_type !== "symbol";
						keys.push(`.get(${key_is_primitive ? stringify_primitive(ops.toPrimitive(key)) : "..."})`);
						str += `,${flatten(key)},${flatten(value)}`;
						keys.pop();
					}
					str += "]";
					break;
				case "Int8Array":
				case "Uint8Array":
				case "Uint8ClampedArray":
				case "Int16Array":
				case "Uint16Array":
				case "Float16Array":
				case "Int32Array":
				case "Uint32Array":
				case "Float32Array":
				case "Float64Array":
				case "BigInt64Array":
				case "BigUint64Array": {
					const info = ops.viewInfo(thing);
					str = "[\"" + tag + "\"," + flatten(info.buffer);
					if (info.byteLength !== info.bufferByteLength) str += `,${info.byteOffset},${info.length}`;
					str += "]";
					break;
				}
				case "DataView": {
					const info = ops.viewInfo(thing);
					str = "[\"" + tag + "\"," + flatten(info.buffer);
					if (info.byteLength !== info.bufferByteLength) str += `,${info.byteOffset},${info.byteLength}`;
					str += "]";
					break;
				}
				case "ArrayBuffer":
					str = `["ArrayBuffer","${encode64(ops.toArrayBuffer(thing))}"]`;
					break;
				case "Temporal.Duration":
				case "Temporal.Instant":
				case "Temporal.PlainDate":
				case "Temporal.PlainTime":
				case "Temporal.PlainDateTime":
				case "Temporal.PlainMonthDay":
				case "Temporal.PlainYearMonth":
				case "Temporal.ZonedDateTime":
					str = `["${tag}",${stringify_string(ops.toStringValue(thing))}]`;
					break;
				default: {
					const shape = ops.shapeOf(thing);
					if (shape.kind === "not-plain") throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
					if (shape.kind === "symbol-keys") throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
					if (shape.kind === "null-proto") {
						str = "[\"null\"";
						for (const key of shape.keys) {
							if (key === "__proto__") throw new DevalueError(`Cannot stringify objects with __proto__ keys`, keys, thing, value);
							keys.push(stringify_key(key));
							str += `,${stringify_string(key)},${flatten(ops.get(thing, key))}`;
							keys.pop();
						}
						str += "]";
					} else {
						str = "{";
						let started = false;
						for (const key of shape.keys) {
							if (key === "__proto__") throw new DevalueError(`Cannot stringify objects with __proto__ keys`, keys, thing, value);
							if (started) str += ",";
							started = true;
							keys.push(stringify_key(key));
							str += `${stringify_string(key)}:${flatten(ops.get(thing, key))}`;
							keys.pop();
						}
						str += "}";
					}
				}
			}
		}
		stringified[index] = str;
		return index;
	}
	const index = flatten(value);
	if (index < 0) return `${index}`;
	return stringified;
}
/**
* @param {any} thing
* @returns {string}
*/
function stringify_primitive(thing) {
	const type = typeof thing;
	if (type === "string") return stringify_string(thing);
	if (thing === void 0) return (-1).toString();
	if (thing === 0 && 1 / thing < 0) return (-6).toString();
	if (type === "bigint") return `["BigInt","${thing}"]`;
	return String(thing);
}
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, {})?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
//#endregion
//#region node_modules/.pnpm/@astrojs+internal-helpers@0.10.4/node_modules/@astrojs/internal-helpers/dist/object.js
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/actions/load.js
var actionsMemo = createAsyncManifestMemo(async (manifest) => manifest.actions ? await manifest.actions() : NOOP_ACTIONS_MOD);
function getActions(manifest) {
	return actionsMemo.get(manifest);
}
async function getAction(manifest, path) {
	const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
	let { server } = await getActions(manifest);
	if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
	for (const key of pathKeys) {
		if (typeof server === "function") throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (!Object.hasOwn(server, key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		server = server[key];
	}
	if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
	return server;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/actions/runtime/server.js
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const { manifest } = getFetchStateFromAPIContext(context);
			const callerInfoName = shouldAppendForwardSlash(manifest.trailingSlash, manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await getAction(manifest, callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": void 0,
			"SSR": true
		}, {})?.DEV) actionResultErrorStack.set(res.error.stack);
		let body2;
		if (res.error instanceof ActionInputError) body2 = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body2 = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body2)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify$2(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		const content = await renderSlotToString(result, this.#slots[name]);
		return chunkToString(result, content);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/i18n/fallback.js
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy, base } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const urlLocale = pathname.split("/").find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
		if (pathname.includes(`${base}`)) newPathname = pathname.replace(`/${urlLocale}`, ``);
		else newPathname = pathname.replace(`/${urlLocale}`, `/`);
	} else newPathname = pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/i18n/router.js
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		if (pathname.includes("/404") || pathname.includes("/500")) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/i18n/handler.js
function compileI18n(i18n, base, trailingSlash, format) {
	return {
		config: i18n,
		base,
		trailingSlash,
		format,
		router: new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		})
	};
}
var i18nMemo = createManifestMemo((manifest) => {
	const config = manifest.i18n;
	return config && config.strategy !== "manual" ? compileI18n(config, manifest.base, manifest.trailingSlash, manifest.buildFormat) : null;
});
function getI18n(manifest) {
	return i18nMemo.get(manifest);
}
async function finalizeI18n(compiled, state, response) {
	markFeatureUsed(state.manifest, FetchFeatures.i18n);
	const i18n = compiled.config;
	if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
	if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
	const url = state.url;
	const currentLocale = state.computeCurrentLocale();
	const isPrerendered = state.routeData.prerender;
	const routerContext = {
		currentLocale,
		currentDomain: url.hostname,
		routeType: state.responseRouteType,
		isReroute: false
	};
	const routeDecision = compiled.router.match(url.pathname, routerContext);
	switch (routeDecision.type) {
		case "redirect": {
			let location = routeDecision.location;
			if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
			return new Response(null, {
				status: routeDecision.status ?? 302,
				headers: { Location: location }
			});
		}
		case "notFound": {
			if (isPrerendered) {
				const prerenderedRes = new Response(response.body, {
					status: 404,
					headers: response.headers
				});
				state.skipErrorReroute = true;
				if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
				return prerenderedRes;
			}
			const headers = new Headers();
			if (routeDecision.location) headers.set("Location", routeDecision.location);
			return new Response(null, {
				status: 404,
				headers
			});
		}
	}
	if (i18n.fallback && i18n.fallbackType) {
		const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
		const fallbackDecision = computeFallbackRoute({
			pathname: url.pathname,
			responseStatus: effectiveStatus,
			currentLocale,
			fallback: i18n.fallback,
			fallbackType: i18n.fallbackType,
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			strategy: i18n.strategy,
			base: compiled.base
		});
		switch (fallbackDecision.type) {
			case "redirect": return new Response(null, {
				status: 302,
				headers: { Location: fallbackDecision.pathname + url.search }
			});
			case "rewrite": return await state.rewrite(fallbackDecision.pathname + url.search);
		}
	}
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/i18n/index.js
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/i18n/utils.js
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		if (a.qualityValue && b.qualityValue) return Math.sign(b.qualityValue - a.qualityValue);
		return 0;
	});
}
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (code === browserLocale.locale) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/prepare-response.js
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/origin-check.js
var FORM_CONTENT_TYPES = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
];
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	const isSameOrigin = request.headers.get("origin") === url.origin;
	if (request.headers.has("content-type")) return hasFormLikeHeader(request.headers.get("content-type")) && !isSameOrigin;
	return !isSameOrigin;
}
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
function hasFormLikeHeader(contentType) {
	if (contentType) {
		for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) return true;
	}
	return false;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
async function handlePages(state, ctx) {
	const { logger, streaming } = state;
	state.resetResponseMetadata();
	let response;
	const componentInstance = await state.loadComponentInstance();
	switch (state.routeData.type) {
		case "endpoint":
			response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
			break;
		case "page": {
			const props = await state.getProps();
			const actionApiContext = state.getActionAPIContext();
			const result = await state.createResult(componentInstance, actionApiContext);
			try {
				response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
			} catch (e) {
				result.cancelled = true;
				throw e;
			}
			state.responseRouteType = "page";
			if (state.routeData.route === "/404" || state.routeData.route === "/500") state.skipErrorReroute = true;
			break;
		}
		case "redirect": return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		case "fallback":
			state.responseRouteType = "fallback";
			return new Response(null, { status: 500 });
	}
	const responseCookies = getCookiesFromResponse(response);
	if (responseCookies) state.cookies.merge(responseCookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/match.js
function matchRoute$1(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => route.route === "/404")) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/priority.js
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/router.js
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash(base);
}
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/route-table.js
function compileRouteTable(manifest, routes) {
	const routesList = ensure404Route({ routes });
	const router = new Router(routesList.routes, {
		base: manifest.base,
		trailingSlash: manifest.trailingSlash,
		buildFormat: manifest.buildFormat
	});
	return {
		routes: routesList.routes,
		router
	};
}
var routeTables = createManifestMemo((manifest) => compileRouteTable(manifest, (manifest.routes ?? []).map((route) => route.routeData)));
function getRouteTable(manifest) {
	return routeTables.get(manifest);
}
function updateRouteTable(manifest, routes) {
	routeTables.set(manifest, compileRouteTable(manifest, [...routes]));
}
function matchRoute(manifest, pathname) {
	const match = getRouteTable(manifest).router.match(pathname, { allowWithoutBase: true });
	if (match.type !== "match") return void 0;
	return match.route;
}
function matchAllRoutes(manifest, pathname) {
	return getRouteTable(manifest).router.matchAll(pathname, { allowWithoutBase: true });
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/session/driver.js
var sessionDriverMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.sessionDriver) return (await manifest.sessionDriver())?.default || null;
	return null;
});
function getSessionDriver(manifest) {
	return sessionDriverMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/unstorage@1.17.5_@netlify+blobs@10.7.13_supports-color@7.2.0_/node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs
function wrapToPromise(value) {
	if (!value || typeof value.then !== "function") return Promise.resolve(value);
	return value;
}
function asyncCall(function_, ...arguments_) {
	try {
		return wrapToPromise(function_(...arguments_));
	} catch (error) {
		return Promise.reject(error);
	}
}
function isPrimitive(value) {
	const type = typeof value;
	return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
	const proto = Object.getPrototypeOf(value);
	return !proto || proto.isPrototypeOf(Object);
}
function stringify$1(value) {
	if (isPrimitive(value)) return String(value);
	if (isPureObject(value) || Array.isArray(value)) return JSON.stringify(value);
	if (typeof value.toJSON === "function") return stringify$1(value.toJSON());
	throw new Error("[unstorage] Cannot stringify value!");
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
	if (typeof value === "string") return value;
	return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
	if (typeof value !== "string") return value;
	if (!value.startsWith(BASE64_PREFIX)) return value;
	return base64Decode(value.slice(7));
}
function base64Decode(input) {
	if (globalThis.Buffer) return Buffer.from(input, "base64");
	return Uint8Array.from(globalThis.atob(input), (c) => c.codePointAt(0));
}
function base64Encode(input) {
	if (globalThis.Buffer) return Buffer.from(input).toString("base64");
	return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
	if (!key) return "";
	return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
	return normalizeKey(keys.join(":"));
}
function normalizeBaseKey(base) {
	base = normalizeKey(base);
	return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
	if (depth === void 0) return true;
	let substrCount = 0;
	let index = key.indexOf(":");
	while (index > -1) {
		substrCount++;
		index = key.indexOf(":", index + 1);
	}
	return substrCount <= depth;
}
function filterKeyByBase(key, base) {
	if (base) return key.startsWith(base) && key[key.length - 1] !== "$";
	return key[key.length - 1] !== "$";
}
//#endregion
//#region node_modules/.pnpm/unstorage@1.17.5_@netlify+blobs@10.7.13_supports-color@7.2.0_/node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
	return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
	const data = /* @__PURE__ */ new Map();
	return {
		name: DRIVER_NAME,
		getInstance: () => data,
		hasItem(key) {
			return data.has(key);
		},
		getItem(key) {
			return data.get(key) ?? null;
		},
		getItemRaw(key) {
			return data.get(key) ?? null;
		},
		setItem(key, value) {
			data.set(key, value);
		},
		setItemRaw(key, value) {
			data.set(key, value);
		},
		removeItem(key) {
			data.delete(key);
		},
		getKeys() {
			return [...data.keys()];
		},
		clear() {
			data.clear();
		},
		dispose() {
			data.clear();
		}
	};
});
function createStorage(options = {}) {
	const context = {
		mounts: { "": options.driver || memory() },
		mountpoints: [""],
		watching: false,
		watchListeners: [],
		unwatch: {}
	};
	const getMount = (key) => {
		for (const base of context.mountpoints) if (key.startsWith(base)) return {
			base,
			relativeKey: key.slice(base.length),
			driver: context.mounts[base]
		};
		return {
			base: "",
			relativeKey: key,
			driver: context.mounts[""]
		};
	};
	const getMounts = (base, includeParent) => {
		return context.mountpoints.filter((mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)).map((mountpoint) => ({
			relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
			mountpoint,
			driver: context.mounts[mountpoint]
		}));
	};
	const onChange = (event, key) => {
		if (!context.watching) return;
		key = normalizeKey(key);
		for (const listener of context.watchListeners) listener(event, key);
	};
	const startWatch = async () => {
		if (context.watching) return;
		context.watching = true;
		for (const mountpoint in context.mounts) context.unwatch[mountpoint] = await watch$1(context.mounts[mountpoint], onChange, mountpoint);
	};
	const stopWatch = async () => {
		if (!context.watching) return;
		for (const mountpoint in context.unwatch) await context.unwatch[mountpoint]();
		context.unwatch = {};
		context.watching = false;
	};
	const runBatch = (items, commonOptions, cb) => {
		const batches = /* @__PURE__ */ new Map();
		const getBatch = (mount) => {
			let batch = batches.get(mount.base);
			if (!batch) {
				batch = {
					driver: mount.driver,
					base: mount.base,
					items: []
				};
				batches.set(mount.base, batch);
			}
			return batch;
		};
		for (const item of items) {
			const isStringItem = typeof item === "string";
			const key = normalizeKey(isStringItem ? item : item.key);
			const value = isStringItem ? void 0 : item.value;
			const options2 = isStringItem || !item.options ? commonOptions : {
				...commonOptions,
				...item.options
			};
			const mount = getMount(key);
			getBatch(mount).items.push({
				key,
				value,
				relativeKey: mount.relativeKey,
				options: options2
			});
		}
		return Promise.all([...batches.values()].map((batch) => cb(batch))).then((r) => r.flat());
	};
	const storage = {
		hasItem(key, opts = {}) {
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			return asyncCall(driver.hasItem, relativeKey, opts);
		},
		getItem(key, opts = {}) {
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			return asyncCall(driver.getItem, relativeKey, opts).then((value) => destr(value));
		},
		getItems(items, commonOptions = {}) {
			return runBatch(items, commonOptions, (batch) => {
				if (batch.driver.getItems) return asyncCall(batch.driver.getItems, batch.items.map((item) => ({
					key: item.relativeKey,
					options: item.options
				})), commonOptions).then((r) => r.map((item) => ({
					key: joinKeys(batch.base, item.key),
					value: destr(item.value)
				})));
				return Promise.all(batch.items.map((item) => {
					return asyncCall(batch.driver.getItem, item.relativeKey, item.options).then((value) => ({
						key: item.key,
						value: destr(value)
					}));
				}));
			});
		},
		getItemRaw(key, opts = {}) {
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (driver.getItemRaw) return asyncCall(driver.getItemRaw, relativeKey, opts);
			return asyncCall(driver.getItem, relativeKey, opts).then((value) => deserializeRaw(value));
		},
		async setItem(key, value, opts = {}) {
			if (value === void 0) return storage.removeItem(key);
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (!driver.setItem) return;
			await asyncCall(driver.setItem, relativeKey, stringify$1(value), opts);
			if (!driver.watch) onChange("update", key);
		},
		async setItems(items, commonOptions) {
			await runBatch(items, commonOptions, async (batch) => {
				if (batch.driver.setItems) return asyncCall(batch.driver.setItems, batch.items.map((item) => ({
					key: item.relativeKey,
					value: stringify$1(item.value),
					options: item.options
				})), commonOptions);
				if (!batch.driver.setItem) return;
				await Promise.all(batch.items.map((item) => {
					return asyncCall(batch.driver.setItem, item.relativeKey, stringify$1(item.value), item.options);
				}));
			});
		},
		async setItemRaw(key, value, opts = {}) {
			if (value === void 0) return storage.removeItem(key, opts);
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (driver.setItemRaw) await asyncCall(driver.setItemRaw, relativeKey, value, opts);
			else if (driver.setItem) await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
			else return;
			if (!driver.watch) onChange("update", key);
		},
		async removeItem(key, opts = {}) {
			if (typeof opts === "boolean") opts = { removeMeta: opts };
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (!driver.removeItem) return;
			await asyncCall(driver.removeItem, relativeKey, opts);
			if (opts.removeMeta || opts.removeMata) await asyncCall(driver.removeItem, relativeKey + "$", opts);
			if (!driver.watch) onChange("remove", key);
		},
		async getMeta(key, opts = {}) {
			if (typeof opts === "boolean") opts = { nativeOnly: opts };
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			const meta = /* @__PURE__ */ Object.create(null);
			if (driver.getMeta) Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
			if (!opts.nativeOnly) {
				const value = await asyncCall(driver.getItem, relativeKey + "$", opts).then((value_) => destr(value_));
				if (value && typeof value === "object") {
					if (typeof value.atime === "string") value.atime = new Date(value.atime);
					if (typeof value.mtime === "string") value.mtime = new Date(value.mtime);
					Object.assign(meta, value);
				}
			}
			return meta;
		},
		setMeta(key, value, opts = {}) {
			return this.setItem(key + "$", value, opts);
		},
		removeMeta(key, opts = {}) {
			return this.removeItem(key + "$", opts);
		},
		async getKeys(base, opts = {}) {
			base = normalizeBaseKey(base);
			const mounts = getMounts(base, true);
			let maskedMounts = [];
			const allKeys = [];
			let allMountsSupportMaxDepth = true;
			for (const mount of mounts) {
				if (!mount.driver.flags?.maxDepth) allMountsSupportMaxDepth = false;
				const rawKeys = await asyncCall(mount.driver.getKeys, mount.relativeBase, opts);
				for (const key of rawKeys) {
					const fullKey = mount.mountpoint + normalizeKey(key);
					if (!maskedMounts.some((p) => fullKey.startsWith(p))) allKeys.push(fullKey);
				}
				maskedMounts = [mount.mountpoint, ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))];
			}
			const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
			return allKeys.filter((key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base));
		},
		async clear(base, opts = {}) {
			base = normalizeBaseKey(base);
			await Promise.all(getMounts(base, false).map(async (m) => {
				if (m.driver.clear) return asyncCall(m.driver.clear, m.relativeBase, opts);
				if (m.driver.removeItem) {
					const keys = await m.driver.getKeys(m.relativeBase || "", opts);
					return Promise.all(keys.map((key) => m.driver.removeItem(key, opts)));
				}
			}));
		},
		async dispose() {
			await Promise.all(Object.values(context.mounts).map((driver) => dispose(driver)));
		},
		async watch(callback) {
			await startWatch();
			context.watchListeners.push(callback);
			return async () => {
				context.watchListeners = context.watchListeners.filter((listener) => listener !== callback);
				if (context.watchListeners.length === 0) await stopWatch();
			};
		},
		async unwatch() {
			context.watchListeners = [];
			await stopWatch();
		},
		mount(base, driver) {
			base = normalizeBaseKey(base);
			if (base && context.mounts[base]) throw new Error(`already mounted at ${base}`);
			if (base) {
				context.mountpoints.push(base);
				context.mountpoints.sort((a, b) => b.length - a.length);
			}
			context.mounts[base] = driver;
			if (context.watching) Promise.resolve(watch$1(driver, onChange, base)).then((unwatcher) => {
				context.unwatch[base] = unwatcher;
			}).catch(console.error);
			return storage;
		},
		async unmount(base, _dispose = true) {
			base = normalizeBaseKey(base);
			if (!base || !context.mounts[base]) return;
			if (context.watching && base in context.unwatch) {
				context.unwatch[base]?.();
				delete context.unwatch[base];
			}
			if (_dispose) await dispose(context.mounts[base]);
			context.mountpoints = context.mountpoints.filter((key) => key !== base);
			delete context.mounts[base];
		},
		getMount(key = "") {
			key = normalizeKey(key) + ":";
			const m = getMount(key);
			return {
				driver: m.driver,
				base: m.base
			};
		},
		getMounts(base = "", opts = {}) {
			base = normalizeKey(base);
			return getMounts(base, opts.parents).map((m) => ({
				driver: m.driver,
				base: m.mountpoint
			}));
		},
		keys: (base, opts = {}) => storage.getKeys(base, opts),
		get: (key, opts = {}) => storage.getItem(key, opts),
		set: (key, value, opts = {}) => storage.setItem(key, value, opts),
		has: (key, opts = {}) => storage.hasItem(key, opts),
		del: (key, opts = {}) => storage.removeItem(key, opts),
		remove: (key, opts = {}) => storage.removeItem(key, opts)
	};
	return storage;
}
function watch$1(driver, onChange, base) {
	return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {};
}
async function dispose(driver) {
	if (typeof driver.dispose === "function") await asyncCall(driver.dispose);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var unflatten = (parsed, _) => {
	return unflatten$1(parsed, { URL: (href) => new URL(href) });
};
var stringify = (data, _) => {
	return stringify$2(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#logger;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage, logger }) {
		this.#logger = logger;
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten(JSON.parse(stringify(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const sessionId = this.#sessionID ?? this.#cookies.get(this.#cookieName)?.value;
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			this.#logger.error("session", `Failed to load session data during regeneration: ${err}`);
			this.#partial = false;
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			this.#logger.error("session", `Failed to remove old session ${oldSessionId}: ${err}`);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key2) => data.delete(key2));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				this.#logger.error("session", `Failed to remove session ${sessionId}: ${err}`);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten(raw);
			if (!(storedMap instanceof Map)) {
				this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
function provideSession(state) {
	markFeatureUsed(state.manifest, FetchFeatures.sessions);
	const config = state.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const driverFactory = await getSessionDriver(state.manifest);
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			const cookies = state.cookies;
			return new AstroSession({
				cookies,
				config,
				runtimeMode: getEnvironment(state.manifest).runtimeMode,
				driverFactory,
				mockStorage: null,
				logger: state.logger
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/validate-headers.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
function parseHost(host) {
	const parts = host.split(":");
	if (parts.length > 2) return void 0;
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const parsed = parseHost(sanitized);
	if (!parsed) return void 0;
	const { hostname, port } = parsed;
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		const parsed = sanitized ? parseHost(sanitized) : void 0;
		if (sanitized && parsed) {
			const { hostname, port: portFromHost } = parsed;
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/output-filename.js
var STATUS_CODE_PAGES = /* @__PURE__ */ new Set(["/404", "/500"]);
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/errors/default-handler.js
async function renderDefaultError(manifest, request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const routeTable = getRouteTable(manifest);
	const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest.i18n?.locales, manifest.trailingSlash === "always"), routeTable);
	const url = new URL(request.url);
	if (errorRouteData) {
		if (errorRouteData.prerender) {
			const allowedDomains = manifest.allowedDomains;
			const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
			const statusURL = new URL(`${removeTrailingForwardSlash(manifest.base)}${getOutputFilename(manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
			if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
				const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
					status,
					removeContentEncodingHeaders: true
				});
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				const response2 = mergeResponses(new Response(null, { status }), originalResponse);
				prepareResponse(response2, resolvedRenderOptions);
				return response2;
			}
		}
		const mod = await getEnvironment(manifest).getComponentByRoute(manifest, errorRouteData);
		const errorState = new FetchState(manifest, request);
		errorState.skipMiddleware = skipMiddleware;
		errorState.clientAddress = resolvedRenderOptions.clientAddress;
		errorState.routeData = errorRouteData;
		errorState.pathname = resolvedPathname;
		errorState.status = status;
		errorState.componentInstance = mod;
		errorState.locals = resolvedRenderOptions.locals ?? {};
		errorState.initialProps = { error };
		try {
			await provideSession(errorState);
			const response2 = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response2)) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
			const newResponse = mergeResponses(response2, originalResponse);
			prepareResponse(newResponse, resolvedRenderOptions);
			return newResponse;
		} catch {
			if (skipMiddleware === false) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
		} finally {
			await errorState.finalizeAll();
		}
	}
	const response = mergeResponses(new Response(null, { status }), originalResponse);
	prepareResponse(response, resolvedRenderOptions);
	return response;
}
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/errors/build-handler.js
async function renderBuildError(manifest, request, options) {
	if (options.status === 500) {
		if (options.response) return options.response;
		throw options.error;
	}
	return renderDefaultError(manifest, request, {
		...options,
		prerenderedErrorPageFetch: void 0
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/errors/dev-handler.js
async function renderDevError(manifest, request, { skipMiddleware = false, error, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
	if (isAstroError(error) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error.name)) throw error;
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const renderRoute = async (routeData) => {
		try {
			const preloadedComponent = await getEnvironment(manifest).getComponentByRoute(manifest, routeData);
			const errorState = new FetchState(manifest, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest.csp : false;
			errorState.routeData = routeData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = preloadedComponent;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				skipMiddleware: true,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			if (error) getLogger(manifest).error("router", error.stack || error.message);
			return response;
		} catch (_err) {
			if (skipMiddleware === false) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status: 500,
				skipMiddleware: true,
				error: _err,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			throw _err;
		}
	};
	if (status === 404) {
		const custom404 = getCustom404Route(getRouteTable(manifest));
		if (custom404) return renderRoute(custom404);
	}
	const custom500 = getCustom500Route(getRouteTable(manifest));
	if (!custom500) throw error;
	else return renderRoute(custom500);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/errors/handler.js
function renderErrorPage(manifest, request, options) {
	const env = getEnvironment(manifest);
	switch (env.errorStrategy) {
		case "dev": return renderDevError(manifest, request, options, { shouldInjectCspMetaTags: env.injectCspMetaTagsOnErrorPages });
		case "build": return renderBuildError(manifest, request, options);
		case "default": return renderDefaultError(manifest, request, options);
	}
}
function renderErrorFromState(state, request, options) {
	if (state.renderError) return state.renderError(request, options);
	return renderErrorPage(state.manifest, request, options);
}
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/middleware/callMiddleware.js
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) {
			if (typeof value !== "undefined") {
				if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
				return value;
			} else if (responseFunctionPromise) return responseFunctionPromise;
			else throw new AstroError(MiddlewareNotAResponse);
		} else if (typeof value === "undefined") throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/middleware/load.js
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest) => {
	let handler;
	if (manifest.middleware) {
		const internalMiddlewares = [(await manifest.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
		if (manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
		handler = sequence(...internalMiddlewares);
	} else handler = NOOP_MIDDLEWARE_FN;
	resolvedMiddleware.set(manifest, handler);
	return handler;
});
function getMiddleware(manifest) {
	return middlewareMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cache/runtime/noop.js
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/middleware/astro-middleware.js
async function handleMiddleware(state, renderRouteCallback) {
	markFeatureUsed(state.manifest, FetchFeatures.middleware);
	await state.getProps();
	const apiContext = state.getAPIContext();
	state.counter++;
	if (state.counter === 4) return new Response("Loop Detected", {
		status: 508,
		statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
	});
	const next = async (ctx, payload) => {
		if (payload) {
			state.logger.debug("router", "Called rewriting to:", payload);
			applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
		}
		return renderRouteCallback(state, ctx);
	};
	let response;
	if (state.skipMiddleware) response = await next(apiContext);
	else {
		const middleware = await getMiddleware(state.manifest);
		response = await callMiddleware(sequence(middleware), apiContext, next);
	}
	attachCookiesToResponse(response, state.cookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/util/normalized-url.js
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
function normalizeUrl(url) {
	try {
		url.pathname = validateAndDecodePathname(url.pathname);
	} catch {
		try {
			url.pathname = decodeURI(url.pathname);
		} catch {}
	}
	url.pathname = collapseDuplicateSlashes(url.pathname);
	return url;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/rewrites/handler.js
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
	state.invalidateContexts();
}
async function executeRewrite(state, payload) {
	state.logger.debug("router", "Calling rewrite: ", payload);
	applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
	return handleMiddleware(state, handlePages);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/render-options.js
var renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/manifest/derived.js
var sites = createManifestMemo((manifest) => manifest.site ? new URL(manifest.site) : void 0);
function getSite(manifest) {
	return sites.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/server-islands/mappings.js
async function getServerIslands(manifest) {
	if (manifest.serverIslandMappings) return manifest.serverIslandMappings();
	return {
		serverIslandMap: /* @__PURE__ */ new Map(),
		serverIslandNameMap: /* @__PURE__ */ new Map()
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/fetch/fetch-state.js
function getFetchStateFromAPIContext(context) {
	const state = context[fetchStateSymbol];
	if (!state) throw new Error("FetchState not found on APIContext. This is an internal error — the context was not created through Astro's request pipeline.");
	return state;
}
var FetchState = class {
	/** The manifest — the single ambient source of static, build-time data. */
	manifest;
	/** The manifest's identity-stable logger, captured once at construction. */
	logger;
	/**
	* Whether page renders stream. From the facade hooks on the fast path,
	* else the environment's default.
	*/
	streaming;
	/**
	* Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
	* bare and custom-handler paths — those fall through to the environment's
	* error strategy (`renderErrorPage`).
	*/
	renderError;
	/**
	* Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
	* on bare and custom-handler paths — those fall through to the
	* environment's `logRequest` behavior.
	*/
	logRequest;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `handleRequest` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `handleRequest` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	*/
	status = 200;
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(manifest, request, options, hooks) {
		this.manifest = manifest;
		this.logger = getLogger(manifest);
		this.streaming = hooks?.streaming ?? getEnvironment(manifest).defaultStreaming(manifest);
		this.renderError = hooks?.renderError;
		this.logRequest = hooks?.logRequest;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		url.pathname = publicPathname;
		url.pathname = collapseDuplicateSlashes(url.pathname);
		const domainPathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, this.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request);
		if (manifest.allowedDomains && manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest.trailingSlash, manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the rewrites handler module.
	*/
	rewrite(payload) {
		return executeRewrite(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const manifest = this.manifest;
		const env = getEnvironment(manifest);
		const { clientDirectives, inlinedScripts, compressHTML } = manifest;
		const renderers = env.getRenderers(manifest);
		const resolve = (specifier) => env.resolve(manifest, specifier);
		const routeData = this.routeData;
		const { links, scripts, styles } = await env.headElements(manifest, routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await env.componentMetadata(manifest, routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await getServerIslands(manifest)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			speculationRulesContent: manifest.csp?.speculationRulesContent,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const astroComponentPartial = {
			props,
			self: null
		};
		const Astro = Object.assign(Object.create(astroPagePartial), astroComponentPartial);
		let _slots;
		Object.defineProperty(Astro, "slots", { get: () => {
			if (!_slots) _slots = new Slots(result, slotValues, this.logger);
			return _slots;
		} });
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, logger, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: getSite(this.manifest),
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						logger.info(null, msg);
					},
					warn(msg) {
						logger.warn(null, msg);
					},
					error(msg) {
						logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (this.manifest.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(this.manifest.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		if (!this.manifest.csp) {
			if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${s.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, manifest: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
			this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
			if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
		}
	}
	#resolveRouteData() {
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = matchRoute(this.manifest, this.pathname);
		if (matched && matched.prerender && this.manifest.serverLike) {
			if (matched.params.length > 0) {
				const allMatches = matchAllRoutes(this.manifest, this.pathname);
				this.routeData = allMatches.find((r) => !r.prerender);
			} else this.routeData = void 0;
		} else this.routeData = matched;
		this.logger.debug("router", "Astro matched the following route for " + this.request.url);
		this.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(getRouteTable(this.manifest));
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the manifest's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`: the router matches against this stripped path
	* while middleware reads the un-stripped `context.url.pathname`, so both must
	* strip the base identically.
	*/
	#computePathname(normalizedPathname) {
		return prependForwardSlash(stripRequestBase(normalizedPathname, this.manifest.base));
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) this.invalidEncoding = true;
			else this.logger.error(null, e.toString());
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		this.request = new Request(this.url, this.request);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: getRouteCache(this.manifest),
			pathname: this.pathname,
			logger: this.logger,
			serverLike: this.manifest.serverLike,
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: getSite(this.manifest),
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						state.logger.info(null, msg);
					},
					warn(msg) {
						state.logger.warn(null, msg);
					},
					error(msg) {
						state.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Callers must ensure `getProps()` has resolved at least once before
	* calling this.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		actionApiContext[fetchStateSymbol] = this;
		this.apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		return this.apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/actions/handler.js
function handleAction(apiContext, state) {
	markFeatureUsed(state.manifest, FetchFeatures.actions);
	if (apiContext.isPrerendered) return;
	const { action, setActionResult } = getActionContext(apiContext);
	if (!action) return;
	if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
	return executeAction(action, setActionResult);
}
async function executeAction(action, setActionResult) {
	const serialized = serializeActionResult(await action.handler());
	if (action.calledFrom === "rpc") {
		if (serialized.type === "empty") return new Response(null, { status: serialized.status });
		return new Response(serialized.body, {
			status: serialized.status,
			headers: { "Content-Type": serialized.contentType }
		});
	}
	setActionResult(action.name, serialized);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/trailing-slash-handler.js
function handleTrailingSlash(state) {
	const url = new URL(state.request.url);
	const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
	if (redirect === url.pathname) return;
	const addCookieHeader = state.renderOptions.addCookieHeader;
	const status = state.request.method === "GET" ? 301 : 308;
	const response = new Response(redirectTemplate({
		status,
		relativeLocation: url.pathname,
		absoluteLocation: redirect,
		from: state.request.url
	}), {
		status,
		headers: { location: redirect + url.search }
	});
	prepareResponse(response, { addCookieHeader });
	return response;
}
function redirectTrailingSlash(trailingSlash, pathname) {
	if (pathname === "/" || isInternalPath(pathname)) return pathname;
	const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
	if (path !== pathname) return path;
	if (trailingSlash === "ignore") return pathname;
	if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
	if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response2 = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response2.headers.delete("CDN-Cache-Control");
		response2.headers.delete("Cache-Tag");
		return response2;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") {
		if (redirectIsExternal(redirect)) return redirect;
		else {
			let target = redirect;
			for (const param of Object.keys(params)) {
				const paramValue = params[param];
				target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
			}
			return target;
		}
	} else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	markFeatureUsed(state.manifest, FetchFeatures.redirects);
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) {
		if (typeof redirect === "string") return Response.redirect(redirect, status);
		else return Response.redirect(redirect.destination, status);
	}
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/handler.js
function logRequestFromState(state, payload) {
	if (state.logRequest) state.logRequest(payload);
	else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
function actionsAndPages(state, ctx) {
	if (!state.skipMiddleware) {
		const actionResult = handleAction(ctx, state);
		if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
	}
	return handlePages(state, ctx);
}
async function handleRequest(state) {
	await getResolvedLogger(state.manifest);
	markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
	if (state.invalidEncoding) return new Response(null, {
		status: 400,
		statusText: "Bad Request"
	});
	const trailingSlashRedirect = handleTrailingSlash(state);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	if (!state.routeData) return renderErrorFromState(state, state.request, {
		...state.renderOptions,
		status: 404,
		pathname: state.pathname
	});
	return render(state);
}
async function render(state) {
	const routeData = state.routeData;
	const pathname = state.pathname;
	const request = state.request;
	const { addCookieHeader } = state.renderOptions;
	state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
	let response;
	let finalizeError;
	try {
		const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
		const cacheP = provideCache(state);
		if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
		markFeatureUsed(state.manifest, FetchFeatures.sessions);
		if (routeData.type === "redirect") {
			const redirectResponse = await renderRedirect(state);
			logRequestFromState(state, {
				pathname,
				method: request.method,
				statusCode: redirectResponse.status,
				isRewrite: false,
				timeStart: state.timeStart
			});
			prepareResponse(redirectResponse, { addCookieHeader });
			state.logger.flush();
			return redirectResponse;
		}
		const i18n = getI18n(state.manifest);
		if (!state.manifest.cacheProvider) {
			markFeatureUsed(state.manifest, FetchFeatures.cache);
			response = await handleMiddleware(state, actionsAndPages);
			if (i18n) response = await finalizeI18n(i18n, state, response);
		} else {
			const runPipeline = async () => {
				let res = await handleMiddleware(state, actionsAndPages);
				if (i18n) res = await finalizeI18n(i18n, state, res);
				return res;
			};
			response = await handleCache(state, runPipeline);
		}
		logRequestFromState(state, {
			pathname,
			method: request.method,
			statusCode: response.status,
			isRewrite: state.isRewriting,
			timeStart: state.timeStart
		});
	} catch (err) {
		state.logger.error(null, err.stack || err.message || String(err));
		return renderErrorFromState(state, request, {
			...state.renderOptions,
			status: 500,
			error: err,
			pathname: state.pathname
		});
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			finalizeError = err;
			state.logger.error(null, err.stack || err.message || String(err));
		}
	}
	if (finalizeError) return renderErrorFromState(state, request, {
		...state.renderOptions,
		status: 500,
		error: finalizeError,
		pathname: state.pathname
	});
	if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
		...state.renderOptions,
		response,
		status: response.status,
		error: response.status === 500 ? null : void 0,
		pathname: state.pathname
	});
	prepareResponse(response, { addCookieHeader });
	state.logger.flush();
	return response;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/routing/match-request.js
function safeDecodeURI(manifest, pathname) {
	try {
		return decodeURI(pathname);
	} catch (e) {
		new AstroIntegrationLogger(getLogger(manifest).options, manifest.adapterName).debug(e.toString());
		return pathname;
	}
}
function matchRequest(manifest, request, allowPrerenderedRoutes = false) {
	const url = new URL(request.url);
	if (manifest.assets.has(url.pathname)) return void 0;
	let pathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, getLogger(manifest));
	if (!pathname) pathname = prependForwardSlash(stripRequestBase(url.pathname, manifest.base));
	const routeData = matchRoute(manifest, safeDecodeURI(manifest, pathname));
	if (!routeData) return void 0;
	if (allowPrerenderedRoutes) return routeData;
	if (routeData.prerender) {
		if (routeData.params.length > 0) return matchAllRoutes(manifest, safeDecodeURI(manifest, pathname)).find((r) => !r.prerender);
		return;
	}
	return routeData;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The streaming flag passed to the constructor, surfaced through the
	* protected `resolveStreaming()` hook and fed into the internal
	* `FetchState` facade hooks on the fast path.
	*/
	#streaming;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return getLogger(this.manifest);
	}
	/**
	* Route data derived from the manifest, used for route matching. Reads and
	* writes go through the single per-manifest route table, so HMR updates are
	* visible to every consumer at once.
	*/
	get manifestData() {
		return getRouteTable(this.manifest);
	}
	set manifestData(routesList) {
		updateRouteTable(this.manifest, routesList.routes);
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.#streaming = streaming;
		getRouteTable(manifest);
		getLogger(manifest);
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Resolves the user-configured logger destination from the manifest and
	* returns the logger. Lazy and only resolves once; safe to call before
	* the first render (adapters use this to log startup messages through
	* the configured destination).
	*/
	getLogger() {
		return getResolvedLogger(this.manifest);
	}
	/**
	* The streaming flag fed into the internal `FetchState` facade hooks on
	* the fast path. Returns the constructor flag by
	* default; `BuildApp` overrides this to return `undefined` so streaming
	* falls through to the environment default (`manifest.serverLike`).
	*/
	resolveStreaming() {
		return this.#streaming;
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler used by this app. The default is a thin
	* bridge over the functional error API — strategy selection (production
	* default / dev / build) is environment-driven inside `renderErrorPage`.
	* External subclasses can override this to customize error rendering.
	*/
	createErrorHandler() {
		return { renderError: (request, options) => renderErrorPage(this.manifest, request, options) };
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		updateRouteTable(this.manifest, newManifestData.routes);
	}
	removeBase(pathname) {
		return stripRequestBase(pathname, this.manifest.base);
	}
	/**
	* Decodes a pathname with `decodeURI`, falling back to the raw pathname when it
	* contains an invalid percent-sequence (e.g. `%C0%AF`, an overlong-UTF-8 encoding of
	* `/` commonly sent by path-traversal scanners). A raw `decodeURI()` would throw
	* `URIError: URI malformed`, and because `match()` runs before `render()` that error
	* escapes the adapter's request handler as an uncaught exception (HTTP 500) that user
	* middleware can't catch.
	*/
	safeDecodeURI(pathname) {
		try {
			return decodeURI(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			return pathname;
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodeURI(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		return matchRequest(this.manifest, request, allowPrerenderedRoutes);
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await getResolvedLogger(this.manifest);
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodeURI(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
			streaming: this.resolveStreaming(),
			renderError: (req, opts) => this.renderError(req, opts),
			logRequest: (payload) => this.logThisRequest(payload)
		}));
		else {
			setRenderOptions(request, resolvedOptions);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = getUsedFeatures(this.manifest);
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & FetchFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		return getDefaultStatusCode(this.manifest, routeData, pathname);
	}
	getManifest() {
		return this.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/assets/endpoint/generic.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/analytics",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/analytics\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "analytics",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/analytics.astro",
			"pathname": "/admin/analytics",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/create",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/create\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "create",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/create.astro",
			"pathname": "/admin/create",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/createCupon",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/createCupon\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "createCupon",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/createCupon.astro",
			"pathname": "/admin/createCupon",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/dashboard",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/dashboard\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "dashboard",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/dashboard.astro",
			"pathname": "/admin/dashboard",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/redeemCoupon",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/redeemCoupon\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "redeemCoupon",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/redeemCoupon.astro",
			"pathname": "/admin/redeemCoupon",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/settings",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/settings\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "settings",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/settings.astro",
			"pathname": "/admin/settings",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/admin/reviews",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/admin\\/reviews\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reviews",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/admin/reviews.ts",
			"pathname": "/api/admin/reviews",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/badges",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/badges\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "badges",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/badges.ts",
			"pathname": "/api/auth/badges",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/favorite",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/favorite\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "favorite",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/favorite.ts",
			"pathname": "/api/auth/favorite",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/login",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/login\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "login",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/login.ts",
			"pathname": "/api/auth/login",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/logout",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/logout\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "logout",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/logout.ts",
			"pathname": "/api/auth/logout",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/me",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/me\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "me",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/me.ts",
			"pathname": "/api/auth/me",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/register",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/register\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/register.ts",
			"pathname": "/api/auth/register",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/register-restaurant",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/register-restaurant\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "register-restaurant",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/register-restaurant.ts",
			"pathname": "/api/auth/register-restaurant",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/auth/reviews",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/auth\\/reviews\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "auth",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "reviews",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/auth/reviews.ts",
			"pathname": "/api/auth/reviews",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/coupons",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/coupons\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "coupons",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/coupons.ts",
			"pathname": "/api/coupons",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/db-status",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/db-status\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "db-status",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/db-status.js",
			"pathname": "/api/db-status",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/favorites",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/favorites\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "favorites",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/favorites.ts",
			"pathname": "/api/favorites",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/get-presigned-url",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/get-presigned-url\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "get-presigned-url",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/get-presigned-url.ts",
			"pathname": "/api/get-presigned-url",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/points",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/points\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "points",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/points.ts",
			"pathname": "/api/points",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/quest",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/quest\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "quest",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/quest.ts",
			"pathname": "/api/quest",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/restaurant",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/restaurant\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "restaurant",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/restaurant.ts",
			"pathname": "/api/restaurant",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/restaurants/nearby",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/restaurants\\/nearby\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "restaurants",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "nearby",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/restaurants/nearby.ts",
			"pathname": "/api/restaurants/nearby",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/restaurants/search",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/restaurants\\/search\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "restaurants",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "search",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/restaurants/search.ts",
			"pathname": "/api/restaurants/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/restaurants/[slug]",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/restaurants\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "restaurants",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "slug",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["slug"],
			"component": "src/pages/api/restaurants/[slug].ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/reviews",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/reviews\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "reviews",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/reviews.ts",
			"pathname": "/api/reviews",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/shop",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/shop\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "shop",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/shop.ts",
			"pathname": "/api/shop",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/test-connection",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/test-connection\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "test-connection",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/test-connection.ts",
			"pathname": "/api/test-connection",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/user",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/user\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "user",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/user.ts",
			"pathname": "/api/user",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/dashboard",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/dashboard\\/?$",
			"segments": [[{
				"content": "dashboard",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/dashboard.astro",
			"pathname": "/dashboard",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/discover",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/discover\\/?$",
			"segments": [[{
				"content": "discover",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/discover.astro",
			"pathname": "/discover",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/favorites",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/favorites\\/?$",
			"segments": [[{
				"content": "favorites",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/favorites.astro",
			"pathname": "/favorites",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/login",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/login\\/?$",
			"segments": [[{
				"content": "login",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/login.astro",
			"pathname": "/login",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/profile",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/profile\\/?$",
			"segments": [[{
				"content": "profile",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/profile.astro",
			"pathname": "/profile",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/quests",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/quests\\/?$",
			"segments": [[{
				"content": "quests",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/quests.astro",
			"pathname": "/quests",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/register",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/register\\/?$",
			"segments": [[{
				"content": "register",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/register.astro",
			"pathname": "/register",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/restaurant/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/restaurant\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "restaurant",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/restaurant/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/search",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/search\\/?$",
			"segments": [[{
				"content": "search",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/search.astro",
			"pathname": "/search",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/settings",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/settings\\/?$",
			"segments": [[{
				"content": "settings",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/settings.astro",
			"pathname": "/settings",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/shop",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/shop\\/?$",
			"segments": [[{
				"content": "shop",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/shop.astro",
			"pathname": "/shop",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/test-db",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/test-db\\/?$",
			"segments": [[{
				"content": "test-db",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/test-db.astro",
			"pathname": "/test-db",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/generic_B0B5N78Z.mjs").then((n) => n.t);
var _page1 = () => import("./chunks/analytics_C92YBvLd.mjs");
var _page2 = () => import("./chunks/create_DKL4J3MP.mjs");
var _page3 = () => import("./chunks/createCupon_B1fT2aa_.mjs");
var _page4 = () => import("./chunks/dashboard_BiOdaQv1.mjs");
var _page5 = () => import("./chunks/redeemCoupon_CLRA6VZv.mjs");
var _page6 = () => import("./chunks/settings_Cl0lhzX8.mjs");
var _page7 = () => import("./chunks/reviews_fJTlaFuj.mjs");
var _page8 = () => import("./chunks/badges_DPmqU5zs.mjs");
var _page9 = () => import("./chunks/favorite_CibZfrVG.mjs");
var _page10 = () => import("./chunks/login_BH8r5NM2.mjs");
var _page11 = () => import("./chunks/logout_CTuA-uPH.mjs");
var _page12 = () => import("./chunks/me_DcX-GPyl.mjs");
var _page13 = () => import("./chunks/register_B0IHiN3n.mjs");
var _page14 = () => import("./chunks/register-restaurant_BbgS3ehv.mjs");
var _page15 = () => import("./chunks/reviews_zeYHMEOr.mjs");
var _page16 = () => import("./chunks/coupons_BmSjhu0G.mjs");
var _page17 = () => import("./chunks/db-status_DJpHshUl.mjs");
var _page18 = () => import("./chunks/favorites_fkp3qB34.mjs");
var _page19 = () => import("./chunks/get-presigned-url_JjilfkrQ.mjs");
var _page20 = () => import("./chunks/points_f_VCENqg.mjs");
var _page21 = () => import("./chunks/quest_DMvNMkbU.mjs");
var _page22 = () => import("./chunks/restaurant_Blpt-_Cj.mjs");
var _page23 = () => import("./chunks/nearby_Q6PoW1oh.mjs");
var _page24 = () => import("./chunks/search_BfdjUsSL.mjs");
var _page25 = () => import("./chunks/_slug__BYEgdXJh.mjs");
var _page26 = () => import("./chunks/reviews_Cjn_B5Xc.mjs");
var _page27 = () => import("./chunks/shop_Dl_uHHhY.mjs");
var _page28 = () => import("./chunks/test-connection_CUIYhGTY.mjs");
var _page29 = () => import("./chunks/user_BGuIBfxS.mjs");
var _page30 = () => import("./chunks/dashboard_B22DyzME.mjs");
var _page31 = () => import("./chunks/discover_CGiLGzux.mjs");
var _page32 = () => import("./chunks/favorites_Cv0FNzTB.mjs");
var _page33 = () => import("./chunks/login_Cs7BNqXL.mjs");
var _page34 = () => import("./chunks/profile_BOvRUdyh.mjs");
var _page35 = () => import("./chunks/quests_DXQy8dVH.mjs");
var _page36 = () => import("./chunks/register_sLGd9CqA.mjs");
var _page37 = () => import("./chunks/_slug__Bgn_oNi9.mjs");
var _page38 = () => import("./chunks/search_C_DGuhCW.mjs");
var _page39 = () => import("./chunks/settings_BOO781Ct.mjs");
var _page40 = () => import("./chunks/shop_Dc3tAeZe.mjs");
var _page41 = () => import("./chunks/test-db_DtJgwvfG.mjs");
var _page42 = () => import("./chunks/index_CYZTyt5E.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
	["src/pages/admin/analytics.astro", _page1],
	["src/pages/admin/create.astro", _page2],
	["src/pages/admin/createCupon.astro", _page3],
	["src/pages/admin/dashboard.astro", _page4],
	["src/pages/admin/redeemCoupon.astro", _page5],
	["src/pages/admin/settings.astro", _page6],
	["src/pages/api/admin/reviews.ts", _page7],
	["src/pages/api/auth/badges.ts", _page8],
	["src/pages/api/auth/favorite.ts", _page9],
	["src/pages/api/auth/login.ts", _page10],
	["src/pages/api/auth/logout.ts", _page11],
	["src/pages/api/auth/me.ts", _page12],
	["src/pages/api/auth/register.ts", _page13],
	["src/pages/api/auth/register-restaurant.ts", _page14],
	["src/pages/api/auth/reviews.ts", _page15],
	["src/pages/api/coupons.ts", _page16],
	["src/pages/api/db-status.js", _page17],
	["src/pages/api/favorites.ts", _page18],
	["src/pages/api/get-presigned-url.ts", _page19],
	["src/pages/api/points.ts", _page20],
	["src/pages/api/quest.ts", _page21],
	["src/pages/api/restaurant.ts", _page22],
	["src/pages/api/restaurants/nearby.ts", _page23],
	["src/pages/api/restaurants/search.ts", _page24],
	["src/pages/api/restaurants/[slug].ts", _page25],
	["src/pages/api/reviews.ts", _page26],
	["src/pages/api/shop.ts", _page27],
	["src/pages/api/test-connection.ts", _page28],
	["src/pages/api/user.ts", _page29],
	["src/pages/dashboard.astro", _page30],
	["src/pages/discover.astro", _page31],
	["src/pages/favorites.astro", _page32],
	["src/pages/login.astro", _page33],
	["src/pages/profile.astro", _page34],
	["src/pages/quests.astro", _page35],
	["src/pages/register.astro", _page36],
	["src/pages/restaurant/[slug].astro", _page37],
	["src/pages/search.astro", _page38],
	["src/pages/settings.astro", _page39],
	["src/pages/shop.astro", _page40],
	["src/pages/test-db.astro", _page41],
	["src/pages/index.astro", _page42]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///home/manuel/RateAppProject/rateappAstro/","cacheDir":"file:///home/manuel/RateAppProject/rateappAstro/node_modules/.astro/","outDir":"file:///home/manuel/RateAppProject/rateappAstro/dist/","srcDir":"file:///home/manuel/RateAppProject/rateappAstro/src/","publicDir":"file:///home/manuel/RateAppProject/rateappAstro/public/","buildClientDir":"file:///home/manuel/RateAppProject/rateappAstro/dist/","buildServerDir":"file:///home/manuel/RateAppProject/rateappAstro/.netlify/build/","adapterName":"@astrojs/netlify","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/assets/endpoint/generic.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-441cbf6c],.fade-leave-active[data-v-441cbf6c]{transition:opacity .2s}.fade-enter-from[data-v-441cbf6c],.fade-leave-to[data-v-441cbf6c]{opacity:0}.sheet-enter-active[data-v-ea5175d2],.sheet-leave-active[data-v-ea5175d2]{transition:opacity .2s}.sheet-enter-from[data-v-ea5175d2],.sheet-leave-to[data-v-ea5175d2]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/admin/analytics","isIndex":false,"type":"page","pattern":"^\\/admin\\/analytics\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"analytics","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/analytics.astro","pathname":"/admin/analytics","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/LayoutPage.Cj4SjnRD.css"}],"routeData":{"route":"/admin/create","isIndex":false,"type":"page","pattern":"^\\/admin\\/create\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/create.astro","pathname":"/admin/create","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-441cbf6c],.fade-leave-active[data-v-441cbf6c]{transition:opacity .2s}.fade-enter-from[data-v-441cbf6c],.fade-leave-to[data-v-441cbf6c]{opacity:0}.sheet-enter-active[data-v-ea5175d2],.sheet-leave-active[data-v-ea5175d2]{transition:opacity .2s}.sheet-enter-from[data-v-ea5175d2],.sheet-leave-to[data-v-ea5175d2]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/admin/createCupon","isIndex":false,"type":"page","pattern":"^\\/admin\\/createCupon\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"createCupon","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/createCupon.astro","pathname":"/admin/createCupon","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-441cbf6c],.fade-leave-active[data-v-441cbf6c]{transition:opacity .2s}.fade-enter-from[data-v-441cbf6c],.fade-leave-to[data-v-441cbf6c]{opacity:0}.sheet-enter-active[data-v-ea5175d2],.sheet-leave-active[data-v-ea5175d2]{transition:opacity .2s}.sheet-enter-from[data-v-ea5175d2],.sheet-leave-to[data-v-ea5175d2]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/admin/dashboard","isIndex":false,"type":"page","pattern":"^\\/admin\\/dashboard\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/dashboard.astro","pathname":"/admin/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-441cbf6c],.fade-leave-active[data-v-441cbf6c]{transition:opacity .2s}.fade-enter-from[data-v-441cbf6c],.fade-leave-to[data-v-441cbf6c]{opacity:0}.sheet-enter-active[data-v-ea5175d2],.sheet-leave-active[data-v-ea5175d2]{transition:opacity .2s}.sheet-enter-from[data-v-ea5175d2],.sheet-leave-to[data-v-ea5175d2]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/admin/redeemCoupon","isIndex":false,"type":"page","pattern":"^\\/admin\\/redeemCoupon\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"redeemCoupon","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/redeemCoupon.astro","pathname":"/admin/redeemCoupon","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-441cbf6c],.fade-leave-active[data-v-441cbf6c]{transition:opacity .2s}.fade-enter-from[data-v-441cbf6c],.fade-leave-to[data-v-441cbf6c]{opacity:0}.sheet-enter-active[data-v-ea5175d2],.sheet-leave-active[data-v-ea5175d2]{transition:opacity .2s}.sheet-enter-from[data-v-ea5175d2],.sheet-leave-to[data-v-ea5175d2]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/admin/settings","isIndex":false,"type":"page","pattern":"^\\/admin\\/settings\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/settings.astro","pathname":"/admin/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/reviews","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/reviews\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"reviews","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/reviews.ts","pathname":"/api/admin/reviews","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/badges","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/badges\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"badges","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/badges.ts","pathname":"/api/auth/badges","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/favorite","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/favorite\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"favorite","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/favorite.ts","pathname":"/api/auth/favorite","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/login.ts","pathname":"/api/auth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/logout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/logout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/logout.ts","pathname":"/api/auth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/me","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/me\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"me","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/me.ts","pathname":"/api/auth/me","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.ts","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register-restaurant","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register-restaurant\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register-restaurant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register-restaurant.ts","pathname":"/api/auth/register-restaurant","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/reviews","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/reviews\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"reviews","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/reviews.ts","pathname":"/api/auth/reviews","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/coupons","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/coupons\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"coupons","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/coupons.ts","pathname":"/api/coupons","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/db-status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/db-status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"db-status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/db-status.js","pathname":"/api/db-status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/favorites","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/favorites\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"favorites","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/favorites.ts","pathname":"/api/favorites","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/get-presigned-url","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-presigned-url\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-presigned-url","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-presigned-url.ts","pathname":"/api/get-presigned-url","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/points","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/points\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"points","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/points.ts","pathname":"/api/points","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/quest","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/quest\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"quest","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/quest.ts","pathname":"/api/quest","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/restaurant","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/restaurant\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"restaurant","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/restaurant.ts","pathname":"/api/restaurant","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/restaurants/nearby","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/restaurants\\/nearby\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"restaurants","dynamic":false,"spread":false}],[{"content":"nearby","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/restaurants/nearby.ts","pathname":"/api/restaurants/nearby","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/restaurants/search","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/restaurants\\/search\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"restaurants","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/restaurants/search.ts","pathname":"/api/restaurants/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/restaurants/[slug]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/restaurants\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"restaurants","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/api/restaurants/[slug].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/reviews","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/reviews\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"reviews","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/reviews.ts","pathname":"/api/reviews","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/shop","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/shop\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/shop.ts","pathname":"/api/shop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test-connection","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test-connection\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test-connection","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test-connection.ts","pathname":"/api/test-connection","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/user","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/user\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"user","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/user.ts","pathname":"/api/user","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/discover","isIndex":false,"type":"page","pattern":"^\\/discover\\/?$","segments":[[{"content":"discover","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/discover.astro","pathname":"/discover","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/favorites","isIndex":false,"type":"page","pattern":"^\\/favorites\\/?$","segments":[[{"content":"favorites","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/favorites.astro","pathname":"/favorites","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/LayoutPage.Cj4SjnRD.css"},{"type":"inline","content":"@keyframes custom-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes custom-bounce{0%,to{animation-timing-function:cubic-bezier(.8,0,1,1);transform:translateY(-8%)}50%{animation-timing-function:cubic-bezier(0,0,.2,1);transform:translateY(0)}}@keyframes custom-scan{0%{opacity:0;top:0%}5%{opacity:1}95%{opacity:1}to{opacity:0;top:100%}}.spin-element{transform-origin:50%;border-color:var(--color-primary)!important;box-shadow:0 0 30px var(--color-primary), inset 0 0 15px var(--color-primary)!important;background:0 0!important;animation:10s linear infinite custom-spin!important}.bounce-element{filter:drop-shadow(0 0 20px var(--color-primary));transform-origin:50%;animation:2s ease-in-out infinite custom-bounce!important}.scan-element{animation:2s linear infinite custom-scan!important}\n"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/quests","isIndex":false,"type":"page","pattern":"^\\/quests\\/?$","segments":[[{"content":"quests","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quests.astro","pathname":"/quests","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".register-wrapper[data-v-497abda9]{flex-direction:column;gap:1rem;max-width:400px;margin:0 auto;padding:2rem;display:flex}.form-group[data-v-497abda9]{flex-direction:column;gap:.25rem;display:flex}input[data-v-497abda9]{border:1px solid #ccc;border-radius:6px;padding:.6rem .8rem;font-size:1rem}button[data-v-497abda9]{color:#fff;cursor:pointer;background:#e85d04;border:none;border-radius:6px;padding:.75rem;font-size:1rem}button[data-v-497abda9]:disabled{opacity:.6;cursor:not-allowed}.error-msg[data-v-497abda9]{color:#b91c1c;background:#fee2e2;border-radius:6px;padding:.75rem}.success-msg[data-v-497abda9]{color:#15803d;background:#dcfce7;border-radius:6px;padding:.75rem}\n"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/restaurant/[slug]","isIndex":false,"type":"page","pattern":"^\\/restaurant\\/([^/]+?)\\/?$","segments":[[{"content":"restaurant","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/restaurant/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/settings","isIndex":false,"type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".fade-enter-active[data-v-37464788],.fade-leave-active[data-v-37464788]{transition:opacity .2s}.fade-enter-from[data-v-37464788],.fade-leave-to[data-v-37464788]{opacity:0}.sheet-enter-active[data-v-0ce5ad51],.sheet-leave-active[data-v-0ce5ad51]{transition:opacity .2s}.sheet-enter-from[data-v-0ce5ad51],.sheet-leave-to[data-v-0ce5ad51]{opacity:0}\n.aviso-enter-active[data-v-fed49d7a],.aviso-leave-active[data-v-fed49d7a]{transition:all .2s}.aviso-enter-from[data-v-fed49d7a],.aviso-leave-to[data-v-fed49d7a]{opacity:0;transform:translate(20px)}\n"}],"routeData":{"route":"/shop","isIndex":false,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop.astro","pathname":"/shop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/test-db","isIndex":false,"type":"page","pattern":"^\\/test-db\\/?$","segments":[[{"content":"test-db","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test-db.astro","pathname":"/test-db","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/LayoutPage.Cj4SjnRD.css"},{"type":"inline","content":"html{scroll-behavior:smooth}.dashed-rule{border-bottom:1.5px dashed #c9b98f}.stamp{border:2.5px solid var(--color-primary);color:var(--color-primary);opacity:.9;border-radius:9999px;transform:rotate(-11deg)}.barcode{background-image:repeating-linear-gradient(90deg,#2a1b12 0 2px,#0000 2px 5px,#2a1b12 5px 6px,#0000 6px 10px);height:34px}.reveal{opacity:0;transition:opacity .7s,transform .7s;transform:translateY(18px)}.reveal.in{opacity:1;transform:translateY(0)}.course-eyebrow{letter-spacing:.14em;font-family:IBM Plex Mono,monospace}::selection{background:var(--color-primary);color:var(--color-primary-content)}@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transition:none;transform:none}html{scroll-behavior:auto}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","base":"/","trailingSlash":"ignore","compressHTML":"jsx","componentMetadata":[["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/analytics.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/createCupon.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/dashboard.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/redeemCoupon.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/settings.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/discover.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/favorites.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/profile.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/quests.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/restaurant/[slug].astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/search.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/settings.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/shop.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/create.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/register.astro",{"propagation":"none","containsHead":true}],["/home/manuel/RateAppProject/rateappAstro/src/pages/test-db.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.BRMXmqcX.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_DoPbQBot.mjs","/home/manuel/RateAppProject/rateappAstro/node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/chunks/multipart-parser.mjs":"chunks/multipart-parser_BXfSTOT_.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","@astrojs/netlify/ssr-function.js":"entry.mjs","\u0000virtual:astro:page:src/pages/api/restaurants/[slug]@_@ts":"chunks/_slug__BYEgdXJh.mjs","\u0000virtual:astro:page:src/pages/restaurant/[slug]@_@astro":"chunks/_slug__Bgn_oNi9.mjs","\u0000virtual:astro:page:src/pages/admin/analytics@_@astro":"chunks/analytics_C92YBvLd.mjs","\u0000virtual:astro:page:src/pages/api/auth/badges@_@ts":"chunks/badges_DPmqU5zs.mjs","\u0000virtual:astro:page:src/pages/api/coupons@_@ts":"chunks/coupons_BmSjhu0G.mjs","\u0000virtual:astro:page:src/pages/admin/createCupon@_@astro":"chunks/createCupon_B1fT2aa_.mjs","\u0000virtual:astro:page:src/pages/admin/create@_@astro":"chunks/create_DKL4J3MP.mjs","\u0000virtual:astro:page:src/pages/dashboard@_@astro":"chunks/dashboard_B22DyzME.mjs","\u0000virtual:astro:page:src/pages/admin/dashboard@_@astro":"chunks/dashboard_BiOdaQv1.mjs","\u0000virtual:astro:page:src/pages/api/db-status@_@js":"chunks/db-status_DJpHshUl.mjs","\u0000virtual:astro:page:src/pages/discover@_@astro":"chunks/discover_CGiLGzux.mjs","\u0000virtual:astro:page:src/pages/api/auth/favorite@_@ts":"chunks/favorite_CibZfrVG.mjs","\u0000virtual:astro:page:src/pages/favorites@_@astro":"chunks/favorites_Cv0FNzTB.mjs","\u0000virtual:astro:page:src/pages/api/favorites@_@ts":"chunks/favorites_fkp3qB34.mjs","\u0000virtual:astro:page:node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_B0B5N78Z.mjs","\u0000virtual:astro:page:src/pages/api/get-presigned-url@_@ts":"chunks/get-presigned-url_JjilfkrQ.mjs","/home/manuel/RateAppProject/rateappAstro/node_modules/.pnpm/@astrojs+netlify@8.2.5_@types+node@26.2.0_astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runti_7d475b7dad389468328c3d83fc8c33da/node_modules/@astrojs/netlify/dist/image-service.js":"chunks/image-service_BPWrY7WI.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_CYZTyt5E.mjs","\u0000virtual:astro:page:src/pages/api/auth/login@_@ts":"chunks/login_BH8r5NM2.mjs","\u0000virtual:astro:page:src/pages/login@_@astro":"chunks/login_Cs7BNqXL.mjs","\u0000virtual:astro:page:src/pages/api/auth/logout@_@ts":"chunks/logout_CTuA-uPH.mjs","\u0000virtual:astro:page:src/pages/api/auth/me@_@ts":"chunks/me_DcX-GPyl.mjs","\u0000virtual:astro:page:src/pages/api/restaurants/nearby@_@ts":"chunks/nearby_Q6PoW1oh.mjs","\u0000virtual:astro:page:src/pages/api/points@_@ts":"chunks/points_f_VCENqg.mjs","\u0000virtual:astro:page:src/pages/profile@_@astro":"chunks/profile_BOvRUdyh.mjs","\u0000virtual:astro:page:src/pages/api/quest@_@ts":"chunks/quest_DMvNMkbU.mjs","\u0000virtual:astro:page:src/pages/quests@_@astro":"chunks/quests_DXQy8dVH.mjs","\u0000virtual:astro:page:src/pages/admin/redeemCoupon@_@astro":"chunks/redeemCoupon_CLRA6VZv.mjs","\u0000virtual:astro:page:src/pages/api/auth/register-restaurant@_@ts":"chunks/register-restaurant_BbgS3ehv.mjs","\u0000virtual:astro:page:src/pages/api/auth/register@_@ts":"chunks/register_B0IHiN3n.mjs","\u0000virtual:astro:page:src/pages/register@_@astro":"chunks/register_sLGd9CqA.mjs","\u0000virtual:astro:page:src/pages/api/restaurant@_@ts":"chunks/restaurant_Blpt-_Cj.mjs","\u0000virtual:astro:page:src/pages/api/reviews@_@ts":"chunks/reviews_Cjn_B5Xc.mjs","\u0000virtual:astro:page:src/pages/api/admin/reviews@_@ts":"chunks/reviews_fJTlaFuj.mjs","\u0000virtual:astro:page:src/pages/api/auth/reviews@_@ts":"chunks/reviews_zeYHMEOr.mjs","\u0000virtual:astro:page:src/pages/api/restaurants/search@_@ts":"chunks/search_BfdjUsSL.mjs","\u0000virtual:astro:page:src/pages/search@_@astro":"chunks/search_C_DGuhCW.mjs","\u0000virtual:astro:page:src/pages/settings@_@astro":"chunks/settings_BOO781Ct.mjs","\u0000virtual:astro:page:src/pages/admin/settings@_@astro":"chunks/settings_Cl0lhzX8.mjs","\u0000virtual:astro:page:src/pages/shop@_@astro":"chunks/shop_Dc3tAeZe.mjs","\u0000virtual:astro:page:src/pages/api/shop@_@ts":"chunks/shop_Dl_uHHhY.mjs","\u0000virtual:astro:page:src/pages/api/test-connection@_@ts":"chunks/test-connection_CUIYhGTY.mjs","\u0000virtual:astro:page:src/pages/test-db@_@astro":"chunks/test-db_DtJgwvfG.mjs","\u0000virtual:astro:page:src/pages/api/user@_@ts":"chunks/user_BGuIBfxS.mjs","/home/manuel/RateAppProject/rateappAstro/src/components/AppSidebar.vue":"_astro/AppSidebar.oKLFS8Fl.js","/home/manuel/RateAppProject/rateappAstro/src/components/AppSidebarAdmin.vue":"_astro/AppSidebarAdmin.Cteva5II.js","/home/manuel/RateAppProject/rateappAstro/src/components/DiscoverPage.vue":"_astro/DiscoverPage.B_-zjdiS.js","/home/manuel/RateAppProject/rateappAstro/src/components/FavoriteRestaurants.vue":"_astro/FavoriteRestaurants.BXc9XKu9.js","/home/manuel/RateAppProject/rateappAstro/src/components/LoginForm.vue":"_astro/LoginForm.dXFzTFja.js","/home/manuel/RateAppProject/rateappAstro/src/components/MobileDock.vue":"_astro/MobileDock.DkT0LjWI.js","/home/manuel/RateAppProject/rateappAstro/src/components/MobileDockAdmin.vue":"_astro/MobileDockAdmin.DAWQOl4Q.js","/home/manuel/RateAppProject/rateappAstro/src/components/ProfileCard.vue":"_astro/ProfileCard.jyARrEid.js","/home/manuel/RateAppProject/rateappAstro/src/components/ProfilePage.vue":"_astro/ProfilePage.DJd4PDCE.js","/home/manuel/RateAppProject/rateappAstro/src/components/QuestsPage.vue":"_astro/QuestsPage.Ca9SIurG.js","/home/manuel/RateAppProject/rateappAstro/src/components/RegisterForm.vue":"_astro/RegisterForm.avR1y7yv.js","/home/manuel/RateAppProject/rateappAstro/src/components/RequireAuth.vue":"_astro/RequireAuth.CtOxzd4c.js","/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantAnalytics.vue":"_astro/RestaurantAnalytics.QR_Rz41O.js","/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantDashboard.vue":"_astro/RestaurantDashboard.4p981MSs.js","/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantDetailClient.vue":"_astro/RestaurantDetailClient.D4kps8Hc.js","/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantDistance.vue":"_astro/RestaurantDistance.CGKZglug.js","/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantGrid.vue":"_astro/RestaurantGrid.j2o8sNQV.js","/home/manuel/RateAppProject/rateappAstro/src/components/RestaurantProfileGrid.vue":"_astro/RestaurantProfileGrid.DoGINYll.js","/home/manuel/RateAppProject/rateappAstro/src/components/UI/RestaurantSearch.vue":"_astro/RestaurantSearch.BGExq0Z_.js","/home/manuel/RateAppProject/rateappAstro/src/components/UI/Reviews.vue":"_astro/Reviews.BNW_r00L.js","/home/manuel/RateAppProject/rateappAstro/src/components/SettingsPage.vue":"_astro/SettingsPage.CKwuMdiu.js","/home/manuel/RateAppProject/rateappAstro/src/components/ShopPage.vue":"_astro/ShopPage.Cdxxdrel.js","/home/manuel/RateAppProject/rateappAstro/src/components/WriteReviewWrapper.vue":"_astro/WriteReviewWrapper.DNQf4suE.js","/home/manuel/RateAppProject/rateappAstro/src/components/UI/alertContainer.vue":"_astro/alertContainer.1N5B5Jyi.js","@astrojs/vue/client.js":"_astro/client.DNjuvAc_.js","/home/manuel/RateAppProject/rateappAstro/src/pages/admin/create.astro?astro&type=script&index=0&lang.ts":"_astro/create.astro_astro_type_script_index_0_lang.DMxInrxQ.js","/home/manuel/RateAppProject/rateappAstro/src/pages/admin/createCupon.astro?astro&type=script&index=0&lang.ts":"_astro/createCupon.astro_astro_type_script_index_0_lang.D6Do9C-0.js","/home/manuel/RateAppProject/rateappAstro/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BM8jPIYG.js","/home/manuel/RateAppProject/rateappAstro/src/pages/admin/redeemCoupon.astro?astro&type=script&index=0&lang.ts":"_astro/redeemCoupon.astro_astro_type_script_index_0_lang.COvr3Ip6.js","/home/manuel/RateAppProject/rateappAstro/src/pages/test-db.astro?astro&type=script&index=0&lang.ts":"_astro/test-db.astro_astro_type_script_index_0_lang.CFAjlGhF.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/create.astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(`restaurantForm`),t=document.getElementById(`submitBtn`);e&&e.addEventListener(`submit`,async n=>{n.preventDefault();let r=t.innerHTML;t.disabled=!0,t.innerHTML=`<span class=\"loading loading-spinner loading-sm\"></span> Procesando...`;try{let t=document.getElementById(`address`).value.trim(),n=document.getElementById(`locationStatus`);if(!t)throw Error(`Debes indicar una dirección válida.`);let r=null,i=null;n&&(n.className=`text-xs text-info mt-1 font-medium`,n.textContent=`Buscando coordenadas de la dirección...`);try{let e=new URL(`https://nominatim.openstreetmap.org/search`);e.searchParams.set(`format`,`jsonv2`),e.searchParams.set(`limit`,`1`),e.searchParams.set(`q`,t);let n=await fetch(e.toString(),{headers:{Accept:`application/json`}});if(n.ok){let e=await n.json();r=Number.parseFloat(e[0]?.lat??``),i=Number.parseFloat(e[0]?.lon??``)}}catch(e){console.warn(`Geocodificación del navegador fallida, se usará el servidor:`,e)}Number.isFinite(r)&&Number.isFinite(i)?(document.getElementById(`latitude`).value=String(r),document.getElementById(`longitude`).value=String(i),n&&(n.className=`text-xs text-success mt-1 font-medium`,n.textContent=`Ubicación localizada: ${r.toFixed(4)}, ${i.toFixed(4)}`)):n&&(n.className=`text-xs text-warning mt-1 font-medium`,n.textContent=`No se pudo geolocalizar en el navegador; la dirección se resolverá en el servidor.`);let a=new FormData(e),o=await fetch(e.action,{method:e.method,body:a});if(o.ok)alert(`¡Restaurante creado con éxito!`),window.location.href=`/admin/dashboard`;else{let e=await o.json();alert(`Error: ${e.error||e.message||`No se pudo crear el restaurante`}`)}}catch(e){console.error(`Error al enviar el formulario:`,e),alert(e.message||`Ocurrió un error de red al intentar crear el restaurante.`)}finally{t.disabled=!1,t.innerHTML=r}});"],["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/createCupon.astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(`couponForm`),t=document.getElementById(`couponMessage`);e&&e.addEventListener(`submit`,async n=>{n.preventDefault();let r=new FormData(e),i={action:`create`,description:String(r.get(`description`)||``).trim(),category:String(r.get(`category`)||``).trim(),price:Number(r.get(`price`)),restaurantId:Number(r.get(`restaurantId`)),expirationDate:r.get(`expirationDate`)?String(r.get(`expirationDate`)):null};try{let n=await fetch(`/api/shop`,{method:`POST`,headers:{\"Content-Type\":`application/json`},body:JSON.stringify(i)}),r=await n.json();if(!n.ok)throw Error(r.error||`No se pudo crear el cupón`);t&&(t.className=`alert alert-success`,t.textContent=`Cupón creado correctamente.`,t.classList.remove(`hidden`)),e.reset(),window.location.reload()}catch(e){t&&(t.className=`alert alert-error`,t.textContent=e instanceof Error?e.message:`Error desconocido`,t.classList.remove(`hidden`))}}),document.querySelectorAll(`.delete-coupon`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-coupon-id`);if(t)try{let e=await fetch(`/api/shop`,{method:`DELETE`,headers:{\"Content-Type\":`application/json`},body:JSON.stringify({shop_id:Number(t),restaurantId:Number(document.getElementById(`restaurantId`)?.value||0)})}),n=await e.json();if(!e.ok)throw Error(n.error||`No se pudo eliminar`);window.location.reload()}catch(e){console.error(e),alert(e instanceof Error?e.message:`No se pudo eliminar el cupón`)}})});"],["/home/manuel/RateAppProject/rateappAstro/src/pages/index.astro?astro&type=script&index=0&lang.ts","var e=document.querySelectorAll(`[data-reveal]`),t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`in`),t.unobserve(e.target))})},{threshold:.15});e.forEach(e=>t.observe(e));"],["/home/manuel/RateAppProject/rateappAstro/src/pages/admin/redeemCoupon.astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(`redeemForm`),t=document.getElementById(`redeemMessage`);e&&e.addEventListener(`submit`,async n=>{n.preventDefault();let r=document.getElementById(`couponCode`),i=Number(document.getElementById(`restaurantId`)?.value||0),a=String(r?.value||``).trim().toUpperCase();if(!/^SHOP-[A-Z0-9]+-\\d+$/.test(a)){t&&(t.className=`alert alert-error`,t.textContent=`El formato del código es inválido. Debe ser SHOP-XXXX-USERID`,t.classList.remove(`hidden`));return}try{let n=await fetch(`/api/shop`,{method:`POST`,headers:{\"Content-Type\":`application/json`},body:JSON.stringify({action:`redeemCode`,code:a,restaurantId:i})}),r=await n.json();if(!n.ok)throw Error(r.error||`No se pudo canjear el cupón`);t&&(t.className=`alert alert-success`,t.textContent=r.message||`Cupón canjeado correctamente.`,t.classList.remove(`hidden`)),e.reset()}catch(e){t&&(t.className=`alert alert-error`,t.textContent=e instanceof Error?e.message:`Error desconocido`,t.classList.remove(`hidden`))}});"],["/home/manuel/RateAppProject/rateappAstro/src/pages/test-db.astro?astro&type=script&index=0&lang.ts","fetch(`/api/db-status`).then(e=>e.json()).then(e=>{let t=document.getElementById(`db-status-msg`),n=document.getElementById(`db-status-json`);t&&(e.connected?(t.innerHTML=`✅ Conexión exitosa`,t.style.color=`#0f0`):(t.innerHTML=`❌ Error de conexión: `+e.error,t.style.color=`#f00`)),n&&(n.textContent=JSON.stringify(e,null,2))}).catch(e=>{let t=document.getElementById(`db-status-msg`);t&&(t.innerHTML=`❌ Error: `+e.message,t.style.color=`#f00`)});"]],"assets":["/avatar-user.jpg","/_astro/AppSidebar.oKLFS8Fl.js","/_astro/AppSidebarAdmin.Cteva5II.js","/_astro/DiscoverPage.B_-zjdiS.js","/_astro/FavoriteRestaurants.BXc9XKu9.js","/_astro/HeaderPage.Brlu1kLk.js","/_astro/LoginForm.dXFzTFja.js","/_astro/MobileDock.DkT0LjWI.js","/_astro/MobileDockAdmin.DAWQOl4Q.js","/_astro/ProfileCard.jyARrEid.js","/_astro/ProfilePage.DJd4PDCE.js","/_astro/QuestsPage.Ca9SIurG.js","/_astro/RegisterForm.avR1y7yv.js","/_astro/RequireAuth.CtOxzd4c.js","/_astro/RestaurantAnalytics.QR_Rz41O.js","/_astro/RestaurantDashboard.4p981MSs.js","/_astro/RestaurantDetailClient.D4kps8Hc.js","/_astro/RestaurantDistance.CGKZglug.js","/_astro/RestaurantGrid.j2o8sNQV.js","/_astro/RestaurantProfileGrid.DoGINYll.js","/_astro/RestaurantSearch.BGExq0Z_.js","/_astro/RestaurantSearchBar.CgvNvbny.js","/_astro/Reviews.BNW_r00L.js","/_astro/SettingsPage.CKwuMdiu.js","/_astro/ShopPage.Cdxxdrel.js","/_astro/WriteReviewWrapper.DNQf4suE.js","/_astro/_plugin-vue_export-helper.BDNMzG2s.js","/_astro/alertContainer.1N5B5Jyi.js","/_astro/alerts.CMDMzQo0.js","/_astro/api.BBYdAtIi.js","/_astro/badgeVerifier.BNcAQSI-.js","/_astro/client.DNjuvAc_.js","/_astro/compass.DxOIRMkC.js","/_astro/createLucideIcon.CLk-pfCh.js","/_astro/dataUser.Dt4kHEhY.js","/_astro/heart.CoZgZlHt.js","/_astro/map-pin.CWoXC0Rm.js","/_astro/menu.Di7Z81bC.js","/_astro/runtime-core.esm-bundler.cTvmcrsr.js","/_astro/runtime-dom.esm-bundler.BIbTsruV.js","/_astro/settings.DyZyW2Xq.js","/_astro/sparkles.DpL60Y3t.js","/_astro/star.BE-L9KMw.js","/_astro/storeUbication.CGaIO_rJ.js","/_astro/ticket-percent.CA_O10QJ.js","/_astro/ticket.DXrwct6K.js","/_astro/trending-up.B5wugk1q.js","/_astro/x.B4uj6dnx.js","/_astro/LayoutPage.Cj4SjnRD.css"],"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"hl0xuH4j/B/FHnsHJ0K7jyBBmy3Jv3srgU3pfcpKvl0=","sessionConfig":{"driver":"unstorage/drivers/netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}},"image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_DoPbQBot.mjs").then((n) => n.t),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#manifest;
	/**
	* `BaseApp` passes itself so states resolve that app's manifest ahead of
	* the ambient one; generated builds construct the handler with no
	* arguments and use the ambient manifest.
	*/
	constructor(app) {
		this.#manifest = app?.manifest;
	}
	fetch = (request) => {
		const options = getRenderOptions(request);
		return handleRequest(new FetchState(this.#manifest ?? getAmbientManifest(), request, options));
	};
};
//#endregion
//#region \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
//#endregion
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
var app = createApp$1();
function createHandler({ notFoundContent }) {
	return async function handler(request, context) {
		const routeData = app.match(request);
		if (!routeData && typeof notFoundContent !== "undefined") return new Response(notFoundContent, {
			status: 404,
			headers: { "Content-Type": "text/html; charset=utf-8" }
		});
		let locals = {};
		const astroLocalsHeader = request.headers.get("x-astro-locals");
		const middlewareSecretHeader = request.headers.get("x-astro-middleware-secret");
		if (astroLocalsHeader) {
			if (middlewareSecretHeader !== "4340ac67-b6eb-4efe-a5ba-6d13c5dcd288") return new Response("Forbidden", { status: 403 });
			request.headers.delete("x-astro-middleware-secret");
			locals = JSON.parse(astroLocalsHeader);
		}
		locals.netlify = { context };
		const response = await app.render(request, {
			routeData,
			locals,
			clientAddress: context.ip
		});
		if (app.setCookieHeaders) for (const setCookieHeader of app.setCookieHeaders(response)) response.headers.append("Set-Cookie", setCookieHeader);
		return response;
	};
}
//#endregion
export { createHandler };
