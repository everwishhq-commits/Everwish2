import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/cards");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

  const videos = files.map((file) => {
    const cleanName = file.replace(".mp4", "");
    const parts = cleanName.split("_");

    // Estructura esperada: object_category_subcategory_version
    const object = parts[0] || "unknown";
    const category = parts[1] || "general";
    const subcategory = parts[2] || "general";
    const title = `${object.charAt(0).toUpperCase() + object.slice(1)} ${category.replace("-", " ")}`;

    return {
      title,
      object,
      category,
      subcategory,
      src: `/cards/${file}`,
    };
  });

  return NextResponse.json({ videos });
}
