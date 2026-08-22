//#region src/data/badges.json
var badges_default = [
	{
		"id": "reviewer-bronze",
		"badgeName": "Reseñador Bronce",
		"badgeDescription": "Empezaste a compartir tu opinión con la comunidad.",
		"requirements": "Escribe 10 reseñas.",
		"requisitos": {
			"reviewsRequirement": 10,
			"viewRequirement": 0
		},
		"difficulty": "facil",
		"category": "reseñas"
	},
	{
		"id": "reviewer-gold",
		"badgeName": "Reseñador Oro",
		"badgeDescription": "Eres una voz reconocida entre los reseñadores.",
		"requirements": "Escribe 50 reseñas.",
		"requisitos": {
			"reviewsRequirement": 50,
			"viewRequirement": 0
		},
		"difficulty": "dificil",
		"category": "reseñas"
	},
	{
		"id": "explorador-local",
		"badgeName": "Explorador Local",
		"badgeDescription": "Conoces buena parte de la oferta gastronómica de la ciudad.",
		"requirements": "Visita (visualiza) 20 restaurantes distintos.",
		"requisitos": {
			"reviewsRequirement": 0,
			"viewRequirement": 20
		},
		"difficulty": "media",
		"category": "exploracion"
	},
	{
		"id": "critico-completo",
		"badgeName": "Crítico Completo",
		"badgeDescription": "No solo exploras, también compartes tu experiencia en cada lugar.",
		"requirements": "Visualiza 15 restaurantes y escribe 15 reseñas.",
		"requisitos": {
			"reviewsRequirement": 15,
			"viewRequirement": 15
		},
		"difficulty": "dificil",
		"category": "exploracion"
	}
];
//#endregion
//#region src/lib/badgeVerifier.ts
function normalizeBadgeIds(raw) {
	if (!raw) return [];
	if (Array.isArray(raw)) return raw.map((item) => String(item));
	if (typeof raw === "string") try {
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed.map((item) => String(item));
		return [raw];
	} catch {
		return [raw];
	}
	if (typeof raw === "number") return [String(raw)];
	return [];
}
async function getPersistedBadgeIds() {
	try {
		const response = await fetch("/api/auth/badges", { credentials: "include" });
		if (!response.ok) return [];
		return normalizeBadgeIds((await response.json())?.badges);
	} catch {
		return [];
	}
}
function getNumericValue(user, keys) {
	for (const key of keys) {
		const value = user?.[key];
		if (Array.isArray(value)) return value.length;
		if (typeof value === "number") return value;
		if (typeof value === "string") {
			const parsed = Number(value);
			if (!Number.isNaN(parsed)) return parsed;
		}
	}
	return 0;
}
function checkBadges(user, allBadges = badges_default, existingBadgeIdsOverride) {
	const reviewCount = getNumericValue(user, [
		"totalReviews",
		"reviewCount",
		"reviewsCount"
	]);
	const viewCount = getNumericValue(user, [
		"favoriteRestaurant",
		"viewedRestaurants",
		"visitedRestaurants",
		"viewCount"
	]);
	const existingBadgeIds = new Set(existingBadgeIdsOverride ?? normalizeBadgeIds(user?.badges ?? user?.badgeIds));
	const earnedBadges = allBadges.filter((badge) => {
		const requirements = badge.requisitos;
		const meetsReviews = reviewCount >= (requirements.reviewsRequirement ?? 0);
		const meetsViews = viewCount >= (requirements.viewRequirement ?? 0);
		return meetsReviews && meetsViews;
	});
	return {
		reviewCount,
		viewCount,
		earnedBadges,
		newBadges: earnedBadges.filter((badge) => !existingBadgeIds.has(badge.id)),
		earnedBadgeIds: earnedBadges.map((badge) => badge.id)
	};
}
async function syncBadgesForUser(user) {
	const result = checkBadges(user, badges_default, await getPersistedBadgeIds());
	if (!result.newBadges.length) return result;
	try {
		const promises = result.newBadges.map((badge) => fetch("/api/auth/badges", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ badgeId: badge.id })
		}).then((response) => response.json()));
		await Promise.all(promises);
	} catch (error) {
		console.error("Error sincronizando badges:", error);
	}
	return result;
}
//#endregion
export { syncBadgesForUser as n, badges_default as r, checkBadges as t };
