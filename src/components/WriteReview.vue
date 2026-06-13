<script setup lang="ts">
import { ref } from 'vue'
import { Star } from 'lucide-vue-next'
import type { Review, ReviewItem } from '../../data/reviews'

const props = defineProps<{
  restaurantSlug: string
}>()

const emit = defineEmits<{
  submit: [review: Omit<Review, 'reviewId'>]   // reviewId lo genera el backend/padre
}>()

const rating = ref<number>(0)
const reviewText = ref<string>('')
const isSubmitting = ref<boolean>(false)

const handleStarClick = (star: number) => {
  rating.value = rating.value === star ? 0 : star
}

const isValid = () => rating.value > 0 && reviewText.value.trim() !== ''

const handleSubmit = async () => {
  if (!isValid()) return
  isSubmitting.value = true

  try {
    const review: Omit<Review, 'reviewId'> = {
      reviewSlug: props.restaurantSlug,
      reviewStar: rating.value,
      reviewText: reviewText.value.trim(),
      reviewUser: 'Admin',           // reemplazar por el usuario autenticado
      reviewDate: new Date(),
      reviewItem: [],                // opcional: implementar selector de items
    }

    emit('submit', review)

    rating.value = 0
    reviewText.value = ''
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="rounded-3xl border border-base-300/60 bg-base-100/60 p-6 md:p-8">
    <h2 class="font-display text-xl font-bold mb-6">Escribe tu reseña</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">

      <!-- Estrellas -->
      <div class="space-y-3">
        <label class="block text-sm font-semibold">Calificación</label>
        <div class="flex gap-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="handleStarClick(star)"
            :class="[
              'transition-all duration-200',
              star <= rating
                ? 'text-primary scale-110'
                : 'text-base-300 hover:text-primary/50'
            ]"
            :aria-label="`${star} estrella${star > 1 ? 's' : ''}`"
          >
            <Star class="h-8 w-8" :class="star <= rating ? 'fill-current' : ''" />
          </button>
        </div>
        <p v-if="rating > 0" class="text-xs text-neutral">
          {{ rating }} {{ rating === 1 ? 'estrella' : 'estrellas' }}
        </p>
      </div>

      <!-- Texto -->
      <div class="space-y-3">
        <label for="review-text" class="block text-sm font-semibold">Tu reseña</label>
        <textarea
          id="review-text"
          v-model="reviewText"
          placeholder="Comparte tu experiencia en este restaurante..."
          class="textarea textarea-bordered w-full focus:outline-none focus:border-primary min-h-[120px] resize-none"
          maxlength="500"
        />
        <p class="text-xs text-neutral text-right">{{ reviewText.length }}/500 caracteres</p>
      </div>

      <!-- Fecha generada (informativa) -->
      <p class="text-xs text-neutral">
        Fecha de reseña: {{ new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </p>

      <!-- Acciones -->
      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="!isValid() || isSubmitting"
          :class="[
            'btn btn-primary',
            isSubmitting && 'loading',
            (!isValid() || isSubmitting) && 'btn-disabled opacity-50'
          ]"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar reseña' }}
        </button>
        <button
          type="button"
          @click="() => { rating = 0; reviewText = '' }"
          class="btn btn-ghost"
        >
          Limpiar
        </button>
      </div>

    </form>
  </div>
</template>