import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/cards");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

  // 🔹 Normaliza nombres para que sean compatibles con los slugs
  const normalize = (str) =>
    str
      ?.toLowerCase()
      .replace(/\s+/g, "-")       // espacios → guiones
      .replace(/&/g, "")          // elimina &
      .replace(/[^a-z0-9-]/g, "") // elimina símbolos
      .trim();

  const videos = files.map((file) => {
    const cleanName = file.replace(".mp4", "");
    const parts = cleanName.split("_");

    // Estructura esperada: object_category_subcategory_version
    const object = parts[0] || "unknown";
    const category = parts[1] || "general";
    const subcategory = parts[2] || "general";

    return {
      title: `${object.charAt(0).toUpperCase() + object.slice(1)} ${category}`,
      object,
      category: normalize(category),
      subcategory: normalize(subcategory),
      src: `/cards/${file}`,
    };
  });

  return NextResponse.json({ videos });
}
