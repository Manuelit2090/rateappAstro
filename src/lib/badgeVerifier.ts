import badgesData from '../data/badges.json'
import type { User } from '../data/user'

export interface BadgeUnlockResult {
  reviewCount: number
  viewCount: number
  earnedBadges: BadgeDefinition[]
  newBadges: BadgeDefinition[]
  earnedBadgeIds: string[]
}

export interface BadgeDefinition {
  id: string
  badgeName: string
  badgeDescription: string
  requirements: string
  requisitos: {
    reviewsRequirement: number
    viewRequirement: number
  }
  difficulty: string
  category: string
}

function normalizeBadgeIds(raw: unknown): string[] {
  if (!raw) return []

  if (Array.isArray(raw)) {
    return raw.map((item) => String(item))
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item))
      }
      return [raw]
    } catch {
      return [raw]
    }
  }

  if (typeof raw === 'number') {
    return [String(raw)]
  }

  return []
}

async function getPersistedBadgeIds(): Promise<string[]> {
  try {
    const response = await fetch('/api/auth/badges', {
      credentials: 'include',
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return normalizeBadgeIds(data?.badges)
  } catch {
    return []
  }
}

function getNumericValue(user: Partial<User> | null | undefined, keys: string[]): number {
  for (const key of keys) {
    const value = (user as Record<string, unknown> | undefined)?.[key]

    if (Array.isArray(value)) {
      return value.length
    }

    if (typeof value === 'number') {
      return value
    }

    if (typeof value === 'string') {
      const parsed = Number(value)
      if (!Number.isNaN(parsed)) {
        return parsed
      }
    }
  }

  return 0
}

export function checkBadges(
  user: Partial<User> | null | undefined,
  allBadges: BadgeDefinition[] = badgesData as BadgeDefinition[],
  existingBadgeIdsOverride?: string[]
): BadgeUnlockResult {
  const reviewCount = getNumericValue(user, ['totalReviews', 'reviewCount', 'reviewsCount'])
  const viewCount = getNumericValue(user, ['favoriteRestaurant', 'viewedRestaurants', 'visitedRestaurants', 'viewCount'])

  const existingBadgeIds = new Set(
    existingBadgeIdsOverride ?? normalizeBadgeIds(
      (user as Record<string, unknown> | undefined)?.badges ??
      (user as Record<string, unknown> | undefined)?.badgeIds
    )
  )

  const earnedBadges = allBadges.filter((badge) => {
    const requirements: BadgeDefinition['requisitos'] = badge.requisitos
    const meetsReviews = reviewCount >= (requirements.reviewsRequirement ?? 0)
    const meetsViews = viewCount >= (requirements.viewRequirement ?? 0)
    return meetsReviews && meetsViews
  })

  const newBadges = earnedBadges.filter((badge) => !existingBadgeIds.has(badge.id))

  return {
    reviewCount,
    viewCount,
    earnedBadges,
    newBadges,
    earnedBadgeIds: earnedBadges.map((badge) => badge.id),
  }
}

export async function syncBadgesForUser(user: Partial<User> | null | undefined) {
  const persistedBadgeIds = await getPersistedBadgeIds()
  const result = checkBadges(user, badgesData as BadgeDefinition[], persistedBadgeIds)

  if (!result.newBadges.length) {
    return result
  }

  try {
    const promises = result.newBadges.map((badge) =>
      fetch('/api/auth/badges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ badgeId: badge.id }),
      }).then((response) => response.json())
    )

    await Promise.all(promises)
  } catch (error) {
    console.error('Error sincronizando badges:', error)
  }

  return result
}
