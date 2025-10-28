"use client";
import Top10Carousel from "./components/Top10Carousel";
import CategoriesCarousel from "./components/CategoriesCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-8 text-center">
        💌 Everwish Moments
      </h1>

      {/* Carrusel Top 10 */}
      <Top10Carousel />

      {/* Carrusel de Categorías */}
      <CategoriesCarousel />
    </main>
  );
}
