import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { MAIN_CATEGORIES, normalize } from "@/lib/categories";

function resolveMainCategory(category, subcategory, object) {
  const hay = (w) => !!w;
  const tokens = [category, subcategory, object].filter(hay);

  // Busca la 1ª coincidencia de keyword en cualquiera de los tokens
  for (const mc of MAIN_CATEGORIES) {
    for (const kw of mc.keywords) {
      if (tokens.some((t) => t.includes(kw))) {
        return mc;
      }
    }
  }
  // Fallback
  return { name: "Miscellaneous", slug: "misc", emoji: "✨", color: "#F5F5F5" };
}

export async function GET() {
  const dir = path.join(process.cwd(), "public/cards");
  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".mp4"));

  const videos = files.map((file) => {
    const clean = file.replace(/\.mp4$/i, "");
    // Convención: object_category_subcategory_version
    const [rawObject, rawCategory, rawSubcategory, rawVersion] = clean.split("_");

    const object = normalize(rawObject || "unknown");
    const category = normalize(rawCategory || "general");     // <- tag/tema (ej. halloween)
    const subcategory = normalize(rawSubcategory || "general");
    const version = (rawVersion || "").toUpperCase();         // ej. 1A, 2A…

    const main = resolveMainCategory(category, subcategory, object);

    return {
      // datos originales del archivo
      object,
      category,        // <- NO es la categoría principal; es el tag (ej. halloween)
      subcategory,
      version,
      src: `/cards/${file}`,

      // metadata de categoría principal para UI/rutas
      mainName: main.name,
      mainSlug: main.slug,     // <- usar este slug en /categories/[slug]
      mainEmoji: main.emoji,
      mainColor: main.color,

      // título amigable
      title:
        `${object.charAt(0).toUpperCase() + object.slice(1)} ` +
        `${subcategory !== "general" ? subcategory : category}`,
    };
  });

  return NextResponse.json({ videos });
}
