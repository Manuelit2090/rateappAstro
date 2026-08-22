import { r as __exportAll } from "./rolldown-runtime_CE-6LUnI.mjs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
//#region src/pages/api/get-presigned-url.ts
var get_presigned_url_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var s3 = new S3Client({
	region: "auto",
	endpoint: "https://2e5a7f395203816e49639bf764338c59.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: "2e5a7f395203816e49639bf764338c59",
		secretAccessKey: "https://2e5a7f395203816e49639bf764338c59.r2.cloudflarestorage.com"
	}
});
var POST = async ({ request }) => {
	try {
		const { filename, contentType } = await request.json();
		const uniqueFilename = `${Date.now()}-${filename}`;
		const uploadUrl = await getSignedUrl(s3, new PutObjectCommand({
			Bucket: "imagesrateapp",
			Key: uniqueFilename,
			ContentType: contentType
		}), { expiresIn: 60 });
		const fileUrl = `https://pub-d80845b9e313461db9d75fa6897f1bf3.r2.dev/${uniqueFilename}`;
		return new Response(JSON.stringify({
			uploadUrl,
			fileUrl
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Error generando la URL" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/get-presigned-url@_@ts
var page = () => get_presigned_url_exports;
//#endregion
export { page };
