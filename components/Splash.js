"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Splash({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (typeof onFinish === "function") onFinish();
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white text-gray-700">
      {/* Contenedor central */}
      <div className="flex flex-col items-center justify-center text-center">
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
    </div>
  );
        }
