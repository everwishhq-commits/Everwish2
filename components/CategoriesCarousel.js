"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();

        // Agrupar por categoría principal
        const grouped = {};
        data.videos.forEach((v) => {
          const key = v.mainSlug;
          if (!grouped[key]) {
            grouped[key] = {
              mainName: v.mainName,
              mainEmoji: v.mainEmoji,
              mainColor: v.mainColor,
              slug: v.mainSlug,
              count: 0,
            };
          }
          grouped[key].count += 1;
        });

        // Convertir en arreglo ordenado
        const sorted = Object.values(grouped).sort((a, b) =>
          a.mainName.localeCompare(b.mainName)
        );
        setCategories(sorted);
      } catch (err) {
        console.error("❌ Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 py-10">Loading categories...</p>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2 py-6">
      {categories.map((cat, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.25 }}
          className="cursor-pointer rounded-3xl shadow-md text-center py-6 border border-pink-100 hover:shadow-lg hover:border-pink-200"
          style={{
            backgroundColor: cat.mainColor,
          }}
          onClick={() => router.push(`/categories/${cat.slug}`)}
        >
          <div className="text-3xl mb-2">{cat.mainEmoji}</div>
          <h3 className="font-semibold text-gray-700">{cat.mainName}</h3>
          <p className="text-sm text-gray-500 mt-1">{cat.count} cards</p>
        </motion.div>
      ))}
    </div>
  );
}
