<script setup lang="ts">
import { onMounted } from 'vue'
import { Sparkles, TrendingUp, Award } from 'lucide-vue-next'
import { dataUser, loadDataUserFromAPI } from '../store/dataUser';
import Avatar from './UI/Avatar.vue'

const stats = [
  { icon: Sparkles, value: 0, label: 'Points', highlight: true },
  { icon: TrendingUp, value: '0', label: 'Rank', highlight: false },
  { icon: Award, value: '18', label: 'Badges', highlight: false },
]

const avatarSrc = '/avatar-user.jpg' // Image served from /public/

onMounted(async () => {
  await loadDataUserFromAPI();
  stats[0].value = dataUser.user?.totalPoints ?? 0;
  stats[1].value = dataUser.user?.totalReviews ?? 0;
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-3xl border border-neutral-600/60 bg-gradient-to-br from-base-100 to-base-200 p-6 md:p-8  shadow-[0_0_30px_-8px_var(--p)]">
    <!-- Decorative blobs -->
    <div class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    <div class="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" > </div>  

    <div class="flex">
<div class="relative flex flex-col md:flex-row md:items-center gap-6">
      <!-- Avatar + name -->
      <div class="flex items-center gap-4">
        <Avatar />
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-accent-content/85 ">Welcome back</p>
          <h1 class="font-display text-2xl md:text-3xl font-bold">{{ dataUser.user?.name ?? 'User' }}</h1>
          <p class="text-sm text-secondary mt-0.5">Foodie · Tier Gold · 142 reviews</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="md:ml-auto grid grid-cols-3 gap-3">
      <div v-for="s in stats" :key="s.label" :class="[
        'rounded-2xl p-4 border',
        s.highlight
          ? 'bg-primary text-primary-content border-transparent shadow-[0_0_30px_-8px_var(--p)]'
          : 'bg-base-100/40 border-base-300/60'
      ]">
        <component :is="s.icon" class="h-4 w-4 mb-2 opacity-80" />
        <p class="font-display text-xl font-bold leading-none">{{ s.value }}</p>
        <p :class="['text-[11px] mt-1 uppercase tracking-wider', s.highlight ? 'opacity-80' : 'text-neutral']">
          {{ s.label }}
        </p>
      </div>
    </div>
    </div>
    
  </div>

</template>
