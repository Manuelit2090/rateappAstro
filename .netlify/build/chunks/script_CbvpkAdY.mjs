import { k as createRenderInstruction } from "./sequence_BMjlvBv6.mjs";
//#region node_modules/.pnpm/astro@7.2.4_@emnapi+core@1.11.1_@emnapi+runtime@1.11.3_@netlify+blobs@10.7.13_supports-_df49a93316f98e0719d7da84134a1f86/node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
export { renderScript as t };
