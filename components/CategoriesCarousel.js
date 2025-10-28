"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        const unique = [
          ...new Set(data.videos.map((v) => v.category?.trim())),
        ].filter(Boolean);
        setCategories(unique);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    }
    load();
  }, []);

  const filtered = useMemo(
    () => categories.filter((c) => c.toLowerCase().includes(search.toLowerCase())),
    [categories, search]
  );

  if (!categories.length)
    return <p className="text-center text-gray-400 mt-6">Loading categories...</p>;

  return (
    <section>
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

      <div className="flex overflow-x-auto space-x-6 px-4 pb-4 no-scrollbar snap-x snap-mandatory justify-start">
        {filtered.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer min-w-[160px] bg-white rounded-2xl shadow-md border border-pink-100 p-6 text-center snap-start hover:border-pink-200 hover:bg-pink-50"
            onClick={() => router.push(`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`)}
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
    "Seasonal Holidays": "🎄",
    "Love & Romance": "💘",
    Birthday: "🎂",
    Animals: "🐾",
  };
  return map[name] || "✨";
              }
