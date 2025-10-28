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
        const res = await fetch("/api/videos");
        const data = await res.json();
        // Tomar solo los primeros 10 videos (Top 10)
        const topVideos = data.videos.slice(0, 10);
        setVideos(topVideos);
      } catch (err) {
        console.error("Error loading videos:", err);
      }
    }
    load();
  }, []);

  if (!videos.length)
    return (
      <p className="text-center text-gray-400 mt-6">
        Loading top cards...
      </p>
    );

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        🌟 Top 10 Everwish Cards
      </h2>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory">
        {videos.map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="min-w-[220px] bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 flex-shrink-0 text-center cursor-pointer snap-start"
            onClick={() => router.push(`/categories/${v.category.toLowerCase().replace(/\s+/g, "-")}`)}
          >
            <video
              key={v.src}
              src={v.src.startsWith("/cards/") ? v.src : `/cards/${v.src}`}
              className="w-full h-48 object-cover rounded-t-3xl bg-black"
              muted
              loop
              playsInline
              autoPlay
              onError={(e) => {
                e.target.poster = "/placeholder.png";
              }}
            />
            <p className="font-semibold text-gray-700 mt-2 px-2">
              {v.title || v.category}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
    }
