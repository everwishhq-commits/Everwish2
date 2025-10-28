"use client";
import { useState, useEffect } from "react";
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
      // Extraer categorías únicas
      const uniqueCategories = [
        ...new Set(data.videos.map((v) => v.category.trim())),
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
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        🎨 Explore Categories
      </h2>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full border border-pink-200 bg-white/70 px-4 py-2 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 w-64"
        />
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide justify-start px-2">
        {filtered.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="min-w-[180px] bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 p-5 flex-shrink-0 text-center cursor-pointer"
            onClick={() =>
              router.push(`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`)
            }
          >
            <span className="text-3xl mb-2 block">{getEmojiForCategory(cat)}</span>
            <p className="font-semibold text-gray-700 capitalize">{cat}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function getEmojiForCategory(name) {
  const map = {
    halloween: "🎃",
    christmas: "🎄",
    "mothers-day": "💐",
    "independenceday": "🦅",
    anniversary: "💞",
    thanksgiving: "🦃",
    easter: "🐰",
    love: "💘",
    petsandanimals: "🐾",
  };
  return map[name.toLowerCase()] || "✨";
            }
