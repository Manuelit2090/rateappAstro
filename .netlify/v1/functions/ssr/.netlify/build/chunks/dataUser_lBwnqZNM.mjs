import { reactive } from "vue";
//#region src/store/dataUser.ts
/**
* @file dataUser.ts
* @description Almacenamiento reactivo de datos del usuario autenticado (en memoria).
* @note Las cookies httpOnly se envían automáticamente en cada request; este store
*       es solo un caché local. Para obtener datos actualizados, usar /api/auth/me
* @dependencies vue (reactive), src/data/user (tipos)
*/
var dataUser = reactive({ user: null });
/**
* Actualiza los datos del usuario en el store reactivo.
* @param user - Objeto User o SessionUser a almacenar
*/
function setDataUser(user) {
	let session;
	if ("password" in user) {
		const { password, ...rest } = user;
		session = rest;
	} else session = user;
	dataUser.user = session;
}
/**
* Carga datos del usuario desde la API (verificando sesión válida).
* @returns Promise que resuelve cuando se cargan los datos
*/
async function loadDataUserFromAPI() {
	if (dataUser.user) return;
	if (typeof window === "undefined") return;
	try {
		const response = await fetch("/api/auth/me", {
			method: "GET",
			credentials: "include"
		});
		if (response.ok) {
			const data = await response.json();
			if (data.user) setDataUser(data.user);
		} else logoutUser();
	} catch (error) {
		console.error("Error cargando datos del usuario:", error);
	}
}
/**
* Limpia la sesión del usuario en el store.
*/
function logoutUser() {
	dataUser.user = null;
}
//#endregion
export { setDataUser as i, loadDataUserFromAPI as n, logoutUser as r, dataUser as t };
