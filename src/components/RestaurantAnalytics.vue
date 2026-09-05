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
    <!-- Estado de Carga -->
    <div v-if="loading" class="card bg-base-100 border border-base-200 shadow-xl p-12 text-center">
      <div class="flex flex-col items-center justify-center gap-3">
        <span class="loading loading-spinner loading-lg text-warning"></span>
        <p class="text-sm font-semibold opacity-70">Cargando métricas y reseñas...</p>
      </div>
    </div>

    <!-- Estado de Error -->
    <div v-else-if="error" class="alert alert-error shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ error }}</span>
    </div>

    <template v-else>
      <!-- BLOQUE 1: Métricas Principales (Stats) -->
      <div class="stats stats-vertical md:stats-horizontal shadow-xl bg-base-100 border border-base-200 w-full">
        <div class="stat">
          <div class="stat-title text-xs font-bold uppercase tracking-wider">Promedio general</div>
          <div class="stat-value text-warning flex items-baseline gap-1">
            <span>{{ averageRating }}</span>
            <span class="text-base font-medium text-base-content/50">/ 5</span>
          </div>
          <div class="stat-desc font-semibold text-warning">★ Basado en calificaciones</div>
        </div>

        <div class="stat">
          <div class="stat-title text-xs font-bold uppercase tracking-wider">Total de reseñas</div>
          <div class="stat-value text-base-content">{{ reviews.length }}</div>
          <div class="stat-desc">Opiniones registradas</div>
        </div>

        <div class="stat">
          <div class="stat-title text-xs font-bold uppercase tracking-wider">Tendencia mensual</div>
          <div class="stat-value" :class="trend.difference >= 0 ? 'text-success' : 'text-error'">
            {{ trend.difference >= 0 ? '+' : '' }}{{ trend.difference }}
          </div>
          <div class="stat-desc">
            <span class="font-bold text-base-content">{{ trend.currentMonth }}</span> este mes · <span class="opacity-70">{{ trend.previousMonth }} anterior</span>
          </div>
        </div>
      </div>

      <!-- BLOQUE 2: Desglose de Rendimiento -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Distribución de estrellas -->
        <div class="card bg-base-100 border border-base-200 shadow-xl">
          <div class="card-body p-6">
            <h2 class="card-title text-base font-bold">Distribución de calificaciones</h2>
            <div class="mt-4 space-y-3">
              <div v-for="item in distribution" :key="item.rating" class="flex items-center gap-3 text-sm">
                <span class="w-20 font-semibold flex items-center gap-1">
                  {{ item.rating }} <span class="text-warning">★</span>
                </span>
                <progress class="progress progress-warning h-2.5 flex-1" :value="item.percentage" max="100" />
                <span class="w-12 text-right font-bold text-base-content/70">{{ item.percentage }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen Comparativo -->
        <div class="card bg-base-100 border border-base-200 shadow-xl">
          <div class="card-body p-6 justify-between">
            <div>
              <h2 class="card-title text-base font-bold">Resumen de tendencia</h2>
              <p class="mt-2 text-sm opacity-70 leading-relaxed">
                Comparativa directa entre la cantidad de interacción obtenida en el ciclo actual versus el periodo anterior.
              </p>
            </div>

            <div class="rounded-2xl bg-base-200/50 p-4 border border-base-200 space-y-2 mt-4">
              <div class="flex justify-between items-center text-sm">
                <span class="font-medium opacity-70">Reseñas este mes:</span>
                <span class="font-bold badge badge-neutral">{{ trend.currentMonth }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="font-medium opacity-70">Reseñas mes anterior:</span>
                <span class="font-bold badge badge-ghost">{{ trend.previousMonth }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BLOQUE 3: Tabla de Historial -->
      <div class="card bg-base-100 border border-base-200 shadow-xl">
        <div class="card-body p-6">
          <h2 class="card-title text-base font-bold mb-2">Historial de reseñas</h2>
          
          <div v-if="!reviews.length" class="py-12 text-center text-base-content/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 opacity-30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p class="font-semibold">No hay reseñas registradas aún</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr class="text-xs uppercase font-extrabold text-base-content/60">
                  <th>Usuario</th>
                  <th>Valoración</th>
                  <th>Comentario</th>
                  <th>Fecha</th>
                  <th>Respuesta</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in reviews" :key="review.id" class="hover">
                  <td class="font-bold">{{ review.userName }}</td>
                  <td>
                    <div class="flex items-center gap-1 font-bold text-warning">
                      <span>★</span>
                      <span>{{ review.rating }}</span>
                    </div>
                  </td>
                  <td class="min-w-56 max-w-xs whitespace-normal text-sm leading-snug">
                    {{ review.comment || 'Sin comentario' }}
                  </td>
                  <td class="text-xs opacity-70 whitespace-nowrap">{{ formatDate(review.date) }}</td>
                  <td class="min-w-48 max-w-xs whitespace-normal">
                    <span v-if="review.restaurantResponse" class="text-xs bg-base-200 p-2 rounded-lg block border border-base-300">
                      {{ review.restaurantResponse }}
                    </span>
                    <span v-else class="badge badge-ghost badge-sm opacity-60">Sin respuesta</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>