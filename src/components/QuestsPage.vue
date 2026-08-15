<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Trophy, Flame, Target, Sparkles } from 'lucide-vue-next'
import QuestCard from './QuestCard.vue'
import SearchBar from './UI/RestaurantSearchBar.vue'
import { dataUser, loadDataUserFromAPI } from '../store/dataUser';

interface Quest {
  id?: number | string
  slug: string
  title: string
  description: string
  category: 'Daily' | 'Weekly' | 'Seasonal' | 'Legendary'
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic'
  reward: number
  current: number
  total: number
  expiresIn: string
  participants: number
  tag?: string
  icon?: unknown
}

const filters = ['All', 'Daily', 'Weekly', 'Seasonal', 'Legendary'] as const
type Filter = typeof filters[number]

const activeFilter = ref<Filter>('All')
const quests = ref<Quest[]>([])
const isLoading = ref(true)
const errorMessage = ref('')

const visible = computed(() =>
  activeFilter.value === 'All'
    ? quests.value
    : quests.value.filter((q) => q.category === (activeFilter.value as Quest['category']))
)

const totalPoints = computed(() => quests.value.reduce((sum, q) => sum + q.reward, 0))
const earned = computed(() =>
  quests.value.filter((q) => q.current >= q.total).reduce((sum, q) => sum + q.reward, 0)
)
const available = computed(() => totalPoints.value - earned.value)
const inProgress = computed(() => quests.value.filter((q) => q.current > 0 && q.current < q.total).length)

const loadQuests = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('/api/quest')
    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Unable to load quests')
    }

    quests.value = Array.isArray(data.quests)
      ? data.quests.map((item: Record<string, any>) => ({
          id: item.id,
          slug: item.slug ?? String(item.id ?? ''),
          title: item.title ?? item.slug ?? 'Quest',
          description: item.description ?? 'Complete this quest to earn points.',
          category: (item.category as Quest['category']) ?? 'Daily',
          difficulty: (item.difficulty as Quest['difficulty']) ?? 'Medium',
          reward: Number(item.reward ?? item.rewartPoints ?? 0),
          current: Number(item.current ?? 0),
          total: Number(item.total ?? 1),
          expiresIn: item.expiresIn ?? item.expires_in ?? 'No deadline',
          participants: Number(item.participants ?? 0),
          tag: item.tag ?? '',
          icon: item.icon ?? Target,
        }))
      : []
  } catch (error) {
    console.error('Error al cargar las quests:', error)
    quests.value = []
    errorMessage.value = 'No se pudieron cargar las quests en este momento.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  void loadQuests()
   await loadDataUserFromAPI();
  
 
})

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
      <SearchBar />
    </header>

    <div class="px-6 md:px-10 py-8 space-y-8 max-w-[1400px] mx-auto">

      <!-- Hero stats -->
      <section class="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-base-100 via-neutral/60 to-primary/80 p-8 md:p-10">
        <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-lime/20 blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-peach/15 blur-3xl pointer-events-none" />

        <div class="relative grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <span class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-lime mb-3">
              <Sparkles class="h-3.5 w-3.5" /> Misiones
            </span>
            <h2 class="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-3">
              Aventuras para humanos hambrientos
            </h2>
            <p class="text-neutral-content max-w-xl">
              <template v-if="isLoading">Loading quests from the server...</template>
              <template v-else-if="errorMessage">{{ errorMessage }}</template>
              <template v-else>
                 Completa {{ quests.length }} misiones y obtenen puntos e insignias para disfrutar al maximo tu experiencia en restaurantes.
              </template>
            </p>
          </div>

          <div class="flex items-center gap-4 flex-wrap">
        
            <!-- Stat: Available -->
            <div class="rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm p-4 w-full">
              <div class="font-display text-2xl font-bold text-peach">{{ dataUser.user?.totalPoints ?? 0}}</div>
              <div class="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Available</div>
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

      </div>

      <div v-if="isLoading" class="text-center py-20 text-muted-foreground">
        <Target class="h-10 w-10 mx-auto mb-3 opacity-50" />
        Loading quests...
      </div>

      <div v-else-if="errorMessage" class="text-center py-20 text-muted-foreground">
        <Target class="h-10 w-10 mx-auto mb-3 opacity-50" />
        {{ errorMessage }}
      </div>

      <div v-else-if="visible.length === 0" class="text-center py-20 text-muted-foreground">
        <Target class="h-10 w-10 mx-auto mb-3 opacity-50" />
        No quests in this category.
      </div>

      <div v-else class="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <QuestCard v-for="q in visible" :key="q.slug" :q="q" />
      </div>

      <footer class="py-10 text-center text-xs text-muted-foreground">
        � 2026 rateapp � Crafted for hungry humans
      </footer>
    </div>
  </main>
</template>
