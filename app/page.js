"use client";

import Top10Carousel from "./components/Top10Carousel";
import CategoriesCarousel from "./components/CategoriesCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center px-4 py-10 select-none">
      {/* 🌸 Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-3">
          Share moments that last forever ✨
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          With <b>Everwish</b>, every card becomes a memory you can relive.
        </p>
      </header>

      {/* 💖 Top 10 Carousel */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Top 10 Everwish Cards 💫
        </h2>
        <Top10Carousel />
      </section>

      {/* 🌸 Categories Carousel */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Explore Categories 🌷
        </h2>
        <CategoriesCarousel />
      </section>

      {/* 🧡 Footer */}
      <footer className="text-gray-500 text-sm mt-10 text-center">
        © {new Date().getFullYear()} Everwish · Share your moments with love 💌
      </footer>
    </main>
  );
        }
