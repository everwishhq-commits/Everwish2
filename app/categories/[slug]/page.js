"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normaliza los nombres (por ejemplo: "Love & Romance" → "love-romance")
  const normalize = (str) =>
    str?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and").trim();

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        const all = data.videos || [];

        // Filtrar los videos que correspondan a esta categoría
        const filtered = all.filter(
          (v) => normalize(v.category) === normalize(slug)
        );

        setVideos(filtered);
      } catch (err) {
        console.error("⚠️ Error cargando videos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, [slug]);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading videos...</p>;

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center py-10 px-4">
      <button
        onClick={() => router.push("/")}
        className="mb-6 text-pink-600 hover:underline"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-extrabold text-pink-600 mb-8 capitalize text-center">
        {slug.replace(/-/g, " ")} Cards ✨
      </h1>

      {videos.length ? (
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
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
                onError={(e) => {
                  e.target.poster = "/placeholder.png";
                }}
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-700 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500">
                  {v.subcategory || "General"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">
          No cards available in this category yet ✨
        </p>
      )}
    </main>
  );
    }
