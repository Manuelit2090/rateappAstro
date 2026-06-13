
import burgerImg from '../assets/food-burger.jpg'
import pizzaImg from '../assets/food-pizza.jpg'
import ramenImg from '../assets/food-ramen.jpg'
import sushiImg from '../assets/food-sushi.jpg'



export interface Restaurant {
  id: number,
  slug: string;
  name: string;
  cuisine: string;
  category: string;
  description: string;
  image: string | ImageMetadata;
  rating: number;
  reviews: number;
  distance: string;
  priceRange: string;
  promoted?: boolean;
  tags: string[];
  phone: string;
  email: string;
  address: string;
  // lat,lon used to build the OpenStreetMap embed
  lat: number;
  lon: number;
  recentReviews?: [];
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    slug: "ember-and-oak",
    name: "Ember & Oak",
    cuisine: "American · Smash Burgers",
    category: "Burgers · Casual Dining",
    description:
      "A neighborhood smash-burger joint obsessed with single-origin beef, brioche baked in-house, and a secret oak-smoked sauce. Loud music, low light, no reservations.",
    image: burgerImg,
    rating: 4.9,
    reviews: 1284,
    distance: "0.4 mi",
    priceRange: "$$",
    promoted: true,
    tags: ["New", "Hot"],
    phone: "+1 (415) 555-0142",
    email: "hello@emberandoak.com",
    address: "418 Valencia St, San Francisco, CA",
    lat: 37.7656,
    lon: -122.4218
  },
  {
    id: 2,
    slug: "tonkotsu-lab",
    name: "Tonkotsu Lab",
    cuisine: "Japanese · Ramen",
    category: "Ramen · Japanese",
    description:
      "A tiny 14-seat counter where pork bones simmer for 22 hours. The chashu is torched to order and the noodles are made fresh every morning.",
    image: ramenImg,
    rating: 4.8,
    reviews: 962,
    distance: "1.2 mi",
    priceRange: "$$",
    tags: ["Cozy"],
    phone: "+1 (415) 555-0188",
    email: "slurp@tonkotsulab.com",
    address: "271 Sutter St, San Francisco, CA",
    lat: 37.7894,
    lon: -122.4055,
    
  },
  
  {
    id: 3,
    slug: "forno-nero",
    name: "Forno Nero",
    cuisine: "Italian · Wood-fired",
    category: "Pizza · Italian",
    description:
      "Naples-trained pizzaiolos working a 900°F oak oven. Sourdough crust, San Marzano tomatoes, and a rotating list of natural Italian wines.",
    image: pizzaImg,
    rating: 4.7,
    reviews: 2104,
    distance: "0.8 mi",
    priceRange: "$$$",
    promoted: true,
    tags: ["Date"],
    phone: "+1 (415) 555-0211",
    email: "ciao@fornonero.com",
    address: "590 Hayes St, San Francisco, CA",
    lat: 37.7765,
    lon: -122.4275,
  
  },
  {
    id: 4,
    slug: "slate-omakase",
    name: "Slate Omakase",
    cuisine: "Japanese · Sushi",
    category: "Omakase · Fine Dining",
    description:
      "An intimate 10-seat omakase counter sourcing fish flown in twice weekly from Toyosu. 17 courses, one chef, one unforgettable evening.",
    image: sushiImg,
    rating: 4.95,
    reviews: 538,
    distance: "2.1 mi",
    priceRange: "$$$$",
    tags: ["Chef's Pick"],
    phone: "+1 (415) 555-0333",
    email: "reserve@slateomakase.com",
    address: "1 Sansome St, San Francisco, CA",
    lat: 37.7906,
    lon: -122.4006,
   
  },
];

export const getRestaurant = (slug: string) =>
  restaurants.find((r) => r.slug === slug);
