export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    totalPoints: number,
    totalReviews : number,
    reviews: string[],
    favoriteRestaurant: string[],
    cuponsBuy: string[],
    currentLocation?: { 
        lat: number;
        lng: number;
    };

}

