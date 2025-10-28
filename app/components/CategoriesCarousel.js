"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CategoriesCarousel({ search }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        data.videos.forEach((v) => {
          const cat = v.category;
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(v.subcategory);
        });
        setCategories(Object.keys(grouped));
      });
  }, []);

  const filtered = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0)
    return <p className="text-gray-400 text-center">No categories found.</p>;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
      {filtered.map((cat, i) => (
        <motion.button
          key={i}
          onClick={() => router.push(`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="min-w-[180px] bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center snap-center"
        >
          <span className="text-3xl mb-2">✨</span>
          <span className="font-semibold text-gray-700">{cat}</span>
        </motion.button>
      ))}
    </div>
  );
}
