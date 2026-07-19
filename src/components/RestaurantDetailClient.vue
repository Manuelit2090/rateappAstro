<script setup lang="ts">
// Botones interactivos del hero de la página de detalle
// (Heart, Bookmark, Share2) — separados en Vue porque necesitan estado
import { computed } from 'vue'
import { Heart, Bookmark, Share2 } from 'lucide-vue-next'
import { dataUser, setDataUser } from '../store/dataUser'

interface Props {
  slug: string
}

const props = defineProps<Props>()

const liked = computed(() => {
  return dataUser.user?.favoriteRestaurant?.includes(props.slug) ?? false
})

async function toggleLike() {
  if (!dataUser.user) return

  try {
    const response = await fetch('/api/auth/favorite', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: props.slug }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      console.error('Error guardando favorito:', error?.error || response.status)
      return
    }

    const data = await response.json()
    const favorites = data.favorites || []

    setDataUser({
      ...dataUser.user,
      favoriteRestaurant: favorites,
    })
  } catch (error) {
    console.error('Error al actualizar favorito:', error)
  }
}

function share() {
  if (navigator.share) {
    navigator.share({ title: document.title, url: location.href })
  } else {
    navigator.clipboard.writeText(location.href)
  }
}

</script>

<template>
  <div class="flex gap-2">
    <button
      @click="toggleLike"
      :class="[
        'grid place-items-center h-10 w-10 rounded-full backdrop-blur-md border transition',
        liked
          ? 'bg-secondary text-secondary-content border-secondary'
          : 'bg-base-100/60 border-base-300/60 hover:bg-secondary hover:text-secondary-content'
      ]"
      :aria-label="liked ? 'Unlike' : 'Like'"
    >
      <Heart class="h-4 w-4" :class="liked ? 'fill-current' : ''" />
    </button>

    

    <button
      @click="share"
      class="grid place-items-center h-10 w-10 rounded-full bg-base-100/60 backdrop-blur-md border border-base-300/60 hover:border-primary/40 transition"
      aria-label="Share"
    >
      <Share2 class="h-4 w-4" />
    </button>
  </div>
</template>
