<script setup lang="ts">
import { computed } from 'vue'
import { Clock, Users } from 'lucide-vue-next'
import type { Quest } from '@/data/quests'

const props = defineProps<{ q: Quest }>()

const difficultyColor: Record<Quest['difficulty'], string> = {
  Easy:   'text-primary border-primary/40 bg-primary/10',
  Medium: 'text-secondary border-secondary/40 bg-secondary/10',
  Hard:   'text-warning border-warning/40 bg-warning/10',
  Epic:   'text-accent border-accent/40 bg-accent/10',
}

const pct  = computed(() => Math.round((props.q.current / props.q.total) * 100))
const done = computed(() => pct.value >= 100)
</script>

<template>
  <article class="group relative rounded-3xl border border-base-300/60 bg-base-100/60 p-6 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all">
    <!-- Tag badge -->
    <span
      v-if="q.tag"
      class="absolute -top-2 right-6 px-2.5 py-1 rounded-full bg-primary text-primary-content text-[10px] font-bold uppercase tracking-wider shadow-[0_0_24px_-4px_var(--p)]"
    >
      {{ q.tag }}
    </span>

    <!-- Header row -->
    <div class="flex items-start gap-4 mb-4">
      <div class="grid place-items-center h-12 w-12 rounded-2xl bg-secondary/15 text-secondary shrink-0 group-hover:bg-primary/15 group-hover:text-primary transition-colors">
        <component :is="q.icon" class="h-5 w-5" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] uppercase tracking-[0.2em] text-neutral">{{ q.category }}</span>
          <span :class="['text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md border', difficultyColor[q.difficulty]]">
            {{ q.difficulty }}
          </span>
        </div>
        <h3 class="font-display text-lg font-semibold leading-tight">{{ q.title }}</h3>
      </div>
      <div class="text-right shrink-0">
        <div class="font-display text-xl font-bold text-primary leading-none">+{{ q.reward }}</div>
        <div class="text-[10px] uppercase tracking-wider text-neutral mt-1">points</div>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-neutral mb-5 leading-relaxed">{{ q.description }}</p>

    <!-- Progress bar -->
    <div class="space-y-2 mb-5">
      <div class="flex items-center justify-between text-xs text-neutral">
        <span>{{ q.current }} / {{ q.total }}</span>
        <span :class="done ? 'text-primary font-semibold' : ''">{{ pct }}%<template v-if="done"> · Complete</template></span>
      </div>
      <div class="h-1.5 rounded-full bg-base-100 overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
          :style="{ width: `${Math.min(pct, 100)}%` }"
        />
      </div>
    </div>

    <!-- Footer row -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 text-[11px] text-neutral">
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
            ? 'bg-base-200 text-neutral cursor-default'
            : 'bg-primary text-primary-content hover:shadow-[0_0_24px_-4px_var(--p)]'
        ]"
        :disabled="done"
      >
        {{ done ? 'Claimed' : 'Start quest' }}
      </button>
    </div>
  </article>
</template>
