<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SubmitImages from './UI/submitImages.vue';

interface RestaurantProfile {
  id?: number | string
  name: string
  category: string
  cuisine: string
  description: string
  rating: number | string
  distance: number | string
  priceRange: string
  promoted: boolean
  phone: string
  email: string
  address: string
  location: string
}

interface ReviewSummary {
  rating: number
}

const props = defineProps<{
  restaurantId?: number | string | null
}>()

const restaurant = ref<RestaurantProfile>({
  name: '',
  category: '',
  cuisine: '',
  description: '',
  rating: 0,
  distance: 0,
  priceRange: '',
  promoted: false,
  phone: '',
  email: '',
  address: '',
  location: '',
})

const message = ref('')
const isSaving = ref(false)
const activeTab = ref<'profile' | 'stats'>('profile')
const reviewSummaries = ref<ReviewSummary[]>([])
const isLoadingReviews = ref(false)

const getRestaurantId = () => {
  if (props.restaurantId) {
    return String(props.restaurantId)
  }

  if (typeof window === 'undefined') return ''

  const fromStorage = localStorage.getItem('restaurantId')
  if (fromStorage) return fromStorage

  const fromSession = sessionStorage.getItem('restaurantId')
  if (fromSession) return fromSession

  return ''
}

const loadRestaurant = async () => {
  const restaurantId = getRestaurantId()

  if (!restaurantId) {
    message.value = 'No se encontró el ID del restaurante.'
    return
  }

  try {
    const response = await fetch(`/api/restaurant?id=${encodeURIComponent(restaurantId)}`)
    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'No se pudo cargar el restaurante')
    }

    restaurant.value = {
      ...restaurant.value,
      ...data.restaurant,
    }
  } catch (error) {
    console.error('Error cargando restaurante:', error)
    message.value = 'No se pudo cargar la información del restaurante.'
  }
}

/**
 * Carga las reseñas del restaurante asociado a la sesión.
 * @returns Promise resuelta al terminar la consulta.
 */
const loadReviewSummary = async () => {
  isLoadingReviews.value = true
  try {
    const response = await fetch('/api/admin/reviews')
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'No se pudieron cargar las reseñas')
    reviewSummaries.value = Array.isArray(data.reviews) ? data.reviews : []
  } catch (error) {
    console.error('Error cargando resumen de reseñas:', error)
  } finally {
    isLoadingReviews.value = false
  }
}

const reviewAverage = computed(() => {
  if (!reviewSummaries.value.length) return '0.0'
  return (reviewSummaries.value.reduce((sum, review) => sum + review.rating, 0) / reviewSummaries.value.length).toFixed(1)
})

const saveRestaurant = async () => {
  isSaving.value = true
  message.value = ''

  try {
    const payload = {
      id: restaurant.value.id,
      name: restaurant.value.name,
      category: restaurant.value.category,
      cuisine: restaurant.value.cuisine,
      description: restaurant.value.description,
      phone: restaurant.value.phone,
      email: restaurant.value.email,
      address: restaurant.value.address,
      priceRange: restaurant.value.priceRange,
      promoted: restaurant.value.promoted,
    }

    const response = await fetch('/api/restaurant', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'No se pudo guardar')
    }

    message.value = 'Cambios guardados correctamente.'
  } catch (error) {
    console.error('Error guardando restaurante:', error)
    message.value = 'No se pudieron guardar los cambios.'
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  void loadRestaurant()
  void loadReviewSummary()
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
    <div class="mx-auto w-full space-y-6">
      <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
        <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Restaurant Admin</p>
            <h1 class="text-3xl font-bold tracking-tight">Ajustes del restaurante</h1>
            <p class="mt-2 text-sm text-zinc-400">
              Edita la información de tu negocio y revisa métricas clave.
            </p>
          </div>
        </div>
      </div>

      <div v-if="message"
        class="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-300">
        {{ message }}
      </div>

      <div class="flex gap-3">
        <button class="rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
          :class="activeTab === 'profile' ? 'bg-orange-500 text-zinc-950' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'"
          @click="activeTab = 'profile'">
          Perfil del Restaurante
        </button>
       
      </div>

      <div v-if="activeTab === 'profile'" class="w-full grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
          <h2 class="text-xl font-semibold">Información del Restaurante</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <label class="block">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Nombre</span>
              <input v-model="restaurant.name"
                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Categoría</span>
              <input v-model="restaurant.category"
                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Tipo de cocina</span>
              <input v-model="restaurant.cuisine"
                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Rango de precios</span>
              <input v-model="restaurant.priceRange"
                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Teléfono</span>
              <input v-model="restaurant.phone"
                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Correo</span>
              <input v-model="restaurant.email" type="email"
                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>

            <label class="block md:col-span-2">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Dirección</span>
              <input v-model="restaurant.address"
                class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>

            <label class="block md:col-span-2">
              <span class="mb-2 block text-sm font-medium text-zinc-300">Descripción</span>
              <textarea v-model="restaurant.description"
                class="min-h-30 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500" />
            </label>


          </div>
          <SubmitImages :restaurantId="restaurantId"
            :initialImage="restaurant.image || 'https://pub-d80845b9e313461db9d75fa6897f1bf3.r2.dev/avatar-user.jpg'" />
          <div class="mt-6 flex justify-end">
            <button
              class="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="isSaving" @click="saveRestaurant">
              {{ isSaving ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </section>

        
      </div>

      <div v-else-if="activeTab === 'stats'" class="grid gap-6 md:grid-cols-3">
        <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
          <p class="text-sm text-zinc-400">Promedio general</p>
          <p class="mt-2 text-3xl font-bold text-orange-400">{{ isLoadingReviews ? '...' : reviewAverage }}</p>
        </div>
        <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
          <p class="text-sm text-zinc-400">Reseñas recibidas</p>
          <p class="mt-2 text-3xl font-bold text-emerald-400">{{ isLoadingReviews ? '...' : reviewSummaries.length }}
          </p>
        </div>
        <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg shadow-black/20">
          <p class="text-sm text-zinc-400">Distancia registrada</p>
          <p class="mt-2 text-3xl font-bold text-sky-400">{{ restaurant.distance }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
