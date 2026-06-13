<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { dataUser, loadDataUserFromStorage } from '../store/dataUser'
import { restaurants } from '../data/restaurants'
import RestaurantCard from './RestaurantCard.vue'

const favoriteRestaurants = computed(() => {
  if (!dataUser.user?.favoriteRestaurant) return []
  
  return restaurants.filter(r => 
    dataUser.user?.favoriteRestaurant?.includes(r.slug)
  )
})

const hasFavorites = computed(() => favoriteRestaurants.value.length > 0)

onMounted(() => {
  loadDataUserFromStorage()
})
</script>

<template>
  <div>
    
    
    <div v-if="hasFavorites" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <RestaurantCard 
        v-for="restaurant in favoriteRestaurants"
        :key="restaurant.id"
        :r="restaurant"
      />
    </div>

    <div v-else class="py-12 text-center">
      <p>No tienes restaurantes favoritos aún. ¡Comienza a agregar algunos!</p>
    </div>
  </div>
</template>
