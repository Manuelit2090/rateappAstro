import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//#region src/lib/auth.ts
var SECRET = "RateApp_Secret_Key_v1_SuperSecureKeyForProduction2026_EstaEsUnaClaveFijaYSegura";
function normalizeUserSystem(role) {
	switch (role) {
		case "RESTAURANT":
		case "owner": return "RESTAURANT";
		case "ADMIN": return "ADMIN";
		default: return "CLIENT";
	}
}
async function hashPassword(password) {
	return bcrypt.hash(password, 12);
}
async function verifyPassword(password, hash) {
	if (!hash) return false;
	if (hash.startsWith("$2")) return bcrypt.compare(password, hash);
	return password === hash;
}
function buildAuthCookie(token) {
	return `auth_token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure`;
}
function generateToken(payload) {
	const normalizedSystem = normalizeUserSystem(payload.sys ?? payload.role);
	return jwt.sign({
		...payload,
		sys: normalizedSystem,
		role: normalizedSystem
	}, SECRET, { expiresIn: "7d" });
}
function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, SECRET);
		if (!decoded || typeof decoded !== "object") return null;
		const id = Number(decoded.id);
		const email = typeof decoded.email === "string" ? decoded.email : "";
		if (!Number.isFinite(id) || !email) return null;
		return {
			id,
			email,
			sys: normalizeUserSystem(decoded.sys ?? decoded.role),
			restaurant_id: decoded.restaurant_id ?? null,
			role: decoded.role ?? decoded.sys ?? "CLIENT"
		};
	} catch {
		return null;
	}
}
//#endregion
export { verifyToken as a, verifyPassword as i, generateToken as n, hashPassword as r, buildAuthCookie as t };
