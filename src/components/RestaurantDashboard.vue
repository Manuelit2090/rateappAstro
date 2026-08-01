<script setup lang="ts">
import { onMounted, ref } from 'vue'

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

const getRestaurantId = () => {
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
})
</script>

<template>
  <div class="min-h-screen bg-base-100 px-4 py-8 text-base-content">
    <div class="mx-auto max-w-6xl space-y-6">
      <div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Restaurant Admin</p>
            <h1 class="text-3xl font-bold">Panel de control del restaurante</h1>
            <p class="mt-2 text-sm text-base-content/70">
              Edita la información de tu negocio y revisa métricas clave.
            </p>
          </div>
        </div>
      </div>

      <div v-if="message" class="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
        {{ message }}
      </div>

      <div class="flex gap-3">
        <button
          class="btn"
          :class="activeTab === 'profile' ? 'btn-primary' : 'btn-ghost'"
          @click="activeTab = 'profile'"
        >
          Perfil del Restaurante
        </button>
        <button
          class="btn"
          :class="activeTab === 'stats' ? 'btn-primary' : 'btn-ghost'"
          @click="activeTab = 'stats'"
        >
          Estadísticas Rápidas
        </button>
      </div>

      <div v-if="activeTab === 'profile'" class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 class="text-xl font-semibold">Información del negocio</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <label class="block">
              <span class="mb-2 block text-sm font-medium">Nombre</span>
              <input v-model="restaurant.name" class="input input-bordered w-full" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium">Categoría</span>
              <input v-model="restaurant.category" class="input input-bordered w-full" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium">Tipo de cocina</span>
              <input v-model="restaurant.cuisine" class="input input-bordered w-full" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium">Rango de precios</span>
              <input v-model="restaurant.priceRange" class="input input-bordered w-full" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium">Teléfono</span>
              <input v-model="restaurant.phone" class="input input-bordered w-full" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium">Correo</span>
              <input v-model="restaurant.email" type="email" class="input input-bordered w-full" />
            </label>

            <label class="block md:col-span-2">
              <span class="mb-2 block text-sm font-medium">Dirección</span>
              <input v-model="restaurant.address" class="input input-bordered w-full" />
            </label>

            <label class="block md:col-span-2">
              <span class="mb-2 block text-sm font-medium">Descripción</span>
              <textarea v-model="restaurant.description" class="textarea textarea-bordered w-full min-h-[120px]" />
            </label>

            <label class="flex items-center gap-3 rounded-2xl border border-base-300 px-4 py-3 md:col-span-2">
              <input v-model="restaurant.promoted" type="checkbox" class="checkbox checkbox-primary" />
              <span class="text-sm font-medium">Promocionado</span>
            </label>
          </div>

          <div class="mt-6 flex justify-end">
            <button class="btn btn-primary" :disabled="isSaving" @click="saveRestaurant">
              {{ isSaving ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </section>

        <aside class="space-y-6">
          <div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <h3 class="text-lg font-semibold">Resumen rápido</h3>
            <div class="mt-4 space-y-3">
              <div class="rounded-2xl bg-primary/10 p-4">
                <p class="text-sm text-base-content/70">Estado</p>
                <p class="text-lg font-semibold text-primary">
                  {{ restaurant.promoted ? 'Promocionado' : 'Normal' }}
                </p>
              </div>
              <div class="rounded-2xl bg-secondary/10 p-4">
                <p class="text-sm text-base-content/70">Ubicación</p>
                <p class="text-lg font-semibold text-secondary">{{ restaurant.location || 'Sin ubicación' }}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div v-else-if="activeTab === 'stats'" class="grid gap-6 md:grid-cols-3">
        <div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <p class="text-sm text-base-content/70">Rating actual</p>
          <p class="mt-2 text-3xl font-bold text-primary">{{ restaurant.rating }}</p>
        </div>
        <div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <p class="text-sm text-base-content/70">Reseñas recibidas</p>
          <p class="mt-2 text-3xl font-bold text-secondary">{{ restaurant.rating ? '24' : '0' }}</p>
        </div>
        <div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <p class="text-sm text-base-content/70">Distancia registrada</p>
          <p class="mt-2 text-3xl font-bold text-accent">{{ restaurant.distance }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
