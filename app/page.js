"use client";
import { useEffect, useState } from "react";
import Top10Carousel from "@/components/Top10Carousel";
import CategoriesCarousel from "@/components/CategoriesCarousel";

export default function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error("❌ Error loading videos:", err);
      }
    }
    loadVideos();
  }, []);

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6 text-center">
        💌 Everwish Moments
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Discover digital cards full of joy, love, and celebration ✨
      </p>

      <section className="w-full max-w-6xl mb-16">
        <Top10Carousel videos={videos} />
      </section>

      <section className="w-full max-w-6xl">
        <CategoriesCarousel videos={videos} />
      </section>
    </main>
  );
    }
