<script setup>
import { ref } from 'vue'
import listBadges from '../data/badges.json'

const $listBadges = ref(listBadges)

// Mapeo dinámico usando los colores semánticos del tema de DaisyUI
const getDifficultyBadge = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'facil': return 'bg-success/10 text-success border-success/20'
    case 'medio': return 'bg-warning/10 text-warning border-warning/20'
    case 'dificil': return 'bg-error/10 text-error border-error/20'
    default: return 'bg-neutral/10 text-neutral border-neutral/20'
  }
}
</script>

<template>
  <!-- Grid responsivo usando el color de fondo base del tema -->
  <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-base-100">
    <div 
      v-for="badge in $listBadges" 
      :key="badge.id"
      class="relative flex flex-col justify-between p-6 rounded-2xl border border-base-content/10 bg-base-200  hover:border-primary/30 shadow-2xl shadow-neutral-900/50 hover:shadow-primary/20 transition-all duration-300 overflow-hidden group "
    >
      <!-- Efecto sutil de brillo con el color Primary al pasar el cursor -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div class="relative z-10">
        <!-- Etiquetas superiores (Categoría y Dificultad) -->
        <div class="flex items-center justify-between gap-2 mb-4 text-xs font-bold uppercase tracking-wider">
          <span class="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
            {{ badge.category }}
          </span>
          <span :class="['px-2.5 py-1 rounded-lg border', getDifficultyBadge(badge.difficulty)]">
            {{ badge.difficulty }}
          </span>
        </div>

        <!-- Información de la Insignia -->
        <h3 class="text-xl font-black text-base-content mb-2 group-hover:text-primary transition-colors">
          {{ badge.badgeName }}
        </h3>
        <p class="text-sm text-base-content/70 leading-relaxed mb-5">
          {{ badge.badgeDescription }}
        </p>
      </div>

      <!-- Requisitos inferiores integrados con el tema -->
      <div class="relative z-10 mt-auto pt-4 border-t border-dashed border-base-content/10">
        <span class="block text-xs font-bold text-base-content/40 uppercase tracking-wider mb-1.5">
          Requisito
        </span>
        <p class="text-sm font-medium text-base-content/90 bg-base-300/50 px-3 py-2.5 rounded-xl border border-base-content/5">{{ badge.requirements }}
        </p>
      </div>
    </div>
  </div>
</template>
