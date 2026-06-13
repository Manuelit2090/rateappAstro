<script setup lang="ts">
import { onMounted } from 'vue';

/**
 * Componente de guardia que verifica si el usuario está autenticado.
 * Redirige a /login si no está autenticado mediante verificación del token JWT.
 */
onMounted(async () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Verificar si el usuario tiene sesión válida
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include', // Incluir cookies
    });

    if (!response.ok) {
      // Token inválido o expirado, redirigir a login
      window.location.replace('/login');
    }
  } catch (error) {
    // Si hay error de conexión, redirigir a login como fallback
    console.error('Error verificando autenticación:', error);
    window.location.replace('/login');
  }
});
</script>

<template>
  <!-- invisible guard, does not render UI -->
  <div style="display:none" aria-hidden="true"></div>
</template>
