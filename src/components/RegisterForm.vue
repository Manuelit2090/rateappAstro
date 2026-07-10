<template>
  <div class="register-wrapper">
    <h2>Crear cuenta</h2>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <div v-if="success" class="success-msg">{{ success }}</div>
    <div class="form-group">
      <label>Nombre completo</label>
      <input v-model="form.name" type="text" placeholder="Juan Pérez" />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input v-model="form.email" type="email" placeholder="tu@email.com" />
    </div>
    <div class="form-group">
      <label>Contraseña</label>
      <input v-model="form.password" type="password" placeholder="Mínimo 8 caracteres" />
    </div>
    <button @click="handleRegister" :disabled="loading">
      {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
    </button>
    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  password: ''
});
const error = ref('');
const success = ref('');
const loading = ref(false);

async function handleRegister() {
  error.value = '';
  success.value = '';
  loading.value = true;
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      error.value = data.error || 'Error al registrarse';
      return;
    }
    success.value = '¡Cuenta creada! Redirigiendo...';
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  } catch {
    error.value = 'Error de conexión. Intenta de nuevo.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.register-wrapper {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
button {
  padding: 0.75rem;
  background: #e85d04;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error-msg {
  background: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 6px;
}
.success-msg {
  background: #dcfce7;
  color: #15803d;
  padding: 0.75rem;
  border-radius: 6px;
}
</style>