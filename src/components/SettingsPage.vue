<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderPage from './UI/HeaderPage.vue';

interface UserProfile {
  id?: number | string
  name: string
  email: string
  phone: string
  totalPoints: number
  totalReviews: number
}

const form = ref<UserProfile>({
  name: '',
  email: '',
  phone: '',
  totalPoints: 0,
  totalReviews: 0,
})

const password = ref('')
const message = ref('')
const isSaving = ref(false)

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

onMounted(() => {
  void loadUser()
})
</script>

<template>
  <div class="w-full min-h-screen bg-base-100  text-base-content">
        <HeaderPage title="Settings" subtitle="Gestiona tu perfil y preferencias" />

    <div class="mx-auto px-6 py-6 flex flex-col gap-4">
      <div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Settings</p>
            <h1 class="text-3xl font-bold">Perfil y preferencias</h1>
            <p class="mt-2 text-sm text-base-content/70">
              Actualiza tus datos personales.
            </p>
          </div>
        </div>
      </div>

      <div v-if="message" class="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
        {{ message }}
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 class="text-xl font-semibold">Información personal</h2>
          <div class="mt-6 grid gap-4 md:grid-cols-2">
            <label class="block">
              <span class="mb-2 block text-sm font-medium">Nombre</span>
              <input v-model="form.name" class="input input-bordered w-full" placeholder="Tu nombre" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium">Email</span>
              <input v-model="form.email" type="email" class="input input-bordered w-full" placeholder="tu@email.com" />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium">Teléfono</span>
              <input v-model="form.phone" class="input input-bordered w-full" placeholder="Tu teléfono" />
            </label>

            <label class="block md:col-span-2">
              <span class="mb-2 block text-sm font-medium">Cambiar contraseña</span>
              <input v-model="password" type="password" class="input input-bordered w-full" placeholder="Nueva contraseña" />
            </label>
          </div>

          <div class="mt-6 flex justify-end">
            <button class="btn btn-primary" :disabled="isSaving" @click="saveProfile">
              {{ isSaving ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </section>

        <aside class="space-y-6">
          <div class="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <h2 class="text-lg font-semibold">Resumen</h2>
            <div class="mt-4 grid gap-3">
              <div class="rounded-2xl bg-primary/10 p-4">
                <p class="text-sm text-base-content/70">Total de puntos</p>
                <p class="text-2xl font-bold text-primary">{{ form.totalPoints }}</p>
              </div>
              <div class="rounded-2xl bg-secondary/10 p-4">
                <p class="text-sm text-base-content/70">Reseñas realizadas</p>
                <p class="text-2xl font-bold text-secondary">{{ form.totalReviews }}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
