<script setup lang="ts">
import { ref } from 'vue'
import WriteReview from './WriteReview.vue'
import { showAviso } from '../store/alerts'
import { dataUser, loadDataUserFromAPI } from '../store/dataUser'
import { syncBadgesForUser } from '../lib/badgeVerifier'

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

    window.dispatchEvent(new CustomEvent('review-created', {
      detail: { reviewId: data.reviewId, restaurantSlug: props.slug },
    }))

    await loadDataUserFromAPI()
    const badgeResult = await syncBadgesForUser(dataUser.user)

    if (badgeResult.newBadges.length) {
      showAviso(
        `¡Reseña enviada con éxito! Has desbloqueado ${badgeResult.newBadges.length} badge${badgeResult.newBadges.length > 1 ? 's' : ''}.`,
        'success'
      )
    } else {
      showAviso('¡Reseña enviada con éxito!', 'success')
    }
  } catch (err) {
    console.error(err)
    showAviso('Error al enviar reseña', 'error')
  }
}
</script>

<template>
  <WriteReview :restaurant-slug="props.slug" @submit="handleReviewSubmit" />
  <p v-if="error" class="text-error text-sm mt-2">{{ error }}</p>

</template>