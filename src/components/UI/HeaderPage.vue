<script setup lang="ts" >
import SearchBar from './RestaurantSearchBar.vue'
import { Compass, Goal, CircleUserRound , Heart, Cookie  } from 'lucide-vue-next'
import {defineProps, computed} from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'RateApp',
  },
  subtitle: {
    type: String,
    default: 'Encuentra tu proximo restaurante favorito',
  },
})
const iconComponent = computed(() => {
  const t = props.title.toLowerCase();
  if (t.includes('discover') || t.includes('descubrir')) return Compass;
  if (t.includes('quest') || t.includes('misiones')) return Goal;
  if (t.includes('favorites') || t.includes('favoritos')) return Heart;
  if (t.includes('profile') || t.includes('perfil')) return CircleUserRound;
  return Cookie;
})
</script>

<template>
    
     <!-- Topbar -->
    <header class="sticky top-0 z-20 flex items-center gap-4 px-6 md:px-10 h-20 border-b border-base-300/60 bg-base-100/70 backdrop-blur-xl">
      <div class="flex items-center gap-3">
        <div class="grid place-items-center h-10 w-10 rounded-xl bg-secondary/15 text-secondary">
          <component :is="iconComponent" class="h-5 w-5" />
        </div>
        <div>
          <h1 class="font-display text-lg font-bold leading-none">{{props.title}}</h1>
          <p class="text-xs text-neutral-content mt-1">{{props.subtitle}}</p>
        </div>
      </div>

      <!-- Search (desktop) -->
      <div class="ml-auto relative w-full max-w-md hidden md:block">
        <SearchBar/>
      </div>
    </header>
</template>