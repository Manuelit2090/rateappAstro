<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trophy, Flame, Target, Sparkles } from 'lucide-vue-next'
import QuestCard from './QuestCard.vue'
import { quests } from '../data/quests'
import type { Quest } from '../data/quests'

const filters = ['All', 'Daily', 'Weekly', 'Seasonal', 'Legendary'] as const
type Filter = typeof filters[number]

const activeFilter = ref<Filter>('All')

const visible = computed(() =>
  activeFilter.value === 'All'
    ? quests
    : quests.filter((q) => q.category === (activeFilter.value as Quest['category']))
)

const totalPoints = quests.reduce((s, q) => s + q.reward, 0)
const earned      = computed(() => quests.filter((q) => q.current >= q.total).reduce((s, q) => s + q.reward, 0))
const available   = computed(() => totalPoints - earned.value)
const inProgress  = computed(() => quests.filter((q) => q.current > 0 && q.current < q.total).length)
</script>

<template>
  <main class="flex-1 min-w-0">

    <!-- Topbar -->
    <header class="sticky top-0 z-20 flex items-center gap-4 px-6 md:px-10 h-20 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div class="flex items-center gap-3">
        <div class="grid place-items-center h-10 w-10 rounded-xl bg-lime/15 text-primary">
          <Trophy class="h-5 w-5" />
        </div>
        <div>
          <h1 class="font-primary text-lg font-bold leading-none">Quests</h1>
          <p class="text-xs text-primary-content mt-1">Earn points. Become a tastemaker.</p>
        </div>
      </div>
    </header>

    <div class="px-6 md:px-10 py-8 space-y-8 max-w-[1400px] mx-auto">

      <!-- Hero stats -->
      <section class="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-base-100 via-neutral/60 to-primary/80 p-8 md:p-10">
        <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-lime/20 blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-peach/15 blur-3xl pointer-events-none" />

        <div class="relative grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <span class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-lime mb-3">
              <Sparkles class="h-3.5 w-3.5" /> This season
            </span>
            <h2 class="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-3">
              Adventures for hungry humans.
            </h2>
            <p class="text-neutral-content max-w-xl">
              {{ quests.length }} quests across the city. Complete them to climb the leaderboard
              and unlock rare badges.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3 md:gap-5 min-w-[300px]">
            <!-- Stat: Earned -->
            <div class="rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm p-4">
              <div class="font-display text-2xl font-bold text-lime">{{ earned.toLocaleString() }}</div>
              <div class="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Earned</div>
            </div>
            <!-- Stat: Available -->
            <div class="rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm p-4">
              <div class="font-display text-2xl font-bold text-peach">{{ available.toLocaleString() }}</div>
              <div class="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Available</div>
            </div>
            <!-- Stat: Active -->
            <div class="rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm p-4">
              <div class="font-display text-2xl font-bold text-lime">{{ inProgress }}</div>
              <div class="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Active</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Filters + streak -->
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-2 flex-wrap">
          <button
            v-for="f in filters"
            :key="f"
            @click="activeFilter = f"
            :class="[
              'px-4 h-9 rounded-full text-sm font-medium transition border',
              activeFilter === f
                ? 'bg-foreground text-background border-foreground'
                : 'border-border/60 text-muted-foreground hover:text-foreground hover:border-lime/40'
            ]"
          >
            {{ f }}
          </button>
        </div>
        <div class="flex items-center gap-2 text-xs text-muted-foreground">
          <Flame class="h-3.5 w-3.5 text-peach" />
          <span>3-day streak · keep it alive</span>
        </div>
      </div>

      <!-- Quest grid -->
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <QuestCard v-for="q in visible" :key="q.slug" :q="q" />
      </div>

      <!-- Empty state -->
      <div v-if="visible.length === 0" class="text-center py-20 text-muted-foreground">
        <Target class="h-10 w-10 mx-auto mb-3 opacity-50" />
        No quests in this category.
      </div>

      <footer class="py-10 text-center text-xs text-muted-foreground">
        © 2026 rateapp · Crafted for hungry humans
      </footer>
    </div>
  </main>
</template>
