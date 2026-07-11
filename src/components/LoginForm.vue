<script setup lang="ts">
import { ref } from 'vue';
import { loadDataUserFromAPI } from '../store/dataUser';
import { ArrowUp } from 'lucide-vue-next'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

// 1. Añadimos la reactividad para el nombre
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

// 2. Usamos el nombre correcto de la referencia para AutoAnimate
const [VueautoAnimate] = useAutoAnimate()

let loginOrRegister = ref<'login' | 'register'>('login');

async function handleLogin() {
  error.value = '';

  if (!email.value || !password.value) {
    error.value = 'Email y contraseña son requeridos';
    return;
  }

  loading.value = true;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.error || 'Error al iniciar sesión';
      return;
    }

    await loadDataUserFromAPI();
    window.location.href = '/dashboard';
  } catch (err) {
    console.error('Error:', err);
    error.value = 'Error de conexión. Intenta de nuevo.';
  } finally {
    loading.value = false;
  }
}

// 3. Convertimos handleRegister a async/await para validar errores correctamente
async function handleRegister() {
  error.value = '';

  // Validamos que el nombre también exista en el frontend
  if (!name.value || !email.value || !password.value) {
    error.value = 'Nombre, email y contraseña son requeridos';
    return;
  }

  if (password.value.length < 8) {
    error.value = 'La contraseña debe tener al menos 8 caracteres';
    return;
  }

  loading.value = true;
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value.trim(), 
        email: email.value.trim(),
        password: password.value
      }),
    });

    const data = await res.json();

    // Validamos si la respuesta del servidor es un error (400, 409, 500)
    if (!res.ok) {
      error.value = data.error || 'Error al registrar usuario';
      return;
    }

    // Si el registro inicia sesión automáticamente (guarda cookie) cargamos datos
    await loadDataUserFromAPI();
    window.location.href = '/dashboard';
  } catch (err) {
    console.error('Error:', err);
    error.value = 'Error de conexión. Intenta de nuevo.';
  } finally {
    loading.value = false;
  }
}

function changeLoginOrRegister() {
  error.value = ''; // Limpiamos errores al cambiar de pestaña
  loginOrRegister.value = loginOrRegister.value === 'login' ? 'register' : 'login';
}
</script>

<template>
  <div class="card w-full max-w-md bg-base-200/70 backdrop-blur-xl border border-base-300/50 shadow-2xl">
    <div class="card-body p-10">
      <div class="md:hidden flex justify-center mb-8">
        <h1 class="text-4xl font-black italic tracking-[-2px] text-primary neon-glow">
          RateApp
        </h1>
      </div>

      <!-- Vinculamos VueautoAnimate correctamente -->
      <div ref="VueautoAnimate">
        <div class="text-center md:text-left mb-8" v-if="loginOrRegister === 'login'">
          <h2 class="text-3xl font-bold text-white">Bienvenido de nuevo</h2>
          <p class="text-base-content/70 mt-2">Accede a tu universo gastronómico digital.</p>
        </div>
        <div class="text-center md:text-left mb-8" v-if="loginOrRegister === 'register'">
          <h2 class="text-3xl font-bold text-white">Crea una cuenta</h2>
          <p class="text-base-content/70 mt-2">Y descubre un nuevo mundo gastronómico</p>
        </div>
      </div>

      <!-- FORMULARIO DE LOGIN -->
      <div v-if="loginOrRegister === 'login'">
        <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/70">Email</span>
            </label>
            <input v-model="email" type="email"
              class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full" />
          </div>

          <div class="form-control">
            <div class="flex justify-between items-center mb-2">
              <label class="label-text text-base-content/70">Contraseña</label>
              <a href="#" class="link link-primary text-sm hover:no-underline">¿Olvidaste tu contraseña?</a>
            </div>
            <input v-model="password" type="password"
              class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full" />
          </div>

          <button type="submit"
            class="btn btn-primary btn-lg rounded-full mt-4 shadow-md hover:shadow-[0_0_25px_rgba(163,255,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 font-bold"
            :disabled="loading">
            <span>{{ loading ? 'Ingresando...' : 'Entrar' }}</span>
            <ArrowUp :size="24" />
          </button>
        </form>
      </div>

      <!-- FORMULARIO DE REGISTRO -->
      <div v-if="loginOrRegister === 'register'">
        <form @submit.prevent="handleRegister" class="flex flex-col gap-6">
          <!-- NUEVO: Campo Nombre -->
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/70">Nombre Completo</span>
            </label>
            <input v-model="name" type="text" placeholder="Ej. Carlos Pérez"
              class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/70">Email</span>
            </label>
            <input v-model="email" type="email"
              class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/70">Contraseña (Mín. 8 caracteres)</span>
            </label>
            <input v-model="password" type="password"
              class="input input-bordered w-full bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full" />
          </div>

          <button type="submit"
            class="btn btn-primary btn-lg rounded-full mt-4 shadow-md hover:shadow-[0_0_25px_rgba(163,255,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 font-bold"
            :disabled="loading">
            <span>{{ loading ? 'Creando Usuario...' : 'Registrarse' }}</span>
            <ArrowUp :size="24" />
          </button>
        </form>
      </div>

      <!-- Contenedor único de errores para ambos formularios -->
      <p v-if="error" class="text-sm text-error mt-4 text-center font-medium">{{ error }}</p>

      <div class="text-center mt-8 text-sm">
        <span>{{ loginOrRegister === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}</span>
        <button class="btn btn-link text-primary hover:no-underline inline-block ml-1" @click="changeLoginOrRegister">
          <span>{{ loginOrRegister === 'login' ? 'Regístrate' : 'Inicia sesión' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
