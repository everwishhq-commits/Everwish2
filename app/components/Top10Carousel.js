"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Top10Carousel({ search }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos.slice(0, 10)));
  }, []);

  const filtered = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0)
    return <p className="text-gray-400 text-center">No cards found.</p>;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
      {filtered.map((v, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="min-w-[200px] bg-white shadow rounded-2xl overflow-hidden snap-center"
        >
          <video
            src={v.src}
            className="object-cover w-full aspect-[4/5]"
            playsInline
            loop
            muted
          />
          <p className="text-center py-2 text-gray-700 font-semibold">{v.title}</p>
        </motion.div>
      ))}
    </div>
  );
              }
