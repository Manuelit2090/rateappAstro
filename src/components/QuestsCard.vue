<script setup lang="ts">
import { Camera, MapPin, Star, Target } from 'lucide-vue-next'

const quests = [
  { icon: Camera, title: 'Photograph 5 dishes',     progress: 60,  current: 3, total: 5, reward: '+150' },
  { icon: MapPin, title: 'Try a new neighborhood',  progress: 100, current: 1, total: 1, reward: '+200' },
  { icon: Star,   title: 'Write 3 detailed reviews', progress: 33,  current: 1, total: 3, reward: '+300' },
]
</script>

<template>
  <div class="rounded-3xl border border-border/60 bg-surface/60 p-6 md:p-7">
    <!-- Card header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <div class="grid place-items-center h-10 w-10 rounded-xl bg-peach/15 text-peach">
          <Target class="h-5 w-5" />
        </div>
        <div>
          <h2 class="font-display text-lg font-semibold">Weekly Quests</h2>
          <p class="text-xs text-muted-foreground">Resets in 3 days · 4 hours</p>
        </div>
      </div>
      <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-lime/10 text-lime border border-lime/30">
        650 pts available
      </span>
    </div>

    <!-- Quest items -->
    <div class="grid md:grid-cols-3 gap-4">
      <div
        v-for="q in quests"
        :key="q.title"
        class="rounded-2xl bg-background/40 border border-border/40 p-4 hover:border-lime/40 transition-colors"
      >
        <div class="flex items-start justify-between mb-3">
          <component :is="q.icon" class="h-5 w-5 text-peach" />
          <span class="text-xs font-bold text-lime">{{ q.reward }}</span>
        </div>
        <p class="text-sm font-medium leading-tight mb-3">{{ q.title }}</p>
        <div class="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
          <span>{{ q.current }} / {{ q.total }}</span>
          <span>{{ q.progress }}%</span>
        </div>
        <div class="h-1.5 rounded-full bg-background overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-lime to-peach rounded-full transition-all"
            :style="{ width: `${q.progress}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
