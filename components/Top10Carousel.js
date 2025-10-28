"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Top10Carousel() {
  const [videos, setVideos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();

        // 🏆 Seleccionar los primeros 10 (luego se puede mejorar con lógica de ranking)
        const topVideos = data.videos.slice(0, 10);
        setVideos(topVideos);
      } catch (err) {
        console.error("❌ Error loading videos:", err);
      }
    }
    load();
  }, []);

  if (!videos.length)
    return <p className="text-center text-gray-400 mt-6">Loading videos...</p>;

  return (
    <section>
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        🏆 Top 10 Everwish Cards
      </h2>

      <div className="flex overflow-x-auto gap-6 pb-4 px-2 no-scrollbar snap-x snap-mandatory justify-start">
        {videos.map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="min-w-[220px] bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 p-4 flex-shrink-0 cursor-pointer snap-start"
            // 👉 redirige a la categoría principal
            onClick={() => router.push(`/categories/${v.mainSlug}`)}
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
            <div className="text-center mt-2">
              <p className="text-gray-700 font-semibold truncate">
                {v.combinedName || "Everwish Card"}
              </p>
              <p className="text-sm text-gray-500">
                {v.mainEmoji} {v.mainName}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
          }
