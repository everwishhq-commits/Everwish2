"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  // 🧭 Detectar scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 💾 Recuperar usuario local
  useEffect(() => {
    try {
      const stored = localStorage.getItem("everwishUser");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "h-14 shadow-md bg-white/95 backdrop-blur" : "h-20 bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-full">
        {/* 🌸 Logo Everwish */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isScrolled ? 0.85 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Everwish Logo"
              width={isScrolled ? 55 : 70}
              height={isScrolled ? 55 : 70}
              priority
              className="object-contain select-none"
            />
          </Link>
        </motion.div>

        {/* 🔹 Menú */}
        <nav className="flex items-center gap-5 md:gap-7 text-gray-700 font-semibold text-sm md:text-base">
          <Link
            href="/categories"
            className={`transition ${
              isActive("/categories")
                ? "text-pink-500 font-bold underline underline-offset-4"
                : "hover:text-pink-500"
            }`}
          >
            Categories
          </Link>

          <button
            onClick={() => setShowPopup(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 md:px-5 md:py-2 rounded-full shadow font-semibold text-xs md:text-sm transition-all"
          >
            {user
              ? `Hi, ${user.name?.split(" ")[0] || "User"} 💖`
              : "My Everwish Space"}
          </button>
        </nav>
      </div>

      {/* 💫 Popup animado */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl w-full max-w-md p-6 mx-4 text-center relative shadow-2xl"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>

              {user ? (
                <>
                  <h2 className="text-xl font-bold text-pink-600 mb-3">
                    💖 Welcome back, {user.name?.split(" ")[0] || "friend"}!
                  </h2>
                  <p className="text-gray-600 text-sm mb-5">
                    Everwish ID: <strong>{user.id}</strong>
                  </p>

                  <div className="flex flex-col gap-3 text-sm font-semibold">
                    <Link
                      href="/my-cards"
                      className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-full"
                    >
                      My Cards 💌
                    </Link>
                    <Link
                      href="/received"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-full"
                    >
                      Received 🎁
                    </Link>
                    <Link
                      href="/plans"
                      className="bg-pink-400 hover:bg-pink-500 text-white py-2 rounded-full"
                    >
                      Plans & Promos ⭐
                    </Link>
                    <Link
                      href="/settings"
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-full"
                    >
                      Settings ⚙️
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("everwishUser");
                        setUser(null);
                        setShowPopup(false);
                      }}
                      className="text-gray-500 hover:text-red-500 mt-2"
                    >
                      Leave my space 🌙
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-pink-600 mb-2">
                    💌 Welcome to Everwish
                  </h2>
                  <p className="text-sm text-gray-600 mb-5">
                    Your personal space to create, send, and receive digital
                    cards full of joy. ✨
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const id = e.target.idOrEmail.value.trim();
                      const phone = e.target.phone.value.trim();
                      const stored = JSON.parse(
                        localStorage.getItem("everwishUser") || "{}"
                      );
                      if (
                        stored &&
                        (stored.id === id ||
                          stored.email === id ||
                          stored.phone === phone)
                      ) {
                        alert("✅ Access granted!");
                        setUser(stored);
                        setShowPopup(false);
                      } else {
                        alert("❌ No account found. Try again.");
                      }
                    }}
                    className="flex flex-col gap-3"
                  >
                    <input
                      name="idOrEmail"
                      placeholder="Everwish ID or Email"
                      className="border rounded-xl p-3 text-sm text-center"
                      required
                    />
                    <input
                      name="phone"
                      placeholder="Phone number"
                      className="border rounded-xl p-3 text-sm text-center"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-full"
                    >
                      Access My Space 💌
                    </button>
                  </form>

                  <button
                    onClick={() => setShowPopup(false)}
                    className="text-pink-500 font-semibold mt-4 text-sm hover:underline"
                  >
                    Just view cards ✨
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
