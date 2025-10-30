"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_CATEGORIES } from "@/lib/categories.js";

// 🔹 Normalizador básico
function normalize(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function CategoryPage() {
  const { slug } = useParams(); // Ej: "holidays"
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = normalize(searchParams.get("q") || "");

  const [videos, setVideos] = useState([]);
  const [grouped, setGrouped] = useState({});
  const [activeSub, setActiveSub] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Cargar videos del API
  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        const allVideos = data.videos || [];
        const q = normalize(query);
        const singularQ = q.endsWith("s") ? q.slice(0, -1) : q;

        // 🔍 Filtrar por categoría principal
        const filtered = allVideos.filter((v) => {
          const inCategory =
            normalize(v.mainSlug) === normalize(slug) ||
            normalize(v.category) === normalize(slug);

          if (!inCategory) return false;

          // Filtrado por búsqueda
          const fullText = normalize(
            [v.object, v.category, v.subcategory, v.src].join(" ")
          );
          return (
            !q || fullText.includes(q) || fullText.includes(singularQ)
          );
        });

        // Agrupar por subcategoría
        const bySub = {};
        for (const v of filtered) {
          const sub =
            v.subcategory && v.subcategory !== "general"
              ? v.subcategory
              : v.category || "General";
          if (!bySub[sub]) bySub[sub] = [];
          bySub[sub].push(v);
        }

        setVideos(filtered);
        setGrouped(bySub);
      } catch (err) {
        console.error("❌ Error al cargar videos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [slug, query]);

  const subcategories = Object.keys(grouped).sort();
  const activeVideos = activeSub ? grouped[activeSub] || [] : [];

  // 🌀 Pantalla de carga
  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#fff5f8] text-gray-600">
        <p className="animate-pulse text-lg">Loading cards ✨</p>
      </main>
    );
  }

  // 🖼 Render principal
  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 py-10 px-6 flex flex-col items-center">
      {/* 🔙 Botón volver */}
      <button
        onClick={() => router.push("/categories")}
        className="text-pink-500 hover:text-pink-600 font-semibold mb-6"
      >
        ← Back to Categories
      </button>

      {/* 💖 Título */}
      <h1 className="text-3xl font-extrabold text-pink-600 mb-3 capitalize text-center">
        {MAIN_CATEGORIES[slug]?.mainName || slug.replace(/-/g, " ")}
      </h1>

      {query ? (
        <p className="text-gray-500 mb-8 text-center">
          Showing results for <strong>“{query}”</strong>
        </p>
      ) : (
        <p className="text-gray-400 mb-8 text-center">
          Tap any subcategory to view cards ✨
        </p>
      )}

      {/* 🔸 Botones de subcategorías */}
      {subcategories.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mb-10">
          {subcategories.map((sub, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveSub(sub)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={`px-5 py-3 rounded-full bg-white shadow-sm border ${
                activeSub === sub
                  ? "border-pink-300 bg-pink-50"
                  : "border-pink-100 hover:border-pink-200 hover:bg-pink-50"
              } text-gray-700 font-semibold`}
            >
              {sub.replace(/-/g, " ")}
            </motion.button>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center italic mt-8">
          No subcategories match “{query}” in this category ✨
        </p>
      )}

      {/* 🎬 Grid general de videos si no hay sub seleccionada */}
      {!activeSub && (
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 p-4 w-64 cursor-pointer"
              onClick={() => router.push(`/edit/${v.mainSlug}`)}
            >
              <video
                src={v.src}
                className="w-full h-48 object-cover rounded-2xl"
                muted
                loop
                playsInline
                autoPlay
              />
              <div className="text-center mt-3">
                <p className="text-gray-700 font-semibold truncate">
                  {v.object}
                </p>
                <p className="text-sm text-gray-500">
                  {v.subcategory !== "general"
                    ? v.subcategory
                    : "General"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🪄 Modal de subcategoría */}
      <AnimatePresence>
        {activeSub && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSub(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-white rounded-3xl shadow-xl w-[90%] max-w-5xl h-[70vh] overflow-y-auto border border-pink-100 p-6">
                <button
                  onClick={() => setActiveSub(null)}
                  className="absolute top-3 right-5 text-gray-400 hover:text-pink-500 text-2xl font-bold"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold text-pink-600 mb-4 capitalize">
                  {activeSub}
                </h2>

                {activeVideos.length === 0 ? (
                  <p className="text-gray-400 text-center mt-10 italic">
                    No cards found for this subcategory yet ✨
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
                    {activeVideos.map((video, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => router.push(`/edit/${video.mainSlug}`)}
                        className="cursor-pointer bg-white rounded-3xl shadow-md border border-pink-100 overflow-hidden hover:shadow-lg"
                      >
                        <video
                          src={video.src}
                          className="object-cover w-full aspect-[4/5]"
                          playsInline
                          loop
                          muted
                        />
                        <div className="text-center py-2 text-gray-700 font-semibold text-sm">
                          {video.object}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
         }
