"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Top10Carousel() {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const autoplayRef = useRef(null);
  const pauseRef = useRef(false);

  // 🕒 Autoplay (cada 5 segundos)
  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    if (!pauseRef.current && videos.length > 0) {
      autoplayRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % videos.length);
      }, 5000);
    }
  };

  // 🎥 Cargar videos desde API
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        const topVideos = (data.videos || []).slice(0, 10);
        setVideos(topVideos);
      } catch (err) {
        console.error("❌ Error loading videos:", err);
      }
    }
    loadVideos();

    // Recarga automática cada 24 horas
    const interval = setInterval(loadVideos, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [videos]);

  if (!videos.length)
    return <p className="text-center text-gray-400 mt-6">Loading videos...</p>;

  return (
    <section className="flex flex-col items-center w-full mt-8 mb-10">
      <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">
        🏆 Top 10 Everwish Cards
      </h2>

      <div className="relative w-full max-w-5xl h-[400px] flex justify-center items-center overflow-hidden rounded-3xl">
        {videos.map((v, i) => {
          const offset = (i - index + videos.length) % videos.length;
          const posClass =
            offset === 0
              ? "translate-x-0 scale-100 z-20 opacity-100"
              : offset === 1
              ? "translate-x-full scale-90 z-10 opacity-50"
              : offset === videos.length - 1
              ? "-translate-x-full scale-90 z-10 opacity-50"
              : "opacity-0 z-0";

          return (
            <motion.div
              key={i}
              className={`absolute transition-all duration-700 ease-in-out ${posClass}`}
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                router.push(`/categories/${v.mainSlug || v.category}`)
              }
            >
              <video
                src={v.src.startsWith("/cards/") ? v.src : `/cards/${v.src}`}
                autoPlay
                loop
                muted
                playsInline
                className="w-[280px] sm:w-[320px] md:w-[360px] h-[400px] rounded-2xl shadow-lg object-cover bg-black cursor-pointer"
              />
              <div className="text-center mt-3">
                <p className="text-gray-700 font-semibold truncate">
                  {v.combinedName || v.title || "Everwish Card"}
                </p>
                <p className="text-sm text-gray-500">
                  {v.mainEmoji || "💌"} {v.mainName || ""}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🔘 Indicadores (dots) */}
      <div className="flex mt-5 gap-2">
        {videos.map((_, i) => (
          <span
            key={i}
            onClick={() => {
              setIndex(i);
              pauseRef.current = true;
              clearInterval(autoplayRef.current);
              setTimeout(() => {
                pauseRef.current = false;
                startAutoplay();
              }, 3000);
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === index ? "bg-pink-500 scale-125" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
    }
