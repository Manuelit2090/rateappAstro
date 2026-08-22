/**
 * @file RestaurantProfileGrid.vue
 * @description Muestra la información del restaurante en una vista tipo grilla usando props.
 * @depends vue
 */

<script setup lang="ts">
import { computed } from 'vue'

interface RestaurantData {
  id?: number | string
  name?: string
  slug?: string
  category?: string
  cuisine?: string
  description?: string
  rating?: number | string | null
  distance?: number | string | null
  priceRange?: string | null
  promoted?: boolean
  phone?: string | null
  email?: string | null
  address?: string | null
  location?: string | null
}

const props = defineProps<{
  restaurant: RestaurantData | null
}>()

const restaurant = computed(() => props.restaurant ?? null)

const infoItems = computed(() => {
  if (!restaurant.value) return []

  return [
    { label: 'Nombre', value: restaurant.value.name || '—' },
    { label: 'Categoría', value: restaurant.value.category || '—' },
    { label: 'Tipo de cocina', value: restaurant.value.cuisine || '—' },
    { label: 'Rango de precio', value: restaurant.value.priceRange || '—' },
    { label: 'Teléfono', value: restaurant.value.phone || '—' },
    { label: 'Correo', value: restaurant.value.email || '—' },
    { label: 'Dirección', value: restaurant.value.address || '—' },
    { label: 'Ubicación', value: restaurant.value.location || '—' },
    { label: 'Valoración', value: restaurant.value.rating ? String(restaurant.value.rating) : '—' },
    { label: 'Distancia', value: restaurant.value.distance ? String(restaurant.value.distance) : '—' },
    { label: 'Promocionado', value: restaurant.value.promoted ? 'Sí' : 'No' },
  ]
})
</script>

<template>
  <section v-if="restaurant" class="w-full rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
    <div class="mb-6 flex items-center justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Restaurante</p>
        <h2 class="mt-2 text-2xl font-bold text-base-content">{{ restaurant.name || 'Sin nombre' }}</h2>
      </div>
      <span class="badge badge-primary badge-lg">
        {{ restaurant.promoted ? 'Destacado' : 'Normal' }}
      </span>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="item in infoItems"
        :key="item.label"
        class="rounded-2xl border border-base-300 bg-base-200/40 p-4"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">{{ item.label }}</p>
        <p class="mt-3 text-base font-semibold text-base-content">{{ item.value }}</p>
      </article>
    </div>

    <div v-if="restaurant.description" class="mt-6 rounded-2xl border border-base-300 bg-base-200/30 p-4">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Descripción</p>
      <p class="mt-3 text-sm leading-6 text-base-content/80">{{ restaurant.description }}</p>
    </div>
  </section>

  <div v-else class="alert alert-warning">
    <span>No hay ningun restaurante registrado, iniciando creando uno</span>
    <a href="/admin/create">
      <button class="p-2 border rounded-lg">
        <span class="text-sm font-semibold">Crear restaurante</span>
        </button>

    </a>
  </div>
</template>
