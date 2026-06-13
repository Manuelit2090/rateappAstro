<script setup lang="ts">
import { getRestaurant } from '../../data/restaurants'
import { reviews, type Review } from '../../data/reviews'

const props = defineProps<{
  restaurantSlug: string
}>()

const r = getRestaurant(props.restaurantSlug)
const restaurantReviews = reviews.filter(rev => rev.reviewSlug === props.restaurantSlug)
</script>

<template>
  <div class="mt-8 space-y-4">

    <article
      v-for="rev in restaurantReviews"
      :key="rev.reviewId"
      class="rounded-2xl border border-base-300/60 bg-base-100/40 p-5"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">

          <!-- Avatar inicial de reviewUser -->
          <div class="grid place-items-center h-9 w-9 rounded-full bg-primary/20 text-primary font-semibold text-sm">
            {{ rev.reviewUser.charAt(0).toUpperCase() }}
          </div>

          <div>
            <div class="text-sm font-semibold">{{ rev.reviewUser }}</div>
            <div class="text-[11px] text-neutral">
              {{ rev.reviewDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </div>
        </div>

        <!-- Estrellas -->
        <div class="flex items-center gap-0.5">
          <svg
            v-for="star in 5"
            :key="star"
            :class="[
              'h-3.5 w-3.5',
              star <= rev.reviewStar ? 'fill-primary text-primary' : 'fill-none text-neutral'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
      </div>

      <!-- Texto de la reseña -->
      <p class="text-sm text-neutral mt-3 leading-relaxed">{{ rev.reviewText }}</p>

      <!-- Items opcionales -->
      <div v-if="rev.reviewItem?.length" class="mt-3 flex flex-wrap gap-2">
        <span
          v-for="item in rev.reviewItem"
          :key="item.item"
          class="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-xs font-medium"
        >
          {{ item.item }}
          <span class="text-neutral">${{ item.total.toLocaleString('es-CO') }}</span>
        </span>
      </div>
    </article>

    <!-- Estado vacío -->
    <p v-if="!restaurantReviews.length" class="text-sm text-neutral text-center py-6">
      Aún no hay reseñas para este restaurante.
    </p>

  </div>
</template>