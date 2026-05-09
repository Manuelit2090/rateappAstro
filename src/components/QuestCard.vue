<script setup lang="ts">
import { computed } from 'vue'
import { Clock, Users } from 'lucide-vue-next'
import type { Quest } from '@/data/quests'

const props = defineProps<{ q: Quest }>()

const difficultyColor: Record<Quest['difficulty'], string> = {
  Easy:   'text-lime border-lime/40 bg-lime/10',
  Medium: 'text-peach border-peach/40 bg-peach/10',
  Hard:   'text-orange-300 border-orange-300/40 bg-orange-300/10',
  Epic:   'text-fuchsia-300 border-fuchsia-300/40 bg-fuchsia-300/10',
}

const pct  = computed(() => Math.round((props.q.current / props.q.total) * 100))
const done = computed(() => pct.value >= 100)
</script>

<template>
  <article class="group relative rounded-3xl border border-border/60 bg-surface/60 p-6 hover:border-lime/40 hover:shadow-[var(--shadow-card)] transition-all">
    <!-- Tag badge -->
    <span
      v-if="q.tag"
      class="absolute -top-2 right-6 px-2.5 py-1 rounded-full bg-lime text-lime-foreground text-[10px] font-bold uppercase tracking-wider shadow-[0_0_24px_-4px_var(--lime)]"
    >
      {{ q.tag }}
    </span>

    <!-- Header row -->
    <div class="flex items-start gap-4 mb-4">
      <div class="grid place-items-center h-12 w-12 rounded-2xl bg-peach/15 text-peach shrink-0 group-hover:bg-lime/15 group-hover:text-lime transition-colors">
        <component :is="q.icon" class="h-5 w-5" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{{ q.category }}</span>
          <span :class="['text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md border', difficultyColor[q.difficulty]]">
            {{ q.difficulty }}
          </span>
        </div>
        <h3 class="font-display text-lg font-semibold leading-tight">{{ q.title }}</h3>
      </div>
      <div class="text-right shrink-0">
        <div class="font-display text-xl font-bold text-lime leading-none">+{{ q.reward }}</div>
        <div class="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">points</div>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-muted-foreground mb-5 leading-relaxed">{{ q.description }}</p>

    <!-- Progress bar -->
    <div class="space-y-2 mb-5">
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <span>{{ q.current }} / {{ q.total }}</span>
        <span :class="done ? 'text-lime font-semibold' : ''">{{ pct }}%<template v-if="done"> · Complete</template></span>
      </div>
      <div class="h-1.5 rounded-full bg-background overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-lime to-peach rounded-full transition-all"
          :style="{ width: `${Math.min(pct, 100)}%` }"
        />
      </div>
    </div>

    <!-- Footer row -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 text-[11px] text-muted-foreground">
        <span class="inline-flex items-center gap-1.5">
          <Clock class="h-3.5 w-3.5" />
          {{ q.expiresIn }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <Users class="h-3.5 w-3.5" />
          {{ q.participants.toLocaleString() }}
        </span>
      </div>
      <button
        :class="[
          'text-xs font-semibold px-3.5 h-9 rounded-full transition-colors',
          done
            ? 'bg-surface-elevated text-muted-foreground cursor-default'
            : 'bg-lime text-lime-foreground hover:shadow-[0_0_24px_-4px_var(--lime)]'
        ]"
        :disabled="done"
      >
        {{ done ? 'Claimed' : 'Start quest' }}
      </button>
    </div>
  </article>
</template>
