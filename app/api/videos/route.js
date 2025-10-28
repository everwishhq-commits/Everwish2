import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { MAIN_MAP } from "@/lib/categoriesMap";

export async function GET() {
  const dir = path.join(process.cwd(), "public/cards");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

  // Normaliza texto para comparación
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

    // Estructura: object_category_subcategory_version
    const object = parts[0] || "unknown";
    const category = parts[1] || "general";
    const subcategory = parts[2] || "general";

    // Buscar coincidencia automática en MAIN_MAP
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
