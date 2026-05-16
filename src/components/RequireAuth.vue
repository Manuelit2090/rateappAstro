<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window === 'undefined') return;
  try {
    const stored = window.localStorage.getItem('rateapp-user');
    if (!stored) {
      // not logged -> redirect to login
      window.location.replace('/login');
    }
  } catch (e) {
    // if access to localStorage fails, redirect as fallback
    window.location.replace('/login');
  }
});
</script>

<template>
  <!-- invisible guard, does not render UI -->
  <div style="display:none" aria-hidden="true"></div>
</template>
