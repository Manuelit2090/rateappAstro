import { t as sequence } from "./chunks/sequence_B9U-1IVV.mjs";
import { a as verifyToken } from "./chunks/auth_-mFB-2Pn.mjs";
//#region src/middleware.ts
var PUBLIC_PATHS = /* @__PURE__ */ new Set([
	"/login",
	"/register",
	"/",
	"/forgot-password"
]);
var PRIVATE_CLIENT_PATHS = [
	"/dashboard",
	"/profile",
	"/favorites",
	"/discover",
	"/search",
	"/settings",
	"/quests",
	"/shop"
];
var PRIVATE_RESTAURANT_PATHS = ["/restaurant-admin", "/admin"];
var onRequest$1 = async (context, next) => {
	const { url, cookies, redirect } = context;
	const pathname = url.pathname;
	if (pathname.startsWith("/api/") || pathname.startsWith("/_astro/") || pathname.startsWith("/assets/")) return next();
	const token = cookies.get("auth_token")?.value;
	if (!token) return PUBLIC_PATHS.has(pathname) ? next() : redirect("/login");
	const payload = verifyToken(token);
	if (!payload) return PUBLIC_PATHS.has(pathname) ? next() : redirect("/login");
	const userSystem = payload.sys ?? "CLIENT";
	const restaurantId = payload.restaurant_id ?? null;
	const isRestaurantRoute = PRIVATE_RESTAURANT_PATHS.some((route) => pathname === route || pathname.startsWith(`${route}/`));
	const isClientRoute = PRIVATE_CLIENT_PATHS.some((route) => pathname === route || pathname.startsWith(`${route}/`));
	const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
	if (userSystem === "RESTAURANT") {
		if (PUBLIC_PATHS.has(pathname)) return redirect("/admin/dashboard");
		if (isAdminPath) return next();
		if (restaurantId && isRestaurantRoute) return next();
		if (restaurantId && pathname === "/dashboard") return redirect("/admin/dashboard");
		if (!restaurantId) return redirect("/login");
		if (isClientRoute) return redirect("/admin/dashboard");
		if (pathname === "/dashboard") return redirect("/admin/dashboard");
		return next();
	}
	if (userSystem === "ADMIN") return next();
	if (isRestaurantRoute) return redirect("/login");
	if (isClientRoute || !pathname.includes("/")) return next();
	return next();
};
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
