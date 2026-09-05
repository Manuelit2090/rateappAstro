/**
 * @file reviews.ts
 * @description Tipos compartidos para reseñas y sus elementos opcionales.
 */

export interface ReviewItem {
  item: string;
  total: number;
}

export interface Review {
  reviewId: string;
  reviewSlug: string;
  reviewStar: number;
  reviewText: string;
  reviewUser: string;
  reviewDate: Date | string;
  reviewItem?: ReviewItem[];
}
