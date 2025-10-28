"use client";
import { useState } from "react";
import Top10Carousel from "@/components/Top10Carousel";
import CategoriesCarousel from "@/components/CategoriesCarousel";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-4 text-center">
        Share moments that last forever ✨
      </h1>

      <p className="text-gray-600 mb-8 text-center">
        With <b>Everwish</b>, every card becomes a memory you can relive.
      </p>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search cards or categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-12 rounded-full border border-pink-200 bg-white/70 px-4 py-3 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
      />

      {/* 💌 Top 10 Cards */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Top 10 Cards 💌</h2>
        <Top10Carousel search={search} />
      </section>

      {/* 🎨 Categories */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Explore Categories 🎨</h2>
        <CategoriesCarousel search={search} />
      </section>
    </main>
  );
          }
