<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { avisos, removeAviso, type Aviso } from '../../store/alerts'

// useStore hace que el componente se re-renderice cuando el nanostore cambia,
// sin importar desde qué otra isla se llamó a showAviso().
const listaAvisos = useStore(avisos)

const alertClass: Record<Aviso['type'], string> = {
  success: 'alert-success',
  error: 'alert-error',
  info: 'alert-info',
  warning: 'alert-warning',
}
const alertIcon: Record<Aviso['type'], string> = {
  success: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>',
  error: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-.64 4.849l4.849-4.849M3 15a12 12 0 0118 0m-18 0a12 12 0 0018 0z" /> </svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-.64 4.849l4.849-4.849M3 15a12 12 0 0118 0m-18 0a12 12 0 0018 0z" /></svg>',
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
    <TransitionGroup name="aviso" tag="div" class="flex flex-col gap-2">
      <div v-for="aviso in listaAvisos" :key="aviso.id" class="alert" :class="alertClass?.[aviso.type]">
        <span v-if="aviso.type && alertIcon[aviso.type]" class="mr-2 flex shrink-0"
          v-html="alertIcon[aviso.type]"></span>
           <span class="text-sm">{{ aviso.message }}</span>

      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.aviso-enter-active,
.aviso-leave-active {
  transition: all 0.2s ease;
}

.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>