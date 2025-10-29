"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Splash({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Animación del progreso
    const step1 = setTimeout(() => setProgress(50), 400);
    const step2 = setTimeout(() => setProgress(100), 900);

    // Efecto de parpadeo en el logo
    const fadeAnim = setInterval(() => setFade((f) => !f), 500);

    // Finaliza después de 2.2s
    const finish = setTimeout(() => {
      clearInterval(fadeAnim);
      if (typeof onFinish === "function") onFinish();
    }, 2200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(finish);
      clearInterval(fadeAnim);
    };
  }, [onFinish]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #fff5f7 0%, #ffeef2 40%, #ffffff 100%)",
      }}
    >
      {/* 🌸 Logo con efecto fade */}
      <div
        className={`transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-40"
        }`}
      >
        <Image
          src="/logo.png"
          alt="Everwish Logo"
          width={180}
          height={180}
          priority
          className="drop-shadow-md"
        />
      </div>

      {/* 🌈 Barra de carga suave */}
      <div className="w-52 h-2 bg-pink-100 rounded-full overflow-hidden mt-6 shadow-inner">
        <div
          className="h-full bg-pink-400 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ✨ Texto opcional de carga */}
      <p className="text-gray-400 text-sm mt-3 font-medium">
        Preparing your wishes...
      </p>
    </div>
  );
        }
