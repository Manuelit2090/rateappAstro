import type { User } from './user';

export const localUsers: User[] = [
  {
    id: 'u1',
    name: 'Chef Demo',
    email: 'chef@gastrolink.ai',
    password: '123456',
    totalPoints: 1200,
    totalReviews: 8,
    reviews: ['Buen lugar, excelente servicio.'],
    favoriteRestaurant: ['la-fonda', 'burger-town'],
    cuponsBuy: ['WELCOME20'],
    currentLocation: { lat: -33.4378, lng: -70.6505 }
  },
  {
    id: 'u2',
    name: 'Ana Foodie',
    email: 'ana@rateapp.com',
    password: 'ana12345',
    totalPoints: 740,
    totalReviews: 4,
    reviews: ['La sopa ramen tenía un sabor increíble.'],
    favoriteRestaurant: ['sushi-house'],
    cuponsBuy: ['FRESCO10']
  }
];
