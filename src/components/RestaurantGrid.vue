<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RestaurantCard from './RestaurantCard.vue'
import { restaurantService } from '../lib/api'

// 1. Definimos las Props para recibir datos desde Astro
const props = defineProps<{
  initialRestaurants?: any[]
}>()

// 2. Inicializamos el estado con los datos del servidor (si existen)
const restaurants = ref<any[]>(props.initialRestaurants ?? [])
// Si ya tenemos datos del servidor, no mostramos el spinner de carga
const loading = ref(!props.initialRestaurants) 
const error = ref('')

async function loadRestaurants() {
  // Si ya tenemos datos iniciales, no hace falta hacer el fetch en el onMounted
  if (props.initialRestaurants && props.initialRestaurants.length > 0) {
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await restaurantService.search('', undefined, 1)
    restaurants.value = response.restaurants ?? []
  } catch (err) {
    console.error('Error cargando restaurantes:', err)
    error.value = 'Error al cargar restaurantes desde la base de datos.'
  } finally {
    loading.value = false
  }
}

onMounted(loadRestaurants)
</script>

<template>
  <div class="space-y-6">
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
        No se encontraron restaurantes.
      </div>

      <div v-else class="grid md:grid-cols-2 gap-6">
        <RestaurantCard v-for="r in restaurants" :key="r.slug" :r="r" />
      </div>
    </div>
  </div>
</template>
