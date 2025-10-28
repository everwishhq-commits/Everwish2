"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [videos, setVideos] = useState([]);
  const [groups, setGroups] = useState({});
  const [activeSub, setActiveSub] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalize = (str) =>
    str?.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and").trim();

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        const all = data.videos || [];
        const current = normalize(slug);

        const filtered = all.filter(
          (v) => normalize(v.category) === current
        );

        const grouped = {};
        for (const v of filtered) {
          const sub =
            (v.subcategory && v.subcategory.trim()) ||
            "General";
          const clean = sub.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          if (!grouped[clean]) grouped[clean] = [];
          grouped[clean].push(v);
        }

        setVideos(filtered);
        setGroups(grouped);
      } catch (err) {
        console.error("❌ Error loading category videos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, [slug]);

  const subcategories = Object.keys(groups);
  const activeVideos = activeSub ? groups[activeSub] || [] : [];

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#fff5f8] text-gray-600">
        <p className="animate-pulse text-lg">
          Loading cards for <b>{slug}</b> ✨
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center py-10 px-4">
      {/* 🧭 Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span
          onClick={() => router.push("/")}
          className="cursor-pointer hover:text-pink-500"
        >
          Home
        </span>{" "}
        ›{" "}
        <span
          onClick={() => router.push("/categories")}
          className="cursor-pointer hover:text-pink-500"
        >
          Categories
        </span>{" "}
        ›{" "}
        <span className="text-gray-700 capitalize">
          {slug.replaceAll("-", " ")}
        </span>
      </nav>

      <h1 className="text-4xl font-extrabold text-pink-600 mb-3 capitalize text-center">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-lg">
        Explore all subcategories and videos in this section ✨
      </p>

      {/* 🌸 Subcategories */}
      {subcategories.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mb-8">
          {subcategories.map((sub, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={`px-5 py-3 rounded-full bg-white shadow-sm border border-pink-100 hover:border-pink-200 hover:bg-pink-50 text-gray-700 font-semibold ${
                activeSub === sub ? "bg-pink-100 text-pink-600" : ""
              }`}
              onClick={() => setActiveSub(sub)}
            >
              {sub}
            </motion.button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No subcategories found.
        </p>
      )}

      {/* 💫 Modal con videos */}
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
                  <p className="text-gray-500 text-center mt-10">
                    No cards found for this subcategory.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {activeVideos.map((v, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white border border-pink-100 rounded-2xl shadow-md p-4 flex flex-col items-center"
                      >
                        <video
                          src={v.url}
                          className="rounded-xl w-full h-40 object-cover mb-3"
                          controls={false}
                          autoPlay
                          loop
                          muted
                        />
                        <p className="text-gray-700 font-semibold text-center">
                          {v.title || v.slug?.replace(/-/g, " ")}
                        </p>
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
