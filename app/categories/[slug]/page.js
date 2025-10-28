"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

export default function CategoryPage() {
  const { slug } = useParams(); // Ejemplo: "holidays"
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        const allVideos = data.videos || [];

        // 🔍 Filtra los videos que pertenezcan a esta categoría principal (mainSlug)
        const filtered = allVideos.filter(
          (v) => v.mainSlug?.toLowerCase() === slug?.toLowerCase()
        );

        setVideos(filtered);
        console.log("✅ Videos encontrados para:", slug, filtered);
      } catch (err) {
        console.error("❌ Error al cargar videos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10">Loading cards...</p>
    );

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 py-10 px-6">
      <button
        onClick={() => router.push("/")}
        className="mb-6 text-pink-600 hover:underline"
      >
        ← Back to Home
      </button>

      {/* Encabezado */}
      <h1 className="text-3xl font-extrabold text-center text-pink-600 mb-8 capitalize">
        {videos[0]?.mainEmoji || "✨"} {videos[0]?.mainName || slug} Cards
      </h1>

      {/* Si no hay videos */}
      {videos.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No cards found in this category yet 💌
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 p-4 w-64 cursor-pointer"
            >
              <video
                src={v.src.startsWith("/cards/") ? v.src : `/cards/${v.src}`}
                className="w-full h-48 object-cover rounded-2xl bg-black"
                muted
                loop
                playsInline
                autoPlay
                onError={(e) => (e.target.poster = "/placeholder.png")}
              />
              <div className="text-center mt-3">
                <p className="text-gray-700 font-semibold truncate">
                  {v.combinedName || v.category}
                </p>
                <p className="text-sm text-gray-500">
                  {v.subcategory !== "general"
                    ? v.subcategory
                    : "General"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
                  }
