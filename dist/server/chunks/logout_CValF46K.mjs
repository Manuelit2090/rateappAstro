import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { a as verifyToken } from "./auth_-mFB-2Pn.mjs";
//#region src/pages/api/auth/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ cookies }) => {
	const token = cookies.get("auth_token")?.value;
	if (token) verifyToken(token);
	return new Response(JSON.stringify({ message: "Sesión cerrada" }), {
		status: 200,
		headers: {
			"Set-Cookie": "auth_token=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Strict",
			"Content-Type": "application/json"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
