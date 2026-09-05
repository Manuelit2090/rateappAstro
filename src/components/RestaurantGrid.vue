<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RestaurantCard from './RestaurantCard.vue'
import { restaurantService } from '../lib/api'
import { storeUbicacion } from './UI/storeUbication'

// 1. Definimos las Props para recibir datos desde Astro
const props = defineProps<{
  initialRestaurants?: any[]
}>()

// 2. Inicializamos el estado con los datos del servidor (si existen)
const restaurants = ref<any[]>(props.initialRestaurants ?? [])
// Si ya tenemos datos del servidor, no mostramos el spinner de carga
const loading = ref(true)
const error = ref('')
const locationStatus = ref('')

async function loadRestaurants() {
  loading.value = true
  error.value = ''
  locationStatus.value = 'Obteniendo tu ubicación...'

  try {
    await storeUbicacion.detectarUbicacion()
    const coordinates = storeUbicacion.getCoordinates()

    if (!coordinates) {
      restaurants.value = []
      locationStatus.value = ''
      error.value = 'No pudimos obtener tu ubicación. Concede permiso para buscar restaurantes entre 4 y 6 km.'
      return
    }

    const response = await restaurantService.getNearby(coordinates.lat, coordinates.lng)
    restaurants.value = Array.isArray(response.restaurants) ? response.restaurants : []
    locationStatus.value = `Mostrando restaurantes entre ${response.minDistanceKm ?? 4} y ${response.maxDistanceKm ?? 6} km`
  } catch (err) {
    console.error('Error cargando restaurantes:', err)
    error.value = 'Error al cargar restaurantes desde la base de datos.'
    restaurants.value = []
    locationStatus.value = ''
  } finally {
    loading.value = false
  }
}

onMounted(loadRestaurants)
</script>

<template>
  <div class="space-y-6">
    <p v-if="locationStatus" class="text-sm text-neutral">
      {{ locationStatus }}
    </p>
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block">
        <div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
      <p class="mt-4 text-neutral">Cargando restaurantes...</p>
    </div>

    <div v-else-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>

    <div v-else>
      <div v-if="restaurants.length === 0" class="text-center py-20 text-neutral rounded-3xl border border-base-300/60 bg-base-100/40">
        No hay restaurantes disponibles entre 4 y 6 km.
      </div>

      <div v-else class="grid md:grid-cols-2 gap-6">
        <RestaurantCard v-for="r in restaurants" :key="r.slug" :r="r" />
      </div>
    </div>
  </div>
</template>
