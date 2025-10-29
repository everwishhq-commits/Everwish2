"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen({ onComplete }) {
  const [progressValue, setProgressValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de progreso
    const step1 = setTimeout(() => setProgressValue(50), 500);
    const step2 = setTimeout(() => setProgressValue(100), 1000);

    // Parpadeo suave del logo
    const blink = setInterval(() => setIsVisible((v) => !v), 500);

    // Finalizar splash tras 2 segundos
    const finish = setTimeout(() => {
      clearInterval(blink);
      if (typeof onComplete === "function") onComplete();
    }, 2000);

    // Limpieza
    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(finish);
      clearInterval(blink);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white relative">
      {/* Contenedor principal */}
      <div className="absolute top-[45%] -translate-y-1/2 flex flex-col items-center">
        {/* Logo con parpadeo */}
        <div
          className={`transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-40"
          }`}
        >
          <Image
            src="/logo.png"
            alt="Everwish Logo"
            width={180}
            height={180}
            priority
          />
        </div>

        {/* Barra de progreso */}
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-pink-500 transition-all duration-500"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>
    </div>
  );
          }
