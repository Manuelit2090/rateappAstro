<script setup lang="ts">
import { onMounted } from 'vue';
import { dataUser, loadDataUserFromStorage, logoutUser } from '../store/dataUser';

onMounted(() => {
  loadDataUserFromStorage();
});
</script>

<template>
  <div v-if="dataUser.user" class="space-y-4 bg-base-200 p-6 rounded-lg">
    <h3 class="text-lg font-bold">Perfil del Usuario</h3>
    
    <div class="space-y-2 text-sm">
      <p><strong>Nombre:</strong> {{ dataUser.user.name }}</p>
      <p><strong>Email:</strong> {{ dataUser.user.email }}</p>
      <p><strong>Puntos totales:</strong> {{ dataUser.user.totalPoints }}</p>
      <p><strong>Reseñas:</strong> {{ dataUser.user.totalReviews }}</p>
      <p><strong>Restaurantes favoritos:</strong> {{ dataUser.user.favoriteRestaurant.length }}</p>
      <p v-if="dataUser.user.currentLocation">
        <strong>Ubicación:</strong> {{ dataUser.user.currentLocation.lat }}, {{ dataUser.user.currentLocation.lng }}
      </p>
    </div>

    <button 
      @click="logoutUser()" 
      class="btn btn-sm btn-outline"
    >
      Cerrar sesión
    </button>
  </div>
  
  <div v-else class="text-center text-muted-foreground">
    No hay usuario logueado
  </div>
</template>
