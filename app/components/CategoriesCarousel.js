"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function CategoriesCarousel({ videos = [] }) {
  const [search, setSearch] = useState("");

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = new Set();
    videos.forEach((v) => {
      if (v.category) cats.add(v.category.trim());
    });
    return Array.from(cats);
  }, [videos]);

  // Filtrar categorías según búsqueda
  const filtered = categories.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide justify-start px-2">
        {filtered.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="min-w-[180px] bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 p-5 flex-shrink-0 text-center cursor-pointer"
            onClick={() =>
              (window.location.href = `/categories/${c
                .toLowerCase()
                .replace(/\s+/g, "-")}`)
            }
          >
            <p className="font-semibold capitalize text-gray-700">{c}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
              }
