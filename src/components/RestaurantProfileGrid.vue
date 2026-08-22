/**
 * @file RestaurantProfileGrid.vue
 * @description Vista del perfil de restaurante estructurada en un Grid de bloques/tarjetas independientes.
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
  image?: string | null
}

const props = defineProps<{
  restaurant: RestaurantData | null
}>()

const DEFAULT_IMAGE = 'https://pub-d80845b9e313461db9d75fa6897f1bf3.r2.dev/avatar-user.jpg'

const restaurant = computed(() => props.restaurant ?? null)

// Fallback de imagen
const headerImage = computed(() => {
  return restaurant.value?.image?.trim() ? restaurant.value.image : DEFAULT_IMAGE
})
</script>

<template>
  <div v-if="restaurant" class="w-full space-y-6">
    <!-- HERO HEADER (Ancho completo, bordes redondeados y sombra) -->
    <header class="relative w-full h-64 sm:h-80 rounded-3xl border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300 overflow-hidden shadow-sm bg-base-300">
      <img
        :src="headerImage"
        :alt="restaurant.name || 'Restaurante'"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

      <!-- Información interna del Header -->
      <div class="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
        <div class="space-y-2">
          <div class="flex items-center gap-2 flex-wrap ">
            <span v-if="restaurant.promoted" class="badge badge-primary font-semibold text-xs uppercase tracking-wider">
              Destacado
            </span>
            <span v-if="restaurant.category" class="badge badge-neutral text-xs bg-white/20 text-white border-none font-semibold uppercase tracking-wider">
              {{ restaurant.category }}
            </span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {{ restaurant.name || 'Sin nombre registrado' }}
          </h1>
        </div>

        <div v-if="restaurant.priceRange" class="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 self-start sm:self-auto border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300">
          <span class="text-[10px] uppercase font-bold tracking-wider text-white/70 block">Rango de precio</span>
          <span class="text-lg font-bold text-white">{{ restaurant.priceRange }}</span>
        </div>
      </div>
    </header>

    <!-- GRID DE BLOQUES INDEPENDIENTES -->
    <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">

      <!-- BLOQUE 1: Descripción (Ocupa 2 columnas en pantallas medianas/grandes) -->
      <article class="sm:col-span-2 lg:col-span-2 rounded-3xl border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300 bg-base-100 p-6 shadow-sm space-y-3">
        <div class="flex items-center gap-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60">
            Descripción
          </h3>
        </div>
        <p class="text-base text-base-content/80 leading-relaxed">
          {{ restaurant.description || 'Sin descripción disponible para este restaurante.' }}
        </p>
      </article>

      <!-- BLOQUE 2: Métricas Rápidas -->
      <article class="rounded-3xl border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300 bg-base-100 p-6 shadow-sm space-y-4">
        <div class="flex items-center gap-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60">
            Métricas
          </h3>
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 rounded-2xl bg-base-200/50 border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300">
            <span class="text-xs font-semibold text-base-content/70">Valoración</span>
            <span class="text-sm font-bold text-base-content">
              {{ restaurant.rating ? `⭐ ${restaurant.rating}` : '—' }}
            </span>
          </div>

          <div class="flex items-center justify-between p-3 rounded-2xl bg-base-200/50 border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300">
            <span class="text-xs font-semibold text-base-content/70">Distancia</span>
            <span class="text-sm font-bold text-base-content">
              {{ restaurant.distance ? `${restaurant.distance} km` : '—' }}
            </span>
          </div>

          <div class="flex items-center justify-between p-3 rounded-2xl bg-base-200/50 border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300">
            <span class="text-xs font-semibold text-base-content/70">Estado Promocional</span>
            <span class="text-xs font-bold badge badge-sm" :class="restaurant.promoted ? 'badge-primary' : 'badge-ghost'">
              {{ restaurant.promoted ? 'Promocionado' : 'Estándar' }}
            </span>
          </div>
        </div>
      </article>

      <!-- BLOQUE 3: Información de Contacto -->
      <article class="rounded-3xl border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300 bg-base-100 p-6 shadow-sm space-y-4">
        <div class="flex items-center gap-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60">
            Contacto
          </h3>
        </div>

        <div class="space-y-3">
          <div>
            <p class="text-[11px] font-semibold text-base-content/50 uppercase">Teléfono</p>
            <p class="text-sm font-medium text-base-content mt-0.5 break-all">
              {{ restaurant.phone || '—' }}
            </p>
          </div>
          <div class="border-t border-base-200 pt-3">
            <p class="text-[11px] font-semibold text-base-content/50 uppercase">Correo Electrónico</p>
            <p class="text-sm font-medium text-base-content mt-0.5 break-all">
              {{ restaurant.email || '—' }}
            </p>
          </div>
        </div>
      </article>

      <!-- BLOQUE 4: Ubicación y Dirección -->
      <article class="rounded-3xl border border-base-300/60 bg-base-100/60 hover:border-primary/40 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300 bg-base-100 p-6 shadow-sm space-y-4">
        <div class="flex items-center gap-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60">
            Ubicación
          </h3>
        </div>

        <div class="space-y-3">
          <div>
            <p class="text-[11px] font-semibold text-base-content/50 uppercase">Dirección</p>
            <p class="text-sm font-medium text-base-content mt-0.5">
              {{ restaurant.address || '—' }}
            </p>
          </div>
          <div class="border-t border-base-200 pt-3">
            <p class="text-[11px] font-semibold text-base-content/50 uppercase">Ciudad / Zona</p>
            <p class="text-sm font-medium text-base-content mt-0.5">
              {{ restaurant.location || '—' }}
            </p>
          </div>
        </div>
      </article>

      <!-- BLOQUE 5: Estilo y Gastronomía -->
      <article class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm space-y-4">
        <div class="flex items-center gap-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-base-content/60">
            Gastronomía
          </h3>
        </div>

        <div class="space-y-3">
          <div>
            <p class="text-[11px] font-semibold text-base-content/50 uppercase">Categoría</p>
            <p class="text-sm font-medium text-base-content mt-0.5">
              {{ restaurant.category || '—' }}
            </p>
          </div>
          <div class="border-t border-base-200 pt-3">
            <p class="text-[11px] font-semibold text-base-content/50 uppercase">Tipo de Cocina</p>
            <p class="text-sm font-medium text-base-content mt-0.5">
              {{ restaurant.cuisine || '—' }}
            </p>
          </div>
        </div>
      </article>

    </section>
  </div>

  <!-- EMPTY STATE (Si no hay datos de restaurante) -->
  <div v-else class="w-full rounded-3xl border border-dashed border-base-300 bg-base-100 p-8 sm:p-12 text-center shadow-sm">
    <div class="mx-auto max-w-sm space-y-4">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/10 text-warning">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <div>
        <h3 class="text-lg font-bold text-base-content">No hay restaurante registrado</h3>
        <p class="mt-1 text-sm text-base-content/60">Inicia creando uno nuevo para empezar a gestionar sus datos.</p>
      </div>
      <a href="/admin/create" class="inline-block w-full">
        <button class="btn btn-primary w-full rounded-xl">
          Crear restaurante
        </button>
      </a>
    </div>
  </div>
</template>