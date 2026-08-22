import mysql from "mysql2/promise";
//#region src/lib/db.ts
var pool = mysql.createPool({
	host: "rateapp20261112db-manguitoscuro2707-4875.c.aivencloud.com",
	port: 21292,
	user: "avnadmin",
	password: "AVNS_VdNqm1pyagfpEvBY5X8",
	database: "AppBD",
	waitForConnections: true,
	connectionLimit: 10,
	ssl: { rejectUnauthorized: false }
});
//#endregion
export { pool as t };
