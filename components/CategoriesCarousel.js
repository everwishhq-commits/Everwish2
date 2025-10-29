"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import "swiper/css";

const CATEGORIES = [
  {
    name: "Holidays",
    emoji: "🎄",
    slug: "holidays",
    color: "#FFF4E0",
    keywords: [
      "christmas","xmas","newyear","new year","thanksgiving","easter","halloween",
      "independence","independence day","valentine","valentine's","hanukkah",
      "st patrick","st. patrick","oktoberfest","labor day","memorial day",
      "veterans day","mlk day","holiday","celebration"
    ],
    subcategories: [
      "Christmas","New Year","Thanksgiving","Easter","Halloween",
      "Valentine's Day","Independence Day","Hanukkah","Labor Day","Memorial Day",
      "Veterans Day","St. Patrick's Day"
    ],
  },
  {
    name: "Love",
    emoji: "❤️",
    slug: "love",
    color: "#FFE8EE",
    keywords: [
      "love","romance","romantic","valentine","wedding","engagement","anniversary",
      "proposal","couple","relationship","heart","hug","kiss","breakup","self love"
    ],
    subcategories: [
      "Romance","Anniversary","Wedding","Engagement","Proposal","Couples",
      "Hugs & Kisses","Relationships","Self Love","Long Distance"
    ],
  },
  {
    name: "Celebrations",
    emoji: "🎉",
    slug: "celebrations",
    color: "#FFF7FF",
    keywords: [
      "birthday","bday","graduation","congratulations","congrats","babyshower",
      "baby shower","newborn","retirement","achievement","promotion","milestone",
      "success","party","celebrate"
    ],
    subcategories: [
      "Birthday","Graduation","Congratulations","Baby Shower","Newborn",
      "Retirement","Achievement","Promotion","Success","Milestones"
    ],
  },
  {
    name: "Animals & Nature",
    emoji: "🐾",
    slug: "animals-nature",
    color: "#E8FFF3",
    keywords: [
      "pet","pets","animal","animals","dog","cat","bird","horse","elephant",
      "turtle","wildlife","nature","forest","flowers","yeti","fantasy"
    ],
    subcategories: [
      "Pets","Cats","Dogs","Birds","Horses","Elephants","Turtles","Yeti",
      "Fantasy Creatures","Wildlife","Nature","Flowers"
    ],
  },
  {
    name: "Seasons",
    emoji: "🍂",
    slug: "seasons",
    color: "#E8F3FF",
    keywords: [
      "season","summer","spring","autumn","fall","winter","vacation","travel",
      "adventure","weather","seasonal","season greetings"
    ],
    subcategories: [
      "Summer","Spring","Autumn","Fall","Winter","Season Greetings","Vacation",
      "Travel","Adventure"
    ],
  },
  {
    name: "Family & Friends",
    emoji: "👨‍👩‍👧‍👦",
    slug: "family-friends",
    color: "#E5EDFF",
    keywords: [
      "family","mom","mother","dad","father","parents","grandparents","sister",
      "brother","siblings","friend","friends","best friend","bff","support",
      "thank you","get well","condolence","condolences","sympathy","remembrance",
      "memory","loss","grief","healing","comfort","love ones","missing you"
    ],
    subcategories: [
      "Mom","Dad","Parents","Grandparents","Siblings","Best Friends","Friendship",
      "Support","Condolences","Sympathy","Remembrance","Get Well Soon","Thank You"
    ],
  },
];

export default function CategoriesCarousel() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(CATEGORIES);

  // 🔍 Filtrado de categorías y subcategorías
  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setFiltered(CATEGORIES);
      return;
    }

    const matches = CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.subcategories && c.subcategories.some((s) => s.toLowerCase().includes(q))) ||
        (c.keywords && c.keywords.some((k) => k.toLowerCase().includes(q)))
    );

    setFiltered(matches);
  }, [search]);

  return (
    <section id="categories" className="text-center py-10 px-3 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Explore by Category ✨
      </h2>

      {/* 🔎 Search bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search — e.g. birthday, love, condolences..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 md:w-96 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
        />
      </div>

      {/* 🎠 Carousel */}
      <Swiper
        slidesPerView={3.2}
        spaceBetween={16}
        centeredSlides
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={1000}
        breakpoints={{
          0: { slidesPerView: 2.4, spaceBetween: 10 },
          640: { slidesPerView: 3.4, spaceBetween: 14 },
          1024: { slidesPerView: 5, spaceBetween: 18 },
        }}
        modules={[Autoplay]}
        className="overflow-visible"
      >
        {filtered.length > 0 ? (
          filtered.map((cat, i) => (
            <SwiperSlide key={i}>
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
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
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
