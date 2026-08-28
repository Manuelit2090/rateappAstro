<script setup lang="ts">
import { ref } from 'vue'
import { loadDataUserFromAPI } from '../store/dataUser'
import { ArrowRight, Mail, Lock, User, Store, UserCheck, AlertCircle } from 'lucide-vue-next'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

const name = ref('')
const accountType = ref<'CLIENT' | 'RESTAURANT'>('CLIENT')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const loginOrRegister = ref<'login' | 'register'>('login')

async function handleLogin() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Email y contraseña son requeridos'
    return
  }

  loading.value = true
  try {
    const payload = {
      email: email.value.trim(),
      password: password.value,
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.error || 'Error al iniciar sesión'
      return
    }

    const destination = data.redirect || (data.user?.sys === 'RESTAURANT' ? '/admin/dashboard' : '/dashboard')

    await loadDataUserFromAPI()
    window.location.assign(destination)
  } catch (err) {
    console.error('Error:', err)
    error.value = 'Error de conexión. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  error.value = ''

  if (!name.value || !email.value || !password.value) {
    error.value = 'Nombre, email y contraseña son requeridos'
    return
  }

  if (password.value.length < 8) {
    error.value = 'La contraseña debe tener al menos 8 caracteres'
    return
  }

  loading.value = true
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value.trim(), 
        email: email.value.trim(),
        password: password.value,
        sys: accountType.value
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.error || 'Error al registrar usuario'
      return
    }

    await loadDataUserFromAPI()
    const returnedSys = data.sys || accountType.value
    if (returnedSys === 'RESTAURANT') {
      window.location.href = '/admin/dashboard'
    } else {
      window.location.href = '/dashboard'
    }
  } catch (err) {
    console.error('Error:', err)
    error.value = 'Error de conexión. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

function changeLoginOrRegister() {
  error.value = ''
  loginOrRegister.value = loginOrRegister.value === 'login' ? 'register' : 'login'
}
</script>

<template>
  <div class="card w-full max-w-md bg-base-200/60 backdrop-blur-2xl border border-base-300/40 shadow-2xl overflow-hidden">
    <div class="card-body p-8 sm:p-10">
      
      <div class="md:hidden flex justify-center mb-6">
        <h1 class="text-3xl font-black italic tracking-tight text-primary">
          RateApp
        </h1>
      </div>

      <div class="mb-6">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
          {{ loginOrRegister === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta' }}
        </h2>
        <p class="text-sm text-base-content/70 mt-1">
          {{ loginOrRegister === 'login' ? 'Accede a tu universo gastronómico digital.' : 'Descubre y gestiona las mejores experiencias.' }}
        </p>
      </div>

      <div v-auto-animate class="space-y-4">
        
        <form v-if="loginOrRegister === 'login'" @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-medium text-base-content/80">Correo electrónico</span>
            </label>
            <label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">
              <Mail class="w-4 h-4 text-base-content/50" />
              <input v-model="email" type="email" placeholder="tu@email.com" class="grow" required />
            </label>
          </div>

          <div class="form-control">
            <div class="flex justify-between items-center pb-1">
              <label class="label-text font-medium text-base-content/80">Contraseña</label>
              <a href="#" class="text-xs text-primary hover:underline font-medium">¿Olvidaste tu contraseña?</a>
            </div>
            <label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">
              <Lock class="w-4 h-4 text-base-content/50" />
              <input v-model="password" type="password" placeholder="••••••••" class="grow" required />
            </label>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-full mt-2 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            <template v-else>
              <span>Entrar</span>
              <ArrowRight class="w-4 h-4" />
            </template>
          </button>
        </form>

        <form v-else @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-medium text-base-content/80">Nombre completo</span>
            </label>
            <label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">
              <User class="w-4 h-4 text-base-content/50" />
              <input v-model="name" type="text" placeholder="Carlos Pérez" class="grow" required />
            </label>
          </div>

          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-medium text-base-content/80">Tipo de cuenta</span>
            </label>
            <div class="grid grid-cols-2 gap-2 p-1 bg-base-300/40 rounded-xl border border-base-300/50">
              <button 
                type="button" 
                @click="accountType = 'CLIENT'"
                :class="['btn btn-sm rounded-lg border-none transition-all gap-2', accountType === 'CLIENT' ? 'btn-primary shadow-sm' : 'btn-ghost text-base-content/70']"
              >
                <UserCheck class="w-4 h-4" />
                Cliente
              </button>
              <button 
                type="button" 
                @click="accountType = 'RESTAURANT'"
                :class="['btn btn-sm rounded-lg border-none transition-all gap-2', accountType === 'RESTAURANT' ? 'btn-primary shadow-sm' : 'btn-ghost text-base-content/70']"
              >
                <Store class="w-4 h-4" />
                Restaurante
              </button>
            </div>
          </div>

          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-medium text-base-content/80">Correo electrónico</span>
            </label>
            <label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">
              <Mail class="w-4 h-4 text-base-content/50" />
              <input v-model="email" type="email" placeholder="tu@email.com" class="grow" required />
            </label>
          </div>

          <div class="form-control">
            <label class="label pb-1">
              <span class="label-text font-medium text-base-content/80">Contraseña</span>
            </label>
            <label class="input input-bordered flex items-center gap-3 bg-base-100/60 focus-within:border-primary">
              <Lock class="w-4 h-4 text-base-content/50" />
              <input v-model="password" type="password" placeholder="Mínimo 8 caracteres" class="grow" required />
            </label>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-full mt-2 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            <template v-else>
              <span>Crear cuenta</span>
              <ArrowRight class="w-4 h-4" />
            </template>
          </button>
        </form>

        <div v-if="error" class="alert alert-error text-xs p-3 rounded-xl flex items-center gap-2 mt-2">
          <AlertCircle class="w-4 h-4 shrink-0" />
          <span>{{ error }}</span>
        </div>
      </div>

      <div class="text-center mt-6 pt-4 border-t border-base-300/40 text-sm text-base-content/70">
        <span>{{ loginOrRegister === 'login' ? '¿Aún no tienes cuenta?' : '¿Ya tienes una cuenta?' }}</span>
        <button class="text-primary font-semibold hover:underline ml-1 focus:outline-none" @click="changeLoginOrRegister">
          {{ loginOrRegister === 'login' ? 'Regístrate aquí' : 'Inicia sesión' }}
        </button>
      </div>

    </div>
  </div>
</template>