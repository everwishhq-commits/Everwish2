import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let videos = [];

  try {
    // 🔹 1. Intentar leer automáticamente los videos en /public/cards
    const dir = path.join(process.cwd(), "public/cards");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

    const autoVideos = files.map((file) => {
      const cleanName = file.replace(".mp4", "");
      const parts = cleanName.split("_");

      return {
        title:
          parts[0]?.charAt(0).toUpperCase() + parts[0]?.slice(1) + " Card",
        category: parts[1]?.replace("-", " ") || "General",
        subcategory: parts[2]?.replace("-", " ") || "General",
        src: `/cards/${file}`,
      };
    });

    videos = autoVideos;
    console.log("✅ Videos cargados automáticamente:", videos.length);
  } catch (err) {
    console.warn("⚠️ Error leyendo /public/cards, usando respaldo manual");
  }

  // 🔹 2. Fallback manual (si el automático falla o está vacío)
  if (videos.length === 0) {
    videos = [
      {
        title: "Pumpkin Halloween Card",
        category: "Seasonal Holidays",
        subcategory: "Halloween",
        src: "/cards/pumpkin.mp4",
      },
      {
        title: "Santa Christmas Card",
        category: "Seasonal Holidays",
        subcategory: "Christmas",
        src: "/cards/santa.mp4",
      },
      {
        title: "Romantic Love Card",
        category: "Love & Romance",
        subcategory: "Valentine",
        src: "/cards/love.mp4",
      },
      {
        title: "Birthday Surprise Card",
        category: "Birthday",
        subcategory: "Friends",
        src: "/cards/birthday.mp4",
      },
      {
        title: "Dog and Cat Card",
        category: "Animals",
        subcategory: "Pets",
        src: "/cards/pets.mp4",
      },
    ];
  }

  return NextResponse.json({ videos });
}
