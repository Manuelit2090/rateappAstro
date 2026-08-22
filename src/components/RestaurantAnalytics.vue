<script setup lang="ts">
/**
 * @file RestaurantAnalytics.vue
 * @description Muestra métricas y el historial de reseñas del restaurante autenticado.
 * @dependencies Vue 3
 */

import { computed, onMounted, ref } from 'vue'

interface Review {
  id: string
  rating: number
  comment: string
  userName: string
  date: string
  restaurantResponse: string | null
}

const reviews = ref<Review[]>([])
const loading = ref(true)
const error = ref('')

/**
 * Convierte una fecha de API a una fecha legible para el panel.
 * @param value - Fecha serializada recibida desde la API.
 * @returns Fecha localizada o un guion si no es válida.
 */
const formatDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString('es-ES')
}

/**
 * Carga las reseñas del restaurante asociado a la cookie de sesión.
 * @returns Promise resuelta cuando termina la carga.
 */
const loadReviews = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('/api/admin/reviews')
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'No se pudieron cargar las reseñas')
    reviews.value = Array.isArray(data.reviews) ? data.reviews : []
  } catch (loadError) {
    console.error('Error cargando Analytics:', loadError)
    error.value = loadError instanceof Error ? loadError.message : 'No se pudieron cargar las reseñas'
  } finally {
    loading.value = false
  }
}

const averageRating = computed(() => {
  if (!reviews.value.length) return '0.0'
  return (reviews.value.reduce((sum, review) => sum + review.rating, 0) / reviews.value.length).toFixed(1)
})

const distribution = computed(() => [5, 4, 3, 2, 1].map((rating) => {
  const count = reviews.value.filter((review) => review.rating === rating).length
  return { rating, count, percentage: reviews.value.length ? Math.round((count / reviews.value.length) * 100) : 0 }
}))

const trend = computed(() => {
  const now = new Date()
  const currentMonth = reviews.value.filter((review) => {
    const date = new Date(review.date)
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
  }).length
  const previous = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const previousMonth = reviews.value.filter((review) => {
    const date = new Date(review.date)
    return date.getFullYear() === previous.getFullYear() && date.getMonth() === previous.getMonth()
  }).length
  return { currentMonth, previousMonth, difference: currentMonth - previousMonth }
})

onMounted(() => void loadReviews())
</script>

<template>
  <section class="space-y-6">
    <div v-if="loading" class="rounded-lg border p-6 text-center text-base-content/70">Cargando reseñas...</div>
    <div v-else-if="error" class="rounded-lg border border-error/30 bg-error/10 p-6 text-error">{{ error }}</div>
    <template v-else>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="rounded-lg border p-4 bg-base-100/50">
          <p class="text-sm text-base-content/70">Promedio general</p>
          <p class="mt-2 text-3xl font-bold text-primary">{{ averageRating }} <span class="text-xl">/ 5</span></p>
        </div>
        <div class="rounded-lg border p-4 bg-base-100/50">
          <p class="text-sm text-base-content/70">Total de reseñas</p>
          <p class="mt-2 text-3xl font-bold">{{ reviews.length }}</p>
        </div>
        <div class="rounded-lg border p-4 bg-base-100/50">
          <p class="text-sm text-base-content/70">Tendencia mensual</p>
          <p class="mt-2 text-3xl font-bold" :class="trend.difference >= 0 ? 'text-success' : 'text-error'">
            {{ trend.difference >= 0 ? '+' : '' }}{{ trend.difference }}
          </p>
          <p class="text-xs text-base-content/60">{{ trend.currentMonth }} este mes · {{ trend.previousMonth }} anterior</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="rounded-lg border p-4 bg-base-100/50">
          <h2 class="font-semibold">Distribución de calificaciones</h2>
          <div class="mt-4 space-y-3">
            <div v-for="item in distribution" :key="item.rating" class="flex items-center gap-3 text-sm">
              <span class="w-12">{{ item.rating }} estrellas</span>
              <progress class="progress progress-primary h-2 flex-1" :value="item.percentage" max="100" />
              <span class="w-10 text-right text-base-content/70">{{ item.percentage }}%</span>
            </div>
          </div>
        </div>
        <div class="rounded-lg border p-4 bg-base-100/50">
          <h2 class="font-semibold">Resumen de tendencia</h2>
          <p class="mt-4 text-sm text-base-content/70">Comparativa de reseñas registradas entre el mes actual y el anterior.</p>
        </div>
      </div>

      <div class="rounded-lg border bg-base-100/50 p-4">
        <h2 class="font-semibold">Historial de reseñas</h2>
        <p v-if="!reviews.length" class="py-8 text-center text-base-content/70">No hay reseñas registradas aún</p>
        <div v-else class="mt-4 overflow-x-auto">
          <table class="table w-full">
            <thead><tr><th>Usuario</th><th>Valoración</th><th>Comentario</th><th>Fecha</th><th>Respuesta</th></tr></thead>
            <tbody>
              <tr v-for="review in reviews" :key="review.id">
                <td>{{ review.userName }}</td>
                <td class="text-primary">{{ review.rating }} / 5</td>
                <td class="min-w-56 whitespace-normal">{{ review.comment || 'Sin comentario' }}</td>
                <td>{{ formatDate(review.date) }}</td>
                <td class="min-w-48 whitespace-normal text-base-content/70">{{ review.restaurantResponse || 'Sin respuesta' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </section>
</template>