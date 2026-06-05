<script setup lang="ts">
import { onMounted } from 'vue'
import { Sparkles, TrendingUp, Award } from 'lucide-vue-next'
import { dataUser, loadDataUserFromStorage } from '../store/dataUser';
import avatar from '../assets/avatar-user.jpg'

const stats = [
  { icon: Sparkles,   value: 0, label: 'Points',  highlight: true },
  { icon: TrendingUp, value: '0',  label: 'Rank',    highlight: false },
  { icon: Award,      value: '18',    label: 'Badges',  highlight: false },
]

onMounted(() => {
  loadDataUserFromStorage();
  stats[0].value = dataUser.user?.totalPoints ?? 0;
  stats[1].value = dataUser.user.totalReviews;
})
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-base-300/60 bg-gradient-to-br from-base-100 to-base-200 p-6 md:p-8">
    <!-- Decorative blobs -->
    <div class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    <div class="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />

    <div class="relative flex flex-col md:flex-row md:items-center gap-6">
      <!-- Avatar + name -->
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="absolute inset-0 rounded-full bg-primary/40 blur-md" />
          <img
            :src="avatar"
º            :alt="dataUser.user?.name ?? 'avatar'"
            width="72"
            height="72"
            class="relative h-18 w-18 rounded-full object-cover ring-2 ring-primary"
          />
          <span class="absolute -bottom-1 -right-1 grid place-items-center h-6 w-6 rounded-full bg-primary text-primary-content text-[10px] font-bold ring-2 ring-base-100">
            7
          </span>
        </div>
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-neutral">Welcome back</p>
          <h1 class="font-display text-2xl md:text-3xl font-bold">{{ dataUser.user?.name ?? 'User' }}</h1>
          <p class="text-sm text-secondary mt-0.5">Foodie · Tier Gold · 142 reviews</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="md:ml-auto grid grid-cols-3 gap-3">
        <div
          v-for="s in stats"
          :key="s.label"
          :class="[
            'rounded-2xl p-4 border',
            s.highlight
              ? 'bg-primary text-primary-content border-transparent shadow-[0_0_30px_-8px_var(--p)]'
              : 'bg-base-100/40 border-base-300/60'
          ]"
        >
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
