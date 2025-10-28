"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/videos");
      const data = await res.json();

      // Agrupar categorías únicas
      const uniqueCategories = [
        ...new Set(data.videos.map((v) => v.category)),
      ];
      setCategories(uniqueCategories);
    }
    load();
  }, []);

  const filtered = categories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  if (!categories.length)
    return <p className="text-center text-gray-400">Loading categories...</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm mb-6 rounded-full border border-pink-200 bg-white/70 px-4 py-3 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
      />
      <div className="flex overflow-x-auto space-x-6 no-scrollbar snap-x snap-mandatory">
        {filtered.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              router.push(`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`)
            }
            className="cursor-pointer min-w-[160px] bg-white rounded-2xl shadow-md border border-pink-100 p-6 text-center snap-start"
          >
            <span className="text-3xl mb-2 block">
              {getEmojiForCategory(cat)}
            </span>
            <p className="font-semibold text-gray-700 capitalize">{cat}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function getEmojiForCategory(name) {
  const map = {
    "Seasonal Holidays": "🎄",
    "Love & Romance": "💘",
    Birthday: "🎂",
    Animals: "🐾",
  };
  return map[name] || "✨";
}
