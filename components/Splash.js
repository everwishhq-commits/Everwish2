"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Splash({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setVisible(false);
            if (typeof onFinish === "function") onFinish();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-white text-gray-700 z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <Image
              src="/logo.png"
              alt="Everwish Logo"
              width={180}
              height={180}
              priority
              className="select-none mb-6"
            />

            {/* Barra de carga */}
            <div className="w-56 h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-pink-500 transition-all duration-200 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Porcentaje */}
            <p className="text-sm font-medium text-gray-600">{progress}%</p>

            {/* Texto */}
            <p className="mt-3 text-gray-400 text-sm">Preparing your wishes…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
                  }
