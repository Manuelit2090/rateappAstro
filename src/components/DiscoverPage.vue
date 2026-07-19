<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Compass, TrendingUp, MapPin, Sparkles, Flame } from 'lucide-vue-next'
import RestaurantCard from './RestaurantCard.vue'
import HeaderPage from './UI/HeaderPage.vue'
import { restaurantService } from '../lib/api'

const filters = ['All', 'Trending', 'New', 'Promoted', 'Top rated'] as const
type Filter = typeof filters[number]

const activeFilter = ref<Filter>('All')
const query = ref('')
const restaurants = ref<any[]>([])
const loading = ref(false)
const error = ref('')

const featured = computed(() => restaurants.value[0] ?? null)

const list = computed(() => {
  let r = [...restaurants.value]

  if (activeFilter.value === 'Promoted')  r = r.filter((x) => x.promoted)
  if (activeFilter.value === 'Top rated') r = r.sort((a, b) => b.avg_rating - a.avg_rating)
  if (activeFilter.value === 'Trending')  r = r.sort((a, b) => b.review_count - a.review_count)
  if (activeFilter.value === 'New')       r = r.filter((x) => x.tags?.includes('New'))

  if (query.value.trim()) {
    const q = query.value.toLowerCase()
    r = r.filter(
      (x) =>
        x.name.toLowerCase().includes(q) ||
        x.cuisine.toLowerCase().includes(q) ||
        x.category.toLowerCase().includes(q)
    )
  }
  return r
})

const categories = [
  { label: 'Burgers',  icon: '🍔' },
  { label: 'Ramen',    icon: '🍜' },
  { label: 'Pizza',    icon: '🍕' },
  { label: 'Sushi',    icon: '🍣' },
  { label: 'Brunch',   icon: '🥐' },
  { label: 'Tacos',    icon: '🌮' },
  { label: 'Coffee',   icon: '☕' },
  { label: 'Desserts', icon: '🍰' },
]

const moods = ['Date night', 'Quick bite', 'With friends', 'Working solo', 'Celebration', 'Hidden gem']

// Cargar restaurantes al montar el componente
onMounted(async () => {
  await loadRestaurants()
})

async function loadRestaurants() {
  loading.value = true
  error.value = ''
  try {
    const response = await restaurantService.search('', undefined, 1)
    restaurants.value = response.restaurants || []
  } catch (err) {
    console.error('Error cargando restaurantes:', err)
    error.value = 'Error al cargar restaurantes'
  } finally {
    loading.value = false
  }
}

async function searchRestaurants(category?: string) {
  loading.value = true
  error.value = ''
  try {
    const response = await restaurantService.search(query.value, category, 1)
    restaurants.value = response.restaurants || []
  } catch (err) {
    console.error('Error buscando:', err)
    error.value = 'Error en la búsqueda'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex-1 min-w-0">

    <HeaderPage title="Discover" subtitle="Explora restaurantes cerca de ti" />

    <div class="px-6 md:px-10 py-8 space-y-10 max-w-350 mx-auto">

      <!-- Featured banner -->
      <section v-if="featured" class="relative overflow-hidden rounded-3xl border border-base-300/60">
        <img v-if="featured.image" :src="featured.image" :alt="featured.name" class="absolute inset-0 h-full w-full object-cover" />
        <div class="absolute inset-0 bg-linear-to-r from-base-100 via-base-100/80 to-base-100/10" />
        <div class="relative p-8 md:p-12 max-w-2xl">
          <span class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-primary mb-3">
            <Sparkles class="h-3.5 w-3.5" /> Selección del editor
          </span>
          <h2 class="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-3">
            {{ featured.name }}
          </h2>
          <p class="text-accent-content/85 mb-6 line-clamp-2">{{ featured.description }}</p>
          <div class="flex items-center gap-3">
            <a
              :href="`/restaurant/${featured.slug}`"
              class="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-content text-sm font-semibold hover:shadow-[0_0_24px_-4px_var(--p)] transition"
            >
              View restaurant
            </a>
            <span class="text-xs text-accent-content/85text-accent-content/85 inline-flex items-center gap-1.5">
              <MapPin class="h-3.5 w-3.5" /> {{ featured.address }}
            </span>
          </div>
        </div>
      </section>
<!-- 
     
      <section>
        <div class="flex items-end justify-between mb-5">
          <div>
            <h3 class="font-display text-2xl font-bold">Browse by craving</h3>
            <p class="text-sm text-neutral mt-1">Tell us what you're in the mood for</p>
          </div>
        </div>
        <div class="grid grid-cols-4 md:grid-cols-8 gap-3">
          <button
            v-for="c in categories"
            :key="c.label"
            class="group flex flex-col items-center justify-center gap-2 aspect-square rounded-2xl border border-base-300/60 bg-base-100/60 hover:border-primary/40 hover:bg-base-100 transition-all"
          >
            <span class="text-2xl group-hover:scale-110 transition-transform">{{ c.icon }}</span>
            <span class="text-[11px] font-medium text-neutral group-hover:text-base-content">{{ c.label }}</span>
          </button>
        </div>
      </section> -->

      <!-- Moods -->
      <!-- <section>
        <div class="flex items-center gap-2 mb-4">
          <Flame class="h-4 w-4 text-secondary" />
          <h3 class="font-display text-sm uppercase tracking-[0.2em] text-neutral">Curated moods</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="m in moods"
            :key="m"
            class="px-4 h-10 rounded-full border border-base-300/60 bg-base-100/60 text-sm hover:border-secondary/50 hover:text-secondary transition"
          >
            {{ m }}
          </button>
        </div>
      </section> -->

      <!-- Restaurant feed -->
      <section>
        <div class="flex items-end justify-between mb-5 flex-wrap gap-3">
          <div>
            <h3 class="font-display text-2xl font-bold flex items-center gap-2">
              <TrendingUp class="h-5 w-5 text-primary" /> Descubre Restaurantes
            </h3>
            <p class="text-sm text-neutral mt-1">{{ list.length }} Restaurantes encontrados</p>
          </div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="f in filters"
              :key="f"
              @click="activeFilter = f"
              :class="[
                'px-4 h-9 rounded-full text-sm font-medium transition border',
                activeFilter === f
                  ? 'bg-base-content text-base-100 border-base-content'
                  : 'border-base-300/60 text-neutral hover:text-base-content hover:border-primary/40'
              ]"
            >
              {{ f }}
            </button>
          </div>
        </div>
        
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block">
            <div class="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
          <p class="mt-4 text-neutral">Cargando restaurantes...</p>
        </div>

        <div v-else-if="error" class="alert alert-error">
          <span>{{ error }}</span>
        </div>

        <div v-else-if="list.length > 0" class="grid md:grid-cols-2 gap-6">
          <RestaurantCard v-for="r in list" :key="r.slug" :r="r" />
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="text-center py-20 text-neutral rounded-3xl border border-base-300/60 bg-base-100/40"
        >
          Nothing matches "{{ query }}". Try a different cuisine.
        </div>
      </section>

      <footer class="py-10 text-center text-xs text-neutral">
      
        © 2026 rateapp · Crafted for hungry humans
      </footer>
    </div>
  </main>
</template>
