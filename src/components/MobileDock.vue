<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeUbicacion as ubication } from './UI/storeUbication.ts';
import { dataUser, loadDataUserFromAPI, logoutUser, setDataUser } from '../store/dataUser';
import {
  Home, Compass, Heart, CircleUser, MoreHorizontal,
  Settings, LogOut, X
} from 'lucide-vue-next'

const routePath = ref('/')
const showMore = ref(false)

onMounted(async () => {
  await loadDataUserFromAPI();
  if (typeof window !== 'undefined') {
    routePath.value = window.location.pathname
    await ubication.detectarUbicacion();

    if (dataUser.user) {
      const coordinates = ubication.getCoordinates();
      if (coordinates) {
        const updatedUser = {
          ...dataUser.user,
          currentLocation: coordinates
        };
        setDataUser(updatedUser);
      }
    }
  }
})

const items = [
  { icon: Home, label: 'Feed', to: '/dashboard' },
  { icon: Compass, label: 'Discover', to: '/discover' },
  { icon: Heart, label: 'Favorites', to: '/favorites' },
  { icon: CircleUser, label: 'Profile', to: '/profile' },
]

function isActive(to: string, idx: number) {
  return routePath.value === to && (idx === 0 || to !== '/')
}
</script>

<template>
  <div ><!-- Floating Pill Dock -->
    <div
      class="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2">
      <nav class="w-full max-w-sm flex items-center justify-around gap-1
             rounded-[28px] border border-base-300/60 bg-base-100/90 backdrop-blur-xl
             shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)] px-2 py-2">
        <a v-for="(it, idx) in items" :key="it.label + idx" :href="it.to" :class="[
          'flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 transition-all duration-200',
          isActive(it.to, idx)
            ? 'bg-primary/10'
            : 'hover:bg-base-200'
        ]">
          <component :is="it.icon" :class="[
            'h-5 w-5 transition-colors',
            isActive(it.to, idx) ? 'text-primary' : 'text-neutral-content'
          ]" />
          <span :class="[
            'text-[11px] font-medium transition-colors',
            isActive(it.to, idx) ? 'text-primary' : 'text-neutral-content'
          ]">
            {{ it.label }}
          </span>
        </a>

        <!-- More -->
        <button @click="showMore = true"
          class="flex flex-col items-center justify-center gap-0.5 flex-1 rounded-2xl py-2 hover:bg-base-200 transition-colors">
          <MoreHorizontal class="h-5 w-5 text-neutral-content" />
          <span class="text-[11px] font-medium text-neutral-content">More</span>
        </button>
      </nav>

      <!-- Home indicator bar, como en la imagen -->
      <div class="mt-2 h-1 w-24 rounded-full bg-base-300/70" />
    </div>

    <!-- More sheet -->
    <transition name="sheet">
      <div v-if="showMore" class="fixed inset-0 z-50 flex flex-col justify-end">
        <div class="absolute inset-0 bg-black/40" @click="showMore = false" />
        <div
          class="relative bg-base-100 rounded-t-2xl border-t border-base-300/60 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div class="flex items-center justify-between mb-4">
            <span class="font-display text-lg font-bold">Menu</span>
            <button @click="showMore = false" class="grid place-items-center h-9 w-9 rounded-full hover:bg-base-200">
              <X class="h-5 w-5" />
            </button>
          </div>

          <div class="rounded-2xl border border-base-200 bg-base-200/60 p-3 text-sm text-neutral mb-3">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-accent-content/85">Ubicación</span>
            </div>
            <p class="mt-1 text-xs leading-5 text-base-content/80">
              {{ ubication.ciudad }}
            </p>
          </div>

          <button
            class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors">
            <Settings class="h-5 w-5" />
            <span>Settings</span>
          </button>
          <button
            class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:bg-base-200 transition-colors"
            @click="logoutUser()">
            <LogOut class="h-5 w-5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.2s;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
</style>