import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/cards");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

  const normalize = (str) =>
    str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "")
      .replace(/[^a-z0-9-]/g, "")
      .trim();

  // 🔹 Diccionario de detección automática
  const MAIN_MAP = {
    holidays: ["christmas", "easter", "thanksgiving", "newyear", "july4th", "independenceday", "halloween"],
    love: ["love", "romance", "anniversary", "wedding", "valentine"],
    celebrations: ["birthday", "graduation", "mothers-day", "fathers-day", "babyshower", "newborn"],
    animals: ["dog", "cat", "pets", "petsandanimal", "dogcat", "eagle", "turtle", "yeti"],
    seasons: ["summer", "spring", "autumn", "winter"],
  };

  // 🔹 Asocia subcategorías o nombres a una categoría principal
  function detectMainCategory(word) {
    word = normalize(word);
    for (const [main, subs] of Object.entries(MAIN_MAP)) {
      if (subs.some((s) => word.includes(s))) return main;
    }
    return "general";
  }

  const videos = files.map((file) => {
    const clean = file.replace(/\.mp4$/i, "");
    const parts = clean.split("_");

    // Permite archivos con nombres irregulares o con “sub”, “category”, etc.
    const object = normalize(parts[0] || "unknown");
    const possibleCategory = normalize(parts[1] || "");
    const possibleSub = normalize(parts[2] || "");
    const version = (parts[3] || "").toUpperCase();

    // Detecta la categoría principal automáticamente
    const mainCategory = detectMainCategory(possibleCategory || possibleSub);

    // Subcategoría: usa el valor más específico
    const subcategory = possibleCategory && possibleSub && possibleSub !== "general"
      ? possibleSub
      : possibleCategory || "general";

    const mainMeta = {
      holidays: { name: "Holidays", emoji: "🎄", color: "#FFF4E0" },
      love: { name: "Love", emoji: "❤️", color: "#FFE8EE" },
      celebrations: { name: "Celebrations", emoji: "🎉", color: "#FFF7FF" },
      animals: { name: "Animals & Nature", emoji: "🐾", color: "#E8FFF3" },
      seasons: { name: "Seasons", emoji: "🍂", color: "#E8F3FF" },
      general: { name: "General", emoji: "💫", color: "#F5F5F5" },
    }[mainCategory];

    return {
      object,
      category: mainCategory, // 💡 categoría principal
      subcategory,
      version,
      src: `/cards/${file}`,
      mainName: mainMeta.name,
      mainSlug: mainCategory,
      mainEmoji: mainMeta.emoji,
      mainColor: mainMeta.color,
      title:
        `${object.charAt(0).toUpperCase() + object.slice(1)} ` +
        `${subcategory !== "general" ? subcategory : mainMeta.name.toLowerCase()}`,
    };
  });

  return NextResponse.json({ videos });
}
