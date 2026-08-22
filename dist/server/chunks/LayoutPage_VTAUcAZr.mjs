import { S as createAstro, f as renderHead, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_DEZ-lMdc.mjs";
import { t as createComponent } from "./compiler_ukgsXu7P.mjs";
//#region src/layouts/LayoutPage.astro
createAstro("https://astro.build");
var $$LayoutPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LayoutPage;
	const { title = "rateapp — Discover & review the world's best food", description = "rateapp is the modern food review platform. Earn points, complete weekly quests, and discover top-rated restaurants near you." } = Astro.props;
	return renderTemplate`<html lang="en" data-theme="abyss"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="author" content="rateapp"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta name="twitter:card" content="summary"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"><!-- Global styles (Tailwind + CSS vars) --><link rel="stylesheet" href="/src/styles/global.css">${renderHead($$result)}</head><body>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/Estudiante/rateappAstro/src/layouts/LayoutPage.astro", void 0);
//#endregion
export { $$LayoutPage as t };
