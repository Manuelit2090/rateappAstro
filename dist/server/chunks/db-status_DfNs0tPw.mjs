import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import path from "path";
import fs from "fs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
//#region src/server/db.js
dotenv.config();
var dbConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	ssl: {
		ca: fs.readFileSync(path.join(process.cwd(), process.env.DB_SSL_CA || "src/server/ca-cert.pem")),
		rejectUnauthorized: true
	}
};
var pool;
async function getDbConnection() {
	if (!pool) pool = mysql.createPool(dbConfig);
	return pool;
}
async function checkDbConnection() {
	try {
		const [rows] = await (await getDbConnection()).query("SELECT 1");
		return {
			connected: true,
			result: rows
		};
	} catch (error) {
		return {
			connected: false,
			error: error.message
		};
	}
}
//#endregion
//#region src/pages/api/db-status.js
var db_status_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
async function GET() {
	const status = await checkDbConnection();
	return new Response(JSON.stringify(status), {
		status: status.connected ? 200 : 500,
		headers: { "Content-Type": "application/json" }
	});
}
//#endregion
//#region \0virtual:astro:page:src/pages/api/db-status@_@js
var page = () => db_status_exports;
//#endregion
export { page };
