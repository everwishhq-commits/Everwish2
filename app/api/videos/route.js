import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 🔹 Mapa completo de categorías principales
const MAIN_MAP = [
  {
    name: "Holidays",
    slug: "holidays",
    emoji: "🎄",
    color: "#FFF4E0",
    subcategories: [
      "christmas", "xmas", "thanksgiving", "newyear", "newyears",
      "easter", "halloween", "july4th", "independenceday", "memorialday",
      "laborday", "veteransday", "presidentsday", "holidayseason",
      "hanukkah", "kwanzaa", "springfestival", "winterfest", "carnival",
      "fireworks", "parade", "patriotic"
    ]
  },
  {
    name: "Love",
    slug: "love",
    emoji: "❤️",
    color: "#FFE8EE",
    subcategories: [
      "romance", "romantic", "anniversary", "wedding", "engagement",
      "proposal", "couple", "valentine", "valentines", "love-story",
      "union", "affection", "sweetheart", "relationship", "hugs",
      "kiss", "together", "commitment"
    ]
  },
  {
    name: "Celebrations",
    slug: "celebrations",
    emoji: "🎉",
    color: "#FFF7FF",
    subcategories: [
      "birthday", "birthdays", "graduation", "graduate", "promotion",
      "achievement", "baby", "babyshower", "newborn", "mothers-day",
      "fathers-day", "friendship-day", "appreciationday", "retirement",
      "farewell", "welcome", "party", "milestone", "success",
      "congratulations", "reunion", "cheer", "toast"
    ]
  },
  {
    name: "Animals & Nature",
    slug: "animals",
    emoji: "🐾",
    color: "#E8FFF3",
    subcategories: [
      "dog", "dogs", "cat", "cats", "pets", "petsandanimal", "wildlife",
      "bird", "birds", "eagle", "turtle", "unicorn", "panda", "bear",
      "elephant", "butterfly", "fox", "lion", "tiger", "monkey", "bunny",
      "rabbit", "horse", "bee", "fish", "ocean", "forest", "nature",
      "flowers", "tree", "earthday", "environment", "eco"
    ]
  },
  {
    name: "Seasons",
    slug: "seasons",
    emoji: "🍂",
    color: "#FFEFD6",
    subcategories: [
      "spring", "summer", "autumn", "fall", "winter", "rainyday", "snowyday",
      "sunnyday", "breezy", "stormy", "cloudy", "sunrise", "sunset", "beach",
      "leaves", "blossom", "frost", "sunshine", "harvest", "vacation", "holiday"
    ]
  },
  {
    name: "Support & Care",
    slug: "support",
    emoji: "🕊️",
    color: "#F3F3F3",
    subcategories: [
      "condolence", "sympathy", "loss", "memorial", "remembrance",
      "healing", "getwell", "wellness", "peace", "comfort", "hope",
      "care", "kindness", "compassion", "gratitude", "thankyou",
      "support", "recovery", "patience", "courage", "empathy",
      "friendship", "cheerup", "staystrong", "positivevibes"
    ]
  }
];

export async function GET() {
  const dir = path.join(process.cwd(), "public/cards");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

  // 🔹 Normaliza texto
  const normalize = (str) =>
    str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "")
      .replace(/[^a-z0-9-]/g, "")
      .trim();

  const videos = files.map((file) => {
    const cleanName = file.replace(".mp4", "");
    const parts = cleanName.split("_");

    // Estructura base: object_category_subcategory_version
    const object = parts[0] || "unknown";
    const category = parts[1] || "general";
    const subcategory = parts[2] || "general";

    // 🔹 Detectar categoría principal automáticamente
    const main =
      MAIN_MAP.find((m) =>
        m.subcategories.some((s) => cleanName.toLowerCase().includes(s))
      ) || MAIN_MAP[0];

    return {
      title:
        `${object.charAt(0).toUpperCase() + object.slice(1)} ${category}`.trim(),
      object,
      category: normalize(category),
      subcategory: normalize(subcategory),
      mainName: main.name,
      mainSlug: main.slug,
      mainEmoji: main.emoji,
      mainColor: main.color,
      src: `/cards/${file}`,
    };
  });

  return NextResponse.json({ videos });
  }
