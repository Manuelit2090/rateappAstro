import { t as __exportAll } from "./rolldown-runtime_BhDjJH2R.mjs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//#region src/pages/api/get-presigned-url.ts
var get_presigned_url_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var s3 = new S3Client({
	region: "auto",
	endpoint: "https://2e5a7f395203816e49639bf764338c59.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: "6946b706111f8626d638630ce73e7ee5",
		secretAccessKey: "642e9bd9bedb7cc3cb9c471a16e19257ed28f28437475fd04403e9babdebd8f3"
	},
	requestChecksumCalculation: "WHEN_REQUIRED"
});
var POST = async ({ request }) => {
	try {
		const { filename, contentType } = await request.json();
		if (typeof filename !== "string" || !filename.trim()) return new Response(JSON.stringify({ error: "El nombre del archivo es obligatorio" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!(typeof contentType === "string" && (/* @__PURE__ */ new Set([
			"image/jpeg",
			"image/png",
			"image/webp"
		])).has(contentType))) return new Response(JSON.stringify({ error: "El archivo debe ser una imagen válida (JPG, PNG o WEBP)" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const uniqueFilename = `${Date.now()}-${filename.trim().replace(/\s+/g, "_")}`;
		const command = new PutObjectCommand({
			Bucket: "imagesrateapp",
			Key: uniqueFilename,
			ContentType: contentType
		});
		const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 120 });
		const fileUrl = `https://pub-d80845b9e313461db9d75fa6897f1bf3.r2.dev/${uniqueFilename}`;
		return new Response(JSON.stringify({
			uploadUrl,
			fileUrl
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error generando la URL presignada:", error);
		return new Response(JSON.stringify({ error: error.message || "Error al generar la URL de subida" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/get-presigned-url@_@ts
var page = () => get_presigned_url_exports;
//#endregion
export { page };
