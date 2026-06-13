<script setup lang="ts">
import { reviews, type Review } from '../data/reviews'
import WriteReview from './WriteReview.vue'

interface Props {
  slug: string
}

defineProps<Props>()

const handleReviewSubmit = (review: Omit<Review, 'reviewId'>) => {
  try {
    const newReview: Review = {
      ...review,
      reviewId: `${review.reviewUser}-${review.reviewSlug}-${Date.now()}`,
    }

    reviews.push(newReview)

    alert('¡Reseña enviada con éxito!')
  } catch (error) {
    console.error('Error al enviar reseña:', error)
    alert('Hubo un error al enviar tu reseña')
  }
}
</script>

<template>
  <WriteReview :restaurant-slug="slug" @submit="handleReviewSubmit" />
</template>