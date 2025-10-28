"use client";
import { useEffect, useState } from "react";
import Top10Carousel from "../components/Top10Carousel";
import CategoriesCarousel from "../components/CategoriesCarousel";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎥 Cargar videos desde /api/videos
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error("❌ Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center text-gray-500">
        <p>Loading Everwish cards...</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center text-gray-800 pt-10 pb-20 px-4"
      style={{
        background:
          "linear-gradient(to bottom, #fff5f8 0%, #fff8fa 40%, #ffffff 100%)",
      }}
    >
      {/* 🌸 Encabezado */}
      <h1 className="text-4xl font-extrabold text-pink-600 mb-4 text-center">
        💌 Everwish Moments
      </h1>
      <p className="text-gray-600 text-center mb-10 max-w-xl">
        Discover digital cards full of joy, love, and celebration ✨
      </p>

      {/* 🏆 Carrusel principal */}
      <section className="w-full max-w-5xl mb-16">
        <Top10Carousel videos={videos} />
      </section>

      {/* 📦 Carrusel de categorías */}
      <section className="w-full max-w-6xl">
        <CategoriesCarousel videos={videos} />
      </section>
    </main>
  );
}
