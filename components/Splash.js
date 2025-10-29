"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Splash({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Incrementa progresivamente hasta 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (typeof onFinish === "function") onFinish();
          }, 500); // Pequeña pausa antes de entrar al sitio
          return 100;
        }
        return prev + 4; // Velocidad de carga
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-700">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="Everwish Logo"
          width={180}
          height={180}
          priority
          className="select-none"
        />

        {/* Barra de carga */}
        <div className="w-56 h-3 bg-gray-200 rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-pink-500 transition-all duration-200 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Porcentaje */}
        <p className="mt-2 text-sm font-medium text-gray-500">
          {progress}%
        </p>

        {/* Texto inferior */}
        <p className="mt-4 text-gray-400 text-sm">
          Preparing your wishes…
        </p>
      </div>
    </div>
  );
}
