<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { storeUbicacion as ubication } from './UI/storeUbication.ts';
import { dataUser, loadDataUserFromAPI, logoutUser } from '../store/dataUser';
import HeaderPage from './UI/HeaderPage.vue';
// Declaramos la variable reactiva con un estado inicial de carga
const ciudad = ref<string>('Cargando ubicación...');
const routePath = ref('');

onMounted(async () => {
  await loadDataUserFromAPI();

  if (typeof window !== 'undefined') {
    routePath.value = window.location.pathname
    await ubication.detectarUbicacion();
  }
});

// Obtiene la inicial del usuario para el avatar en caso de no tener foto
const userInitial = computed(() => {
  return dataUser.user?.name ? dataUser.user.name.charAt(0).toUpperCase() : '?';
});
</script>

<template>
  <div class="w-full mx-auto p-4">
    <div v-if="dataUser.user" class="space-y-6">
      <HeaderPage title="perfil" subtitle="Encuentra us estadisticas e información"/>
      <!-- 1. CARD PRINCIPAL: PERFIL Y AVATAR -->
      <div class="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
        <!-- Banner decorativo superior -->
        <div class="h-32 bg-linear-to-r from-primary to-primary-content"></div>
        
        <div class="card-body relative pt-0 flex flex-col md:flex-row gap-6 items-center md:items-end -mt-16">
          <!-- Avatar de DaisyUI -->
          <div class="avatar placeholder">
            <div class=" w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-neutral text-base-content text-6xl font-bold">
              <span class="w-full h-full flex justify-center items-center">{{ userInitial }}</span>
            </div>
          </div>
          
          <!-- Información básica y botón -->
          <div class="flex-1 text-center md:text-left space-y-1">
            <h2 class="card-title text-2xl font-bold justify-center md:justify-start">
              {{ dataUser.user.name }}
            </h2>
            <p class="text-base-content/70 flex items-center justify-center md:justify-start gap-2">
              <svg xmlns="http://w3.org" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {{ dataUser.user.email }}
            </p>
          </div>

          <div class="mt-4 md:mt-0">
            <button @click="logoutUser()" class="btn btn-error btn-outline btn-sm gap-2">
              <svg xmlns="http://w3.org" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      <!-- 2. GRID DE ESTADÍSTICAS (STATS COMPONENT DE DAISYUI) -->
      <div class="stats stats-vertical lg:stats-horizontal shadow bg-base-100 w-full border border-base-200">
        
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div class="stat-title font-medium">Puntos Totales</div>
          <div class="stat-value text-primary">{{ dataUser.user.totalPoints }}</div>
          <div class="stat-desc">Acumulados en tu cuenta</div>
        </div>
        
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.582 1.832l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.978-2.89c-.778-.58-.38-1.832.582-1.832h4.906a1 1 0 00.95-.69l1.519-4.674z"></path></svg>
          </div>
          <div class="stat-title font-medium">Reseñas Escritas</div>
          <div class="stat-value text-secondary">{{ dataUser.user.totalReviews }}</div>
          <div class="stat-desc">Opiniones compartidas</div>
        </div>
        
        <div class="stat">
          <div class="stat-figure text-accent">
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div class="stat-title font-medium">Favoritos</div>
          <div class="stat-value text-accent">{{ dataUser.user.favoriteRestaurant?.length || 0 }}</div>
          <div class="stat-desc">Restaurantes guardados</div>
        </div>
        
      </div>

      <!-- 3. DETALLES ADICIONALES (UBICACIÓN) -->
      <div v-if="dataUser.user.currentLocation" class="card bg-base-100 shadow-md border border-base-200">
        <div class="card-body p-4 flex flex-row items-center gap-4">
          <div class="p-3 bg-base-200 rounded-lg text-base-content">
            <svg xmlns="http://w3.org" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <h4 class="text-sm font-semibold opacity-70">Ubicación Actual</h4>
            <p class="text-sm font-mono text-secondary">
              Ciudad: {{ ubication.ciudad}}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- ESTADO SIN LOGUEAR -->
    <div v-else class="hero min-h-[300px] bg-base-200 rounded-xl">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <svg xmlns="http://w3.org" class="h-14 w-14 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          <h3 class="text-xl font-bold opacity-80">No hay sesión activa</h3>
          <p class="py-2 text-sm opacity-60">Por favor, inicia sesión para ver tu perfil y estadísticas.</p>
        </div>
      </div>
    </div>
  </div>
</template>
