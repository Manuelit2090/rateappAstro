<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Review } from '../../data/reviews'

const props = defineProps<{
  restaurantSlug: string
}>()

const restaurantReviews = ref<Review[]>([])
const loading = ref(true)
const error = ref('')

const loadReviews = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch(`/api/auth/reviews?slug=${encodeURIComponent(props.restaurantSlug)}`)
    const data = await res.json()

    if (!res.ok) {
      error.value = data.error || 'No se pudieron cargar las reseñas'
      return
    }

    // reviewDate llega como string desde la API; lo convertimos a Date para usar toLocaleDateString
    restaurantReviews.value = data.reviews.map((rev: Review) => ({
      ...rev,
      reviewDate: new Date(rev.reviewDate),
    }))
  } catch (err) {
    console.error('Error al cargar reseñas:', err)
    error.value = 'No se pudieron cargar las reseñas'
  } finally {
    loading.value = false
  }
}

onMounted(loadReviews)
</script>

<template>
  <div class="mt-8 space-y-4">

    <p v-if="loading" class="text-sm text-neutral text-center py-6">
      Cargando reseñas...
    </p>

    <p v-else-if="error" class="text-sm text-error text-center py-6">
      {{ error }}
    </p>

    <template v-else>
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
    </template>

  </div>
</template>