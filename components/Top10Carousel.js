"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

export default function Top10Carousel() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/videos", { cache: "no-store" });
        const data = await res.json();
        setVideos(data.videos.slice(0, 10));
      } catch (err) {
        console.error("❌ Error loading videos:", err);
      }
    }
    load();
  }, []);

  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">🏆 Top 10 Cards</h2>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination]}
        className="pb-8"
      >
        {videos.map((v, i) => (
          <SwiperSlide key={i}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-lg bg-white"
            >
              <video
                src={v.src}
                className="w-full h-[380px] object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <p className="text-gray-700 font-semibold py-2">
                {v.title || "Everwish Card"}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
