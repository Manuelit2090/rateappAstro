<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeUbicacion as ubication } from './UI/storeUbication.js';
// lucide-vue-next equivalents
import {
  Menu, Home, Compass, Trophy, Heart, Bookmark,
  MessageSquare, Settings, LogOut, Flame, MapPin
} from 'lucide-vue-next'

const open = ref(true)
const routePath = ref('/')

onMounted(() => {
  if (typeof window !== 'undefined') {
    routePath.value = window.location.pathname
     ubication.detectarUbicacion();
  }
})

const items = [
  { icon: Home,         label: 'Feed',      to: '/dashboard' },
  { icon: Compass,      label: 'Discover',  to: '/discover' },
  { icon: Flame,        label: 'Trending',  to: '/discover' },
  { icon: Trophy,       label: 'Quests',    to: '/quests', badge: 'NEW' },
  { icon: Heart,        label: 'Favorites', to: '/dashboard' },
  { icon: Bookmark,     label: 'Saved',     to: '/dashboard' },
  { icon: MessageSquare,label: 'Reviews',   to: '/dashboard' },
  { icon: MapPin,        label: 'Ubicación' },
]

function isActive(to: string, idx: number) {
  return routePath.value === to && (idx === 0 || to !== '/')
}
</script>

<template>
  <aside
    :class="[
      open ? 'w-64' : 'w-20',
      'shrink-0 transition-all duration-300 border-r border-base-300/60 bg-base-100/40 backdrop-blur-xl flex flex-col sticky top-0 h-screen'
    ]"
  >
    <!-- Header / Logo -->
    <div class="flex items-center gap-3 px-5 h-20 border-b border-base-300/60">
      <button
        @click="open = !open"
        class="grid place-items-center h-10 w-10 rounded-xl bg-base-200 hover:bg-primary/10 hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        <Menu class="h-5 w-5" />
      </button>
      <transition name="fade">
        <div v-if="open" class="flex items-baseline gap-1">
          <span class="font-display text-2xl font-bold tracking-tight">rate</span>
          <span class="font-display text-2xl font-bold text-lime">app</span>
          <span class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--p)]" />
        </div>
      </transition>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-3 py-6 space-y-1">
      <a
        v-for="(it, idx) in items"
        :key="it.label + idx"
        :href="it.to"
        :class="[
          'group relative w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-all',
          isActive(it.to, idx)
            ? 'bg-primary text-primary-content shadow-[0_0_24px_-4px_var(--p)]'
            : 'text-neutral hover:text-base-content hover:bg-base-200'
        ]"
      >
        <component :is="it.icon" class="h-5 w-5 shrink-0" />
        <span v-if="open">{{ it.label }}</span>
        <span
          v-if="it.badge && open"
          :class="[
            'ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md',
            isActive(it.to, idx) ? 'bg-base-100/20' : 'bg-primary/15 text-primary'
          ]"
        >
          {{ it.badge }}
        </span>
      </a>
    </nav>

    <!-- Footer buttons -->
    <div class="px-3 py-4 border-t border-base-300/60 space-y-3">
      <div class="rounded-2xl border border-base-200 bg-base-200/60 p-3 text-sm text-neutral">
        <div class="flex items-center gap-2">
          <MapPin class="h-4 w-4 shrink-0 text-primary" />
          <span class="font-semibold">Ubicación</span>
        </div>
        <p class="mt-2 text-xs leading-5 text-base-content/80">
          {{ ubication.ciudad }}
        </p>
      </div>

      <button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral hover:text-base-content hover:bg-base-200 transition-colors">
        <Settings class="h-5 w-5" />
        <span v-if="open">Settings</span>
      </button>
      <button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral hover:text-base-content hover:bg-base-200 transition-colors">
        <LogOut class="h-5 w-5" />
        <span v-if="open">Sign out</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
