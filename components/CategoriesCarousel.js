"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import "swiper/css";

// ✅ 6 categorías finales
const CATEGORIES = [
  {
    name: "Holidays",
    emoji: "🎄",
    slug: "holidays",
    color: "#FFF4E0",
    keywords: [
      "christmas","xmas","thanksgiving","newyear","new year",
      "july4th","4th of july","independenceday","independence",
      "easter","halloween","hanukkah","st patrick","st. patrick","stpatricks",
      "oktoberfest","labor day","memorial day","veterans day","mlk day"
    ],
  },
  {
    name: "Love",
    emoji: "❤️",
    slug: "love",
    color: "#FFE8EE",
    keywords: ["love","romance","romantic","valentine","valentine's","anniversary","wedding","engagement","proposal","couple","hugs","kiss"],
  },
  {
    name: "Celebrations",
    emoji: "🎉",
    slug: "celebrations",
    color: "#FFF7FF",
    keywords: ["birthday","bday","graduation","congrats","congratulations","mothers-day","mother's day","fathers-day","father's day","babyshower","newborn","party"],
  },
  {
    name: "Animals & Nature",
    emoji: "🐾",
    slug: "animals-nature",
    color: "#E8FFF3",
    keywords: ["pets","pet","animals","dog","cat","dogcat","yeti","eagle","turtle","nature","wildlife"],
  },
  {
    name: "Seasons",
    emoji: "🍂",
    slug: "seasons",
    color: "#E8F3FF",
    keywords: ["summer","spring","autumn","fall","winter","seasonal"],
  },
  {
    name: "Family & Friends",
    emoji: "👨‍👩‍👧‍👦",
    slug: "family-friends",
    color: "#E5EDFF",
    keywords: ["family","friend","friendship","mom","mother","dad","father","siblings","bestie","bff"],
  },
];

export default function CategoriesCarousel() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(CATEGORIES);

  // 🔍 Busca por nombre de categoría o por keywords
  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setFiltered(CATEGORIES);
      return;
    }
    const result = CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.keywords && c.keywords.some((k) => k.toLowerCase().includes(q)))
    );
    setFiltered(result);
  }, [search]);

  return (
    <section id="categories" className="text-center py-8 px-3 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Categories
      </h2>

      {/* 🔎 Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search — e.g. halloween, valentine, birthday…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 md:w-96 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
        />
      </div>

      {/* 🎠 Swiper carousel */}
      <Swiper
        slidesPerView={3.2}
        spaceBetween={16}
        centeredSlides
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={1000}
        breakpoints={{
          0: { slidesPerView: 2.3, spaceBetween: 10 },
          640: { slidesPerView: 3.5, spaceBetween: 14 },
          1024: { slidesPerView: 5, spaceBetween: 18 },
        }}
        modules={[Autoplay]}
        className="overflow-visible"
      >
        {filtered.length ? (
          filtered.map((cat) => (
            <SwiperSlide key={cat.slug}>
              <Link href={`/categories/${cat.slug}`}>
                <motion.div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.07 }}
                >
                  <motion.div
                    className="rounded-full flex items-center justify-center w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] mx-auto shadow-md"
                    style={{ backgroundColor: cat.color }}
                  >
                    <motion.span
                      className="text-4xl sm:text-5xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {cat.emoji}
                    </motion.span>
                  </motion.div>
                  <p className="mt-2 font-semibold text-gray-800 text-sm md:text-base">
                    {cat.name}
                  </p>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-8">
            No matching categories for “{search}”
          </p>
        )}
      </Swiper>
    </section>
  );
    }
