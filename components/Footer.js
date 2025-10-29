"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative text-gray-600 py-10 mt-16 border-t border-pink-100"
      style={{
        background:
          "linear-gradient(to bottom, #fff9fa 0%, #fff5f7 40%, #ffffff 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* 🌸 Logo + texto */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Everwish Logo"
              width={55}
              height={55}
              className="select-none opacity-90"
            />
            <span className="font-semibold text-gray-700 text-lg hidden sm:inline">
              Everwish
            </span>
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            Share moments that last forever 💫
          </p>
        </div>

        {/* 📄 Enlaces */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 mt-6 md:mt-0 text-sm font-medium">
          <Link href="#" className="hover:text-pink-500 transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-pink-500 transition-colors">
            Contact
          </Link>
          <Link href="#" className="hover:text-pink-500 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-pink-500 transition-colors">
            Terms
          </Link>
        </div>
      </div>

      {/* 💖 Línea inferior */}
      <div className="text-center mt-8 text-xs text-gray-400">
        © {new Date().getFullYear()} Everwish — Made with 💖 for everyone who believes in small moments.
      </div>
    </footer>
  );
}
