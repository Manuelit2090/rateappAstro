<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderPage from './UI/HeaderPage.vue';
import { logoutUser } from '../store/dataUser'

interface UserProfile {
  id?: number | string
  name: string
  email: string
  phone: string
}

const form = ref<UserProfile>({
  name: '',
  email: '',
  phone: '',
})

const password = ref('')
const message = ref('')
const isSaving = ref(false)
const showDeleteModal = ref(false)
const deleteConfirmation = ref('')
const isDeleting = ref(false)

const parseResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'La API no respondió correctamente')
  }
  return data
}

const getLoggedEmail = () => {
  if (typeof window === 'undefined') return ''

  const fromStorage = localStorage.getItem('userEmail')
  if (fromStorage) return fromStorage

  const fromSession = sessionStorage.getItem('userEmail')
  if (fromSession) return fromSession

  return ''
}

const loadUser = async () => {
  const email = getLoggedEmail()

  try {
    const endpoint = email ? `/api/user?email=${encodeURIComponent(email)}` : '/api/user'
    const data = await parseResponse(await fetch(endpoint))

    form.value = {
      ...form.value,
      ...data.user,
    }
  } catch (error) {
    console.error('Error cargando perfil:', error)
    message.value = email
      ? 'No se pudo cargar tu perfil. Comprueba tu sesión.'
      : 'No se encontró una sesión autenticada.'
  }
}

const saveProfile = async () => {
  isSaving.value = true
  message.value = ''

  try {
    const payload: Record<string, unknown> = {
      email: form.value.email,
      name: form.value.name,
      phone: form.value.phone,
    }

    if (password.value) {
      payload.password = password.value
    }

    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    await parseResponse(response)

    password.value = ''
    message.value = 'Cambios guardados con éxito.'
  } catch (error) {
    console.error('Error guardando perfil:', error)
  message.value = 'No se pudieron guardar los cambios. Comprueba tu sesión e inténtalo de nuevo.'
  } finally {
    isSaving.value = false
  }
}

const deleteAccount = async () => {
  if (deleteConfirmation.value.trim().toUpperCase() !== 'ELIMINAR') return

  isDeleting.value = true
  message.value = ''

  try {
    const response = await fetch('/api/user', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmation: 'ELIMINAR' }),
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'No se pudo eliminar la cuenta')
    }

    logoutUser()
    localStorage.removeItem('userEmail')
    localStorage.removeItem('restaurantId')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('restaurantId')
    window.location.href = '/login'
  } catch (error) {
    console.error('Error eliminando cuenta:', error)
    message.value = error instanceof Error ? error.message : 'No se pudo eliminar la cuenta.'
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  void loadUser()
})
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-base-100 text-base-content">
    <div class="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse"></div>
    <div class="pointer-events-none absolute -bottom-48 -left-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl motion-safe:animate-pulse"></div>

    <HeaderPage title="Settings" subtitle="Gestiona tu perfil y preferencias" />

    <div class="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <header class="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100/40 p-6 shadow-2xl shadow-primary/5 backdrop-blur-md md:p-8">
        <div class="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-primary/40"></div>
        <div class="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-secondary/30"></div>
        <div class="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div class="mb-3 flex items-center gap-3">
              <div class="grid h-10 w-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_18px_var(--color-primary)]">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
                </svg>
              </div>
              <span class="badge badge-outline badge-primary font-mono text-[10px] tracking-widest">USER NODE</span>
            </div>
            <p class="font-mono text-xs uppercase tracking-[0.3em] text-primary">Settings / profile</p>
            <h1 class="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Perfil y preferencias</h1>
            <p class="mt-2 max-w-2xl text-sm text-base-content/60">Configura tus datos de acceso y mantén tu identidad actualizada.</p>
          </div>
          <div class="font-mono text-right text-[10px] uppercase tracking-widest text-base-content/40">
            <p>SECURE CHANNEL</p>
            <p class="mt-1 text-primary/70">STATUS: ONLINE</p>
          </div>
        </div>
      </header>

      <div v-if="message" class="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary backdrop-blur-md">
        {{ message }}
      </div>

      <section class="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100/40 p-6 shadow-2xl shadow-primary/5 backdrop-blur-md md:p-8">
        <div class="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-primary/40"></div>
        <div class="relative flex items-start gap-4">
          <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
            </svg>
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-xl font-semibold">Información personal</h2>
              <span class="badge badge-outline badge-primary font-mono text-[10px]">PROFILE</span>
            </div>
            <p class="mt-1 text-sm text-base-content/60">Datos visibles y medios de contacto de tu cuenta.</p>
          </div>
        </div>

        <div class="relative mt-7 grid gap-5 md:grid-cols-2">
          <label class="form-control">
            <span class="label-text mb-2 font-mono text-xs uppercase tracking-wider text-base-content/60">Nombre</span>
            <input v-model="form.name" class="input input-bordered w-full border-base-content/15 bg-base-200/40 focus:border-primary focus:outline-none" placeholder="Tu nombre" />
          </label>

          <label class="form-control">
            <span class="label-text mb-2 font-mono text-xs uppercase tracking-wider text-base-content/60">Email</span>
            <input v-model="form.email" type="email" class="input input-bordered w-full border-base-content/15 bg-base-200/40 focus:border-primary focus:outline-none" placeholder="tu@email.com" />
          </label>

          <label class="form-control">
            <span class="label-text mb-2 font-mono text-xs uppercase tracking-wider text-base-content/60">Teléfono</span>
            <input v-model="form.phone" class="input input-bordered w-full border-base-content/15 bg-base-200/40 focus:border-primary focus:outline-none" placeholder="Tu teléfono" />
          </label>

          <label class="form-control">
            <span class="label-text mb-2 font-mono text-xs uppercase tracking-wider text-base-content/60">Contraseña nueva</span>
            <input v-model="password" type="password" class="input input-bordered w-full border-base-content/15 bg-base-200/40 focus:border-primary focus:outline-none" placeholder="Nueva contraseña" />
          </label>
        </div>

        <div class="mt-7 flex flex-col gap-3 border-t border-base-content/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="font-mono text-[10px] uppercase tracking-wider text-base-content/40">Changes are encrypted</p>
          <button class="btn btn-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]" :disabled="isSaving" @click="saveProfile">
            {{ isSaving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </section>

      <section class="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100/40 p-6 shadow-2xl shadow-secondary/5 backdrop-blur-md md:p-8">
        <div class="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-secondary/40"></div>
        <div class="flex items-start gap-4">
          <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-secondary">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="text-xl font-semibold">Seguridad</h2>
              <span class="badge badge-outline badge-secondary font-mono text-[10px]">PRIVATE</span>
            </div>
            <p class="mt-1 text-sm text-base-content/60">La contraseña sólo se actualiza cuando escribes una nueva.</p>
          </div>
        </div>
      </section>

      <section class="relative overflow-hidden rounded-3xl border border-error/40 bg-error/5 p-6 shadow-2xl shadow-error/5 backdrop-blur-md md:p-8">
        <div class="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-error/50"></div>
        <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div class="flex items-start gap-4">
            <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-error/40 bg-error/10 text-error">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
              </svg>
            </div>
            <div>
              <p class="font-mono text-xs font-bold uppercase tracking-[0.25em] text-error">Danger zone</p>
              <h2 class="mt-2 text-xl font-semibold">Eliminar cuenta</h2>
              <p class="mt-2 max-w-2xl text-sm text-base-content/65">Esta acción es permanente y elimina tu acceso a la cuenta.</p>
            </div>
          </div>
          <button class="btn btn-error btn-outline" type="button" @click="showDeleteModal = true">Borrar cuenta</button>
        </div>
      </section>
    </div>
  </div>

  <dialog class="modal" :class="{ 'modal-open': showDeleteModal }">
    <div class="modal-box border border-error/40 bg-base-100/95 shadow-2xl shadow-error/10 backdrop-blur-md">
      <div class="flex items-start gap-4">
        <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-error/10 text-error">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M12 9v4M12 17h.01M10.3 3.8 2.7 17a2 2 0 0 0 1.75 3h15.1a2 2 0 0 0 1.75-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-error">¿Eliminar tu cuenta?</h3>
          <p class="pt-2 text-sm text-base-content/70">Escribe <strong>ELIMINAR</strong> para confirmar. Esta acción no se puede deshacer.</p>
        </div>
      </div>
      <input v-model="deleteConfirmation" class="input input-bordered mt-5 w-full focus:border-error focus:outline-none" placeholder="ELIMINAR" autocomplete="off" :disabled="isDeleting" />
      <div class="modal-action">
        <button class="btn btn-ghost" type="button" :disabled="isDeleting" @click="showDeleteModal = false; deleteConfirmation = ''">Cancelar</button>
        <button class="btn btn-error" type="button" :disabled="deleteConfirmation.trim().toUpperCase() !== 'ELIMINAR' || isDeleting" @click="deleteAccount">
          {{ isDeleting ? 'Eliminando...' : 'Confirmar eliminación' }}
        </button>
      </div>
    </div>
    <div class="modal-backdrop" @click="showDeleteModal = false"></div>
  </dialog>
</template>
