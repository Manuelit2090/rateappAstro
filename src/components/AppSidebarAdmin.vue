<script setup lang="ts">
import { ref, onMounted } from 'vue'
// lucide icons
import { Menu, Home, BarChart, Settings, LogOut, Ticket, TicketX } from 'lucide-vue-next'
import { dataUser, loadDataUserFromAPI, logoutUser, setDataUser } from '../store/dataUser';

const open = ref(true)
const routePath = ref('/')

onMounted(() => {
  if (typeof window !== 'undefined') routePath.value = window.location.pathname
})

const items = [
  { icon: Home, label: 'Home', to: '/admin/dashboard' },
  { icon: BarChart, label: 'Estadísticas', to: '/admin/analytics' },
    { icon: Ticket, label: 'Crear Cupon', to: '/admin/createCupon' },
  { icon: TicketX, label: 'Redimir Cupon', to: '/admin/redeemCoupon' },

  { icon: Settings, label: 'Settings', to: '/admin/settings' },
]

function isActive(to: string, idx: number) {
  return routePath.value === to && (idx === 0 || to !== '/')
}

async function logoutUser() {
  try {
    const response = await fetch('/api/auth/logout', { 
      headers: {
        'Content-Type': 'application/json',
      method: 'GET',
      credentials: 'include',

      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // "Sesión cerrada"
      
      // Redirige al usuario a la página de inicio o login
      window.location.href = '/login';
    } else {
      console.error('Error al cerrar sesión');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
}

</script>

<template>
 <div>
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
        <div v-if="open" class="flex flex-col items-baseline gap-1">
      <div class="flex w-full">
            <span class="font-display text-2xl font-bold tracking-tight">rate</span>
          <span class="font-display text-2xl font-bold text-lime">app</span>
          <span class="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--p)]" />
      </div>


             <p class="text-xs text-muted-foreground">
              For businesses
            </p>
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
            : 'text-neutral-content hover:text-base-content hover:bg-base-200'
        ]"
      >
        <component :is="it.icon" class="h-5 w-5 shrink-0" />
        <span v-if="open">{{ it.label }}</span>
      </a>
    </nav>

    <div class="px-3 py-4 border-t border-base-300/60 space-y-3">
      
      <button class="w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors" @click="logoutUser()">
        <LogOut class="h-5 w-5" />
        <span v-if="open">Log Out</span>
      </button>
    </div>
  </aside>
 </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
