<script setup lang="ts">
import { onMounted } from 'vue'
import { Sparkles, TrendingUp, Award } from 'lucide-vue-next'
import { dataUser, loadDataUserFromAPI } from '../store/dataUser';
import Avatar from './UI/Avatar.vue'

const stats = [
  { icon: Sparkles, value: 0, label: 'Puntos', highlight: true },
  { icon: TrendingUp, value: '0', label: 'Reseñas', highlight: false },
  { icon: Award, value: '0', label: 'Insignias', highlight: false },
]

onMounted(async () => {
  await loadDataUserFromAPI();
  stats[0].value = dataUser.user?.totalPoints ?? 0;
  stats[1].value = dataUser.user?.totalReviews ?? 0;
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl border border-neutral-600/60 bg-gradient-to-br from-base-100 to-base-200 p-8 md:p-10 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300">
    
    <!-- Blobs decorativos más dinámicos -->
    <div class="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
    <div class="absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-secondary/20 blur-[90px] animate-pulse delay-1000" > </div>  

    <div class="flex flex-col md:flex-row md:items-center gap-10">
      <!-- Avatar + Nombre -->
      <div class="flex items-center gap-6">
        <Avatar  />
        <div class="flex flex-col gap-2">
          <p class="text-sm uppercase tracking-[0.25em] text-accent-content/80 font-medium">Bienvenido de vuelta</p>
          <h1 class="font-display text-4xl md:text-5xl font-extrabold text-base-content leading-tight">
            {{ dataUser.user?.name ?? 'Explorador' }}
          </h1>
        </div>
      </div>

      <!-- Stats con diseño de tarjeta elevado -->
      <div class="md:ml-auto grid grid-cols-3 gap-4">
        <div v-for="s in stats" :key="s.label" :class="[
          'rounded-2xl p-5 border transition-all duration-200 hover:scale-105',
          s.highlight
            ? 'bg-primary text-primary-content border-transparent shadow-lg shadow-primary/30'
            : 'bg-base-100/50 border-base-300/50 hover:border-accent/30'
        ]">
          <div class="flex items-center gap-3 mb-3">
            <component :is="s.icon" class="h-6 w-6 opacity-80" />
            <p :class="['text-[12px] uppercase tracking-wider', s.highlight ? 'opacity-85' : 'text-neutral']">
              {{ s.label }}
            </p>
          </div>
          <p class="font-display text-3xl font-bold leading-none">{{ s.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>