"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { slug } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        const categoryName = slug.replace(/-/g, " ");
        const filtered = data.videos.filter(
          (v) => v.category?.toLowerCase() === categoryName.toLowerCase()
        );
        setVideos(filtered);
      } catch (err) {
        console.error("Error loading category:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-[#fff5f8] text-gray-800 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-extrabold text-pink-600 mb-6 capitalize text-center">
        {slug.replace(/-/g, " ")}
      </h1>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl">
        {videos.length ? (
          videos.map((v, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 hover:bg-pink-50 p-4 w-64 cursor-pointer"
            >
              <video
                src={v.src.startsWith("/cards/") ? v.src : `/cards/${v.src}`}
                className="w-full h-48 object-cover rounded-2xl bg-black"
                muted
                loop
                playsInline
                autoPlay
              />
              <p className="text-center mt-2 text-gray-700 font-semibold truncate">
                {v.title}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No cards available in this category yet ✨
          </p>
        )}
      </div>
    </main>
  );
}
