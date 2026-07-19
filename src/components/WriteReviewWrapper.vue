<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import type { Review } from '../data/reviews'
import WriteReview from './WriteReview.vue'

interface Props {
  slug: string
}

const props = defineProps<Props>()

const error = ref('')

// El reviewId lo genera el backend, y reviewUser/reviewDate se resuelven
// del usuario autenticado en el servidor, así que no los pedimos aquí.
const handleReviewSubmit = async (
  review: Omit<Review, 'reviewId' | 'reviewUser' | 'reviewDate'>
) => {
  error.value = ''

  try {
    const res = await fetch('/api/auth/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantSlug: props.slug,
        rating: review.reviewStar,
        content: review.reviewText,
        reviewItem: review.reviewItem,
      }),
    })

    const data = await res.json()

    // Validamos si la respuesta del servidor es un error (400, 404, 401, 500)
    if (!res.ok) {
      error.value = data.error || 'Error al subir reseña'
      return
    }

    alert('¡Reseña enviada con éxito!')
  } catch (err) {
    console.error('Error al enviar reseña:', err)
    error.value = 'Hubo un error al enviar tu reseña'
  }
}
</script>

<template>
  <WriteReview :restaurant-slug="props.slug" @submit="handleReviewSubmit" />
  <p v-if="error" class="text-error text-sm mt-2">{{ error }}</p>
</template>