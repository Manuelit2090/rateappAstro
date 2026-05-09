<script setup lang="ts">
// Botones interactivos del hero de la página de detalle
// (Heart, Bookmark, Share2) — separados en Vue porque necesitan estado
import { ref } from 'vue'
import { Heart, Bookmark, Share2 } from 'lucide-vue-next'

const liked    = ref(false)
const saved    = ref(false)

function share() {
  if (navigator.share) {
    navigator.share({ title: document.title, url: location.href })
  } else {
    navigator.clipboard.writeText(location.href)
  }
}
</script>

<template>
  <div class="flex gap-2">
    <button
      @click="liked = !liked"
      :class="[
        'grid place-items-center h-10 w-10 rounded-full backdrop-blur-md border transition',
        liked
          ? 'bg-peach text-peach-foreground border-peach'
          : 'bg-background/60 border-border/60 hover:bg-peach hover:text-peach-foreground'
      ]"
      :aria-label="liked ? 'Unlike' : 'Like'"
    >
      <Heart class="h-4 w-4" :class="liked ? 'fill-current' : ''" />
    </button>

    <button
      @click="saved = !saved"
      :class="[
        'grid place-items-center h-10 w-10 rounded-full backdrop-blur-md border transition',
        saved
          ? 'bg-lime text-lime-foreground border-lime'
          : 'bg-background/60 border-border/60 hover:bg-lime hover:text-lime-foreground'
      ]"
      :aria-label="saved ? 'Unsave' : 'Save'"
    >
      <Bookmark class="h-4 w-4" :class="saved ? 'fill-current' : ''" />
    </button>

    <button
      @click="share"
      class="grid place-items-center h-10 w-10 rounded-full bg-background/60 backdrop-blur-md border border-border/60 hover:border-lime/40 transition"
      aria-label="Share"
    >
      <Share2 class="h-4 w-4" />
    </button>
  </div>
</template>
