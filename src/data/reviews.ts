/*
Esta interfaz es la plantilla para la creación de reseñas

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
    reviewDate: Date;
    reviewItem?: ReviewItem[];
}



export const reviews: Review[] = [
    {
        reviewId: "UsrSlugDate",

        reviewSlug: "tonkotsu-lab",
        reviewStar: 2,
        reviewDate: new Date(1995, 4, 15),
        reviewText: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        reviewUser: "Admin"

    },
    {
        reviewId: "Admslate-omakase2205",

        reviewSlug: "tonkotsu-lab",
        reviewStar: 2,
        reviewDate: new Date(2026, 6, 13),
        reviewText: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        reviewUser: "Admin"

    },
]