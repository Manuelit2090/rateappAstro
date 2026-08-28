export interface CouponBuy {
    id: number | string;
    code: string;
    state: 'canjeado' | 'no canjeado';
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    totalPoints: number;
    totalReviews: number;
    reviews: string[];
    favoriteRestaurant: string[];
    cuponsBuy: CouponBuy[];
    badges?: string[];
    currentLocation?: {
        lat: number;
        lng: number;
    };
}

