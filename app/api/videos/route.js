import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/cards");

  // Asegurar que exista el directorio
  if (!fs.existsSync(dir)) {
    return NextResponse.json({ videos: [] });
  }

  // Tomar solo archivos .mp4
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

  // Función para limpiar nombres
  const normalize = (str) =>
    str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9-]/g, "")
      .trim();

  const videos = files.map((file) => {
    const name = file.replace(".mp4", "");
    const parts = name.split("_");

    // Estructura flexible → object_category_subcategory_version
    const object = parts[0] || "unknown";
    const category = parts[1] || "general";
    const subcategory = parts[2] || "general";
    const version = parts[3] || "1A";

    return {
      title:
        `${object.charAt(0).toUpperCase() + object.slice(1)} ${
          category.charAt(0).toUpperCase() + category.slice(1)
        }`.trim(),
      object: normalize(object),
      category: normalize(category),
      subcategory: normalize(subcategory),
      version,
      src: `/cards/${file}`,
    };
  });

  return NextResponse.json({ videos });
}
