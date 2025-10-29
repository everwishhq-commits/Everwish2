"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-b from-white via-[#fff7f8] to-[#ffeef3] text-gray-700 pt-10 pb-6 mt-20 border-t border-pink-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        {/* 💌 Logo y nombre */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-2xl font-extrabold text-pink-500 tracking-wide">
            Everwish
          </p>
          <p className="text-sm text-gray-500">
            Share moments that last forever 💫
          </p>
        </div>

        {/* 🔗 Enlaces */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-5 text-sm font-medium">
          <a
            href="#"
            className="hover:text-pink-500 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-pink-500 transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="#"
            className="hover:text-pink-500 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-pink-500 transition-colors duration-300"
          >
            Terms of Use
          </a>
        </nav>
      </div>

      {/* 🌸 Separador inferior */}
      <div className="w-full mt-8 border-t border-pink-100"></div>

      {/* 🕊️ Créditos */}
      <div className="mt-4 text-center text-xs text-gray-500">
        © {year} Everwish. Crafted with 💖 for joyful connections.
      </div>
    </footer>
  );
}
