<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.28em] text-muted-foreground">Search results</p>
        <h1 class="text-3xl md:text-4xl font-bold">
          {{ query ? `Resultados para "${query}"` : 'Resultados de búsqueda' }}
        </h1>
        <p class="text-sm text-muted-foreground mt-2">
          {{ query
            ? `${results.length} restaurante${results.length === 1 ? '' : 's'} encontrados`
            : 'Ingresa un término de búsqueda en el dashboard o usa el campo de búsqueda para ver resultados.' }}
        </p>
      </div>

      <!-- El evento @submit.prevent evita que la página recargue y actualiza la URL de forma nativa -->
      <form @submit.prevent="updateSearchUrl" class="w-full max-w-xl">
        <label class="sr-only" for="search-query">Buscar restaurantes</label>
        <input
          id="search-query"
          type="search"
          v-model="query"
          placeholder="Buscar restaurantes, platos, barrios..."
          class="w-full h-12 rounded-full border border-border/60 bg-surface px-4 text-sm text-foreground outline-none focus:border-lime/60 focus:ring-2 focus:ring-lime/20"
        />
      </form>
    </div>

    <div v-if="normalizedQuery && results.length === 0" class="rounded-3xl border border-yellow-300 bg-yellow-100/80 p-6 text-sm text-yellow-900">
      No se encontraron restaurantes para "{{ query }}". Intenta otra búsqueda.
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <!-- Iteramos sobre tus componentes existentes de RestaurantCard pasándoles la prop -->
      <RestaurantCard 
        v-for="restaurant in results" 
        :key="restaurant.id" 
        :r="restaurant" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import RestaurantCard from '../RestaurantCard.vue';
import { restaurants } from '../../data/restaurants';

const query = ref('');

// Sincroniza el input con la URL del navegador al cargar la página (?q=...)
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  query.value = params.get('q') || '';
});

// Actualiza la URL visible sin recargar la pantalla completa
const updateSearchUrl = () => {
  const url = new URL(window.location.href);
  if (query.value.trim()) {
    url.searchParams.set('q', query.value.trim());
  } else {
    url.searchParams.delete('q');
  }
  window.history.replaceState({}, '', url);
};

const normalizedQuery = computed(() => query.value.trim().toLowerCase());

const normalizeString = (value) => {
  if (!value) return '';
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Reactividad pura de Vue: se ejecuta instantáneamente al escribir o cambiar la URL
const results = computed(() => {
  const terms = normalizedQuery.value.split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return restaurants.filter((restaurant) => {
    const tagsArray = Array.isArray(restaurant.tags) ? restaurant.tags : [];
    const fields = [
      restaurant.name,
      restaurant.cuisine,
      restaurant.category,
      restaurant.description,
      restaurant.address,
      restaurant.phone,
      restaurant.email,
      ...tagsArray,
    ].map(normalizeString);

    return terms.every((term) =>
      fields.some((field) => field.includes(term))
    );
  });
});
</script>
