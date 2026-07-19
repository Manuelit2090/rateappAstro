<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadDataUserFromAPI } from '../store/dataUser'
import { favoriteService } from '../lib/api'
import RestaurantCard from './RestaurantCard.vue'
import HeaderPage from './UI/HeaderPage.vue'

const favorites = ref<any[]>([])
const loading = ref(true)
const error = ref('')

async function loadFavoriteRestaurants() {
  loading.value = true
  error.value = ''

  try {
    const response = await favoriteService.getAll()
    favorites.value = response.favorites ?? []
  } catch (err) {
    console.error('Error cargando favoritos:', err)
    error.value = 'No se pudieron cargar tus restaurantes favoritos.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadDataUserFromAPI()
  await loadFavoriteRestaurants()
})
</script>

<template>
  <div>
    <HeaderPage title="Favoritos" subtitle="Encuentra tus Restaurantes Favoritos" />
    <div class="my-4 mx-4">
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block">
          <div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
        <p class="mt-4 text-neutral">Cargando tus favoritos...</p>
      </div>

      <div v-else-if="error" class="py-12 text-center text-error">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="favorites.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RestaurantCard v-for="restaurant in favorites" :key="restaurant.slug" :r="restaurant" />
      </div>

      <div v-else class="py-12 text-center">
        <p>No tienes restaurantes favoritos aún. ¡Comienza a agregar algunos!</p>
      </div>
    </div>
  </div>

</template>
