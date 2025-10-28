"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Top10Carousel() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data.videos.slice(0, 10)); // top 10
    }
    load();
  }, []);

  if (!videos.length) {
    return <p className="text-center text-gray-400">Loading top videos...</p>;
  }

  return (
    <div className="flex overflow-x-auto space-x-6 p-2 no-scrollbar justify-start snap-x snap-mandatory">
      {videos.map((v, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="min-w-[250px] bg-white rounded-2xl shadow-md border border-pink-100 snap-start"
        >
          <video
            src={v.src}
            className="w-full h-48 object-cover rounded-t-2xl"
            muted
            loop
            playsInline
            autoPlay
          />
          <div className="p-4 text-center">
            <h3 className="font-semibold text-pink-600 text-lg">{v.title}</h3>
            <p className="text-sm text-gray-500 capitalize">
              {v.category} · {v.subcategory}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
              }
