"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        const categoryName = slug.replace(/-/g, " ").toLowerCase();
        const filtered = data.videos.filter(
          (v) => v.category.toLowerCase() === categoryName
        );
        const uniqueSubs = [...new Set(filtered.map((v) => v.subcategory))];
        setSubcategories(uniqueSubs);
      });
  }, [slug]);

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center py-10 px-4">
      <button
        onClick={() => router.push("/")}
        className="text-pink-500 hover:text-pink-600 font-semibold mb-6"
      >
        ← Back to Home
      </button>

      <h1 className="text-4xl font-extrabold text-pink-600 mb-8 capitalize text-center">
        {slug.replace(/-/g, " ")}
      </h1>

      {subcategories.length === 0 ? (
        <p className="text-gray-500">No subcategories found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl">
          {subcategories.map((sub, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                router.push(
                  `/subcategory/${sub.toLowerCase().replace(/\s+/g, "-")}`
                )
              }
              className="bg-white shadow rounded-3xl p-6 cursor-pointer text-center"
            >
              <span className="text-lg font-semibold">{sub}</span>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
    }
