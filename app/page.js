"use client";

import { useEffect, useState } from "react";
import Top10Carousel from "../components/Top10Carousel";
import CategoriesCarousel from "../components/CategoriesCarousel";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar videos desde /api/videos
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.error("❌ Error loading videos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#fff5f8] text-gray-600">
        <p className="animate-pulse text-lg">Loading Everwish videos ✨</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-[#fff5f8] text-gray-800 px-4 py-10">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-2 text-center">
        Share moments that last forever ✨
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-xl">
        With <b>Everwish</b>, every card becomes a memory you can relive.
      </p>

      {/* 🎥 Carrusel Top 10 */}
      <section className="w-full max-w-5xl mb-12">
        <Top10Carousel videos={videos.slice(0, 10)} />
      </section>

      {/* 🏷️ Carrusel de Categorías */}
      <section className="w-full max-w-5xl">
        <CategoriesCarousel videos={videos} />
      </section>
    </main>
  );
        }
