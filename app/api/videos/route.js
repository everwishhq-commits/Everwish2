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

  const videos = files.map((file) => {
    const cleanName = file.replace(".mp4", "");
    const parts = cleanName.split("_");

    const object = parts[0] || "unknown";
    const category = parts[1] || "general";
    const subcategory = parts[2] || "general";
    const title =
      object.charAt(0).toUpperCase() + object.slice(1) + " " + category;

    return {
      title,
      object,
      category: normalize(category),
      subcategory: normalize(subcategory),
      src: `/cards/${file}`,
    };
  });

  return NextResponse.json({ videos });
      }
