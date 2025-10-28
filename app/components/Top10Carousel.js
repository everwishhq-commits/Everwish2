"use client";
import { motion } from "framer-motion";

export default function Top10Carousel({ videos = [] }) {
  if (!videos.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        🌟 Top 10 Trending
      </h2>
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {videos.map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="min-w-[220px] bg-white rounded-3xl shadow-md border border-pink-100 hover:border-pink-200 p-4 flex-shrink-0 text-center"
          >
            <video
              src={v.url}
              className="rounded-xl w-full h-40 object-cover mb-2"
              controls={false}
              autoPlay
              loop
              muted
            />
            <p className="text-gray-700 font-semibold capitalize">
              {v.title || v.slug.replace(/-/g, " ")}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
                }
