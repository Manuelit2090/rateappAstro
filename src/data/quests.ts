import { Camera, MapPin, Star, Flame, Coffee, Users, Pizza, Award, Sparkles, Compass, Utensils, Heart } from "lucide-react";

export interface Quest {
  slug: string;
  title: string;
  description: string;

  category: "Daily" | "Weekly" | "Seasonal" | "Legendary";
  difficulty: "Easy" | "Medium" | "Hard" | "Epic";
  reward: number;
  current: number;
  total: number;
  expiresIn: string;
  participants: number;
  tag?: string;
}

export const quests: Quest[] = [
  {
    slug: "photograph-5-dishes",
    title: "Photograph 5 dishes",
    description: "Snap a great shot of any 5 dishes you order this week. Lighting matters.",
    category: "Weekly",
    difficulty: "Easy",
    reward: 150,
    current: 3,
    total: 5,
    expiresIn: "3d 4h",
    participants: 1284,
    tag: "Hot",
  },
  {
    slug: "new-neighborhood",
    title: "Try a new neighborhood",
    description: "Review one restaurant in a part of the city you've never rated before.",

    category: "Weekly",
    difficulty: "Medium",
    reward: 200,
    current: 1,
    total: 1,
    expiresIn: "3d 4h",
    participants: 612,
  },
  {
    slug: "detailed-reviews",
    title: "Write 3 detailed reviews",
    description: "150+ words, at least one photo, and a dish recommendation each.",

    category: "Weekly",
    difficulty: "Medium",
    reward: 300,
    current: 1,
    total: 3,
    expiresIn: "3d 4h",
    participants: 891,
  },
  {
    slug: "ramen-rampage",
    title: "Ramen Rampage",
    description: "Slurp through 4 different ramen spots and rank them.",

    category: "Seasonal",
    difficulty: "Hard",
    reward: 750,
    current: 1,
    total: 4,
    expiresIn: "21d",
    participants: 432,
    tag: "Limited",
  },
  {
    slug: "morning-glory",
    title: "Morning Glory",
    description: "Review a breakfast or brunch spot before 11am.",
 
    category: "Daily",
    difficulty: "Easy",
    reward: 50,
    current: 0,
    total: 1,
    expiresIn: "12h",
    participants: 2103,
  },
  {
    slug: "bring-a-friend",
    title: "Bring a friend",
    description: "Invite a friend to rateapp and get them to post their first review.",

    category: "Seasonal",
    difficulty: "Medium",
    reward: 400,
    current: 0,
    total: 1,
    expiresIn: "30d",
    participants: 187,
  },
  {
    slug: "pizza-pilgrim",
    title: "Pizza Pilgrim",
    description: "Visit 3 wood-fired pizzerias and document the leoparding.",
 
    category: "Weekly",
    difficulty: "Hard",
    reward: 500,
    current: 0,
    total: 3,
    expiresIn: "6d",
    participants: 298,
  },
  {
    slug: "tastemaker",
    title: "Tastemaker",
    description: "Earn 50 helpful votes on your reviews this season.",

    category: "Legendary",
    difficulty: "Epic",
    reward: 2000,
    current: 18,
    total: 50,
    expiresIn: "60d",
    participants: 64,
    tag: "Legendary",
  },
  {
    slug: "spicy-streak",
    title: "Spicy streak",
    description: "Try 5 dishes rated 3+ chilis on the heat scale.",

    category: "Weekly",
    difficulty: "Medium",
    reward: 250,
    current: 2,
    total: 5,
    expiresIn: "5d",
    participants: 711,
  },
  {
    slug: "hidden-gem-hunter",
    title: "Hidden gem hunter",
    description: "Be the first to review a place with under 10 ratings.",

    category: "Seasonal",
    difficulty: "Hard",
    reward: 600,
    current: 0,
    total: 1,
    expiresIn: "14d",
    participants: 153,
  },
  {
    slug: "love-letter",
    title: "Love letter",
    description: "Write a glowing 5-star review for a place you visit weekly.",

    category: "Daily",
    difficulty: "Easy",
    reward: 80,
    current: 0,
    total: 1,
    expiresIn: "12h",
    participants: 1842,
  },
  {
    slug: "neighborhood-mayor",
    title: "Neighborhood Mayor",
    description: "Review every restaurant in a single zip code. Glory awaits.",
 
    category: "Legendary",
    difficulty: "Epic",
    reward: 3500,
    current: 4,
    total: 22,
    expiresIn: "90d",
    participants: 21,
    tag: "Legendary",
  },
];
