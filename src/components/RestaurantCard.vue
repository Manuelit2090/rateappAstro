<script setup lang="ts">
import { Star, MapPin, Bookmark, Heart } from 'lucide-vue-next'
import { computed } from 'vue'
import type { Restaurant } from '../data/restaurants'
import { dataUser, setDataUser } from '../store/dataUser'

const props = defineProps<{ r: Restaurant }>()

const liked = computed({
  get() {
    return dataUser.user?.favoriteRestaurant?.includes(props.r.slug) ?? false
  },
  set(value: boolean) {
    if (!dataUser.user) return

    const favorites = [...(dataUser.user.favoriteRestaurant || [])]
    
    if (value) {
      if (!favorites.includes(props.r.slug)) {
        favorites.push(props.r.slug)
      }
    } else {
      const index = favorites.indexOf(props.r.slug)
      if (index > -1) {
        favorites.splice(index, 1)
      }
    }

    setDataUser({
      ...dataUser.user,
      favoriteRestaurant: favorites
    })
  }
})

function toggleLike() {
  liked.value = !liked.value
}
</script>

<template>
  <a
    :href="`/restaurant/${r.slug}`"
    class="group block rounded-3xl overflow-hidden border border-base-300/60 bg-base-100/60 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all"
  >
    <article>
      <!-- Image -->
      <div class="relative aspect-[16/10] overflow-hidden">
        <img
          :src="typeof r.image === 'object' ? r.image.src : r.image"
          :alt="r.name"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-base-100/90 via-base-100/10 to-transparent" />

        <!-- Promoted badge -->
        <span
          v-if="r.promoted"
          class="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-content text-[10px] font-bold uppercase tracking-wider shadow-[0_0_24px_-4px_var(--p)]"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-lime-foreground animate-pulse" />
          Promoted
        </span>

        <!-- Action buttons -->
        <div class="absolute top-4 right-4 flex gap-2">
          <button
            type="button"
            @click.prevent="toggleLike"
            :class="[
              'grid place-items-center h-9 w-9 rounded-full backdrop-blur-md border transition-colors',
              liked
                ? 'bg-secondary text-secondary-content border-secondary'
                : 'bg-base-100/60 border-base-300/60 hover:bg-secondary hover:text-secondary-content'
            ]"
            :aria-label="liked ? 'Unlike' : 'Like'"
          >
            <Heart class="h-4 w-4" :class="liked ? 'fill-current' : ''" />
          </button>
         
        </div>

        <!-- Name / rating overlay -->
        <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p class="text-[11px] uppercase tracking-[0.2em] text-secondary mb-1">{{ r.cuisine }}</p>
            <h3 class="font-display text-2xl font-bold leading-tight">{{ r.name }}</h3>
          </div>
          <div class="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary text-primary-content">
            <Star class="h-3.5 w-3.5 fill-current" />
            <span class="text-sm font-bold">{{ r.rating }}</span>
          </div>
        </div>
      </div>

      <!-- Card footer -->
      <div class="p-5 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4 text-xs text-neutral">
          <span class="inline-flex items-center gap-1.5">
            <MapPin class="h-3.5 w-3.5" />
            {{ r.distance }}
          </span>
          <span>{{ r.priceRange }}</span>
          <span>{{ r.reviews }} reviews</span>
        </div>
        <div class="flex gap-1.5">
          <span
            v-for="t in r.tags"
            :key="t"
            class="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-base-300/60 text-neutral"
          >
            {{ t }}
          </span>
        </div>
      </div>
    </article>
  </a>
  <!-- </RouterLink> -->
</template>
