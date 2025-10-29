"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import Header from "@/components/Header";
import Carousel from "@/components/Top10Carousel";
import Categories from "@/components/CategoriesCarousel";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Splash onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          {/* 🌸 Encabezado */}
          <Header />

          {/* 🌸 Fondo rosado → blanco extendido hasta el footer */}
          <main
            className="flex flex-col items-center justify-start min-h-screen text-gray-700 pt-20 px-4"
            style={{
              background:
                "linear-gradient(to bottom, #fff5f7 0%, #fff8f9 40%, #ffffff 100%)",
            }}
          >
            {/* ✨ Mensaje principal */}
            <h1 className="text-3xl font-bold mb-3 text-gray-800 text-center">
              Share moments that last forever 💫
            </h1>
            <p className="text-gray-500 mb-10 text-center">
              With <b>Everwish</b>, every card becomes a memory you can relive.
            </p>

            {/* 🎞️ Carrusel Top 10 */}
            <div className="w-full max-w-5xl mb-12">
              <Carousel />
            </div>

            {/* 📦 Categorías */}
            <div className="w-full bg-white rounded-3xl shadow-lg px-2 py-6 mb-10 border border-pink-100">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                Discover All Categories 🌈
              </h2>
              <Categories />
            </div>
          </main>

          {/* 🌙 Footer */}
          <Footer />
        </>
      )}
    </>
  );
              }
