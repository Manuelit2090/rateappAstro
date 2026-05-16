<script setup lang="ts">
import { ref } from 'vue';
import { checkLogin } from '../modules/auth/checkLogin';
import { exportDataUser } from '../modules/auth/userUtils';
import { setDataUser } from '../store/dataUser';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleSubmit(event: Event) {
  event.preventDefault();
  error.value = '';

  if (!email.value || !password.value) {
    error.value = 'Completa el email y la contraseña.';
    return;
  }

  loading.value = true;
  const user = await checkLogin(email.value, password.value);
  loading.value = false;

  if (!user) {
    error.value = 'Usuario o contraseña incorrectos.';
    return;
  }

  const userData = exportDataUser(user);
  setDataUser(userData);
  window.location.href = '/dashboard';
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

      <div class="text-center md:text-left mb-8">
        <h2 class="text-3xl font-bold text-white">Bienvenido de nuevo</h2>
        <p class="text-base-content/70 mt-2">Accede a tu universo gastronómico digital.</p>
      </div>

      <form @submit="handleSubmit" class="flex flex-col gap-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-base-content/70">Email</span>
          </label>
          <div class="relative">
            
            <input
              v-model="email"
              type="email"
              class="input input-bordered w-full pl-12 bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full"
            />
          </div>
        </div>

        <div class="form-control">
          <div class="flex justify-between items-center mb-2">
            <label class="label-text text-base-content/70">Contraseña</label>
            <a href="#" class="link link-primary text-sm hover:no-underline">¿Olvidaste tu contraseña?</a>
          </div>
          <div class="relative">
           
            <input
              v-model="password"
              type="password"
       
              class="input input-bordered w-full pl-12 bg-base-100/80 border-base-300 focus:border-primary focus:ring-0 transition-all rounded-full"
            />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-lg rounded-full mt-4 shadow-md hover:shadow-[0_0_25px_rgba(163,255,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 font-bold"
          :class="{ 'opacity-70 cursor-not-allowed': loading }"
          :disabled="loading"
        >
          <span v-if="loading">Ingresando...</span>
          <span v-else>Entrar</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>

      <p v-if="error" class="text-sm text-error mt-4">{{ error }}</p>

      <div class="divider my-8 text-xs text-base-content/50">O continúa con</div>

      <div class="grid grid-cols-2 gap-4">
        <button class="btn btn-outline border-base-300 hover:bg-base-300/50 rounded-full flex items-center gap-2">
          <img
            src="https://via.placeholder.com/20"
            alt="Google"
            class="w-5 h-5"
          />
          Google
        </button>

        <button class="btn btn-neutral border-base-300 hover:bg-neutral/80 rounded-full flex items-center gap-2">
          <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">ios</span>
          Apple
        </button>
      </div>

      <div class="text-center mt-8 text-sm">
        ¿No tienes cuenta?
        <a href="#" class="text-primary font-semibold hover:underline">Regístrate</a>
      </div>
    </div>
  </div>
</template>
