"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import Header from "@/components/header";
import Carousel from "@/components/carousel";
import Categories from "@/components/categories";
import Footer from "@/components/footer";
import Splash from "@/components/splash";

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 🩷 Splash inicial Everwish */}
      {loading && <Splash onFinish={() => setLoading(false)} />}

      {/* 🌸 Contenido principal */}
      {!loading && (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fff5f7] via-[#fff8f9] to-white text-gray-700">
          {/* 🔝 Encabezado */}
          <Header />

          {/* 🏠 Sección principal */}
          <main className="flex flex-col items-center justify-start flex-1 w-full pt-20 px-4 text-center">
            {/* ✨ Texto principal */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-800">
              Share moments that last forever 💫
            </h1>
            <p className="text-gray-500 mb-10 max-w-lg">
              With <b className="text-pink-500">Everwish</b>, every card becomes
              a memory you can relive.
            </p>

            {/* 🎞️ Carrusel principal */}
            <div className="w-full max-w-4xl mb-12">
              <Carousel />
            </div>

            {/* 🧩 Categorías */}
            <section className="w-full bg-white rounded-3xl shadow-lg border border-pink-100 px-4 py-6 mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-pink-600">
                Explore Categories ✨
              </h2>
              <Categories />
            </section>
          </main>

          {/* 👣 Footer Everwish */}
          <Footer />
        </div>
      )}
    </>
  );
              }
