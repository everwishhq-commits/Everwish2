"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from "@/lib/categories";

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const userLang =
    typeof navigator !== "undefined" && navigator.language.startsWith("es");

  function normalize(str) {
    return str?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").trim();
  }

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        const all = data.videos || [];

        const currentCat = categories.find((c) => c.slug === slug);
        if (!currentCat) return;

        const filtered = all.filter((v) => {
          const base = v.src.split("_").slice(0, -1).join("_").toLowerCase();
          return currentCat.keywords.some((k) => base.includes(k));
        });

        setVideos(filtered);
      } catch (err) {
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, [slug]);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  const category = categories.find((c) => c.slug === slug);
  const displayName = userLang ? category?.name_es : category?.name_en;

  return (
    <main
      className="min-h-screen text-gray-800 flex flex-col items-center py-10 px-4"
      style={{ backgroundColor: category?.color || "#fff5f8" }}
    >
      <button
        onClick={() => router.push("/")}
        className="mb-6 text-pink-600 hover:underline"
      >
        ← {userLang ? "Volver al inicio" : "Back to Home"}
      </button>

      <h1 className="text-3xl font-extrabold mb-8 capitalize text-center text-pink-600">
        {displayName}
      </h1>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500">
          {userLang
            ? "No hay videos en esta categoría aún ✨"
            : "No cards available in this category yet ✨"}
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 p-4 w-64 cursor-pointer"
            >
              <video
                src={v.src}
                className="w-full h-48 object-cover rounded-2xl bg-black"
                muted
                loop
                playsInline
                autoPlay
                onError={(e) => (e.target.poster = "/placeholder.png")}
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-700 mb-1">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {v.subcategory || "General"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
