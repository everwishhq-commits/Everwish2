// /lib/categories.js
export const MAIN_CATEGORIES = [
  {
    name: "Holidays",
    slug: "holidays",
    emoji: "🎄",
    color: "#FFF4E0",
    keywords: [
      "halloween", "christmas", "thanksgiving", "easter", "newyear", "july4th",
      "independenceday", "hanukkah", "diwali", "ramadan", "lunarnewyear"
    ],
  },
  {
    name: "Love",
    slug: "love",
    emoji: "❤️",
    color: "#FFE8EE",
    keywords: ["valentine", "romance", "anniversary", "wedding", "engagement", "love"],
  },
  {
    name: "Celebrations",
    slug: "celebrations",
    emoji: "🎉",
    color: "#FFE7FF",
    keywords: [
      "birthday", "graduation", "mothers-day", "fathers-day",
      "babyshower", "newbaby", "retirement", "congratulations"
    ],
  },
  {
    name: "Animals & Nature",
    slug: "animals",
    emoji: "🐾",
    color: "#E8FFF3",
    keywords: ["petsandanimals", "pets", "animals", "dog", "cat", "dogcat", "eagle", "turtle", "yeti"],
  },
  {
    name: "Seasons",
    slug: "seasons",
    emoji: "🍂",
    color: "#E5EDFF",
    keywords: ["spring", "summer", "autumn", "fall", "winter"],
  },
];

// Utilidad compartida para normalizar
export const normalize = (str) =>
  str?.toLowerCase().trim().replace(/&/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
