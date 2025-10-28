import "./globals.css";

export const metadata = {
  title: "Everwish",
  description: "Share moments that last forever ✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#fff5f8] text-[#333] font-sans m-0 p-0 min-h-screen">
        <main className="min-h-screen">{children}</main>

        <footer className="text-center text-sm text-gray-500 mt-10 py-6 border-t border-pink-100">
          © 2025 <strong className="text-pink-600">Everwish</strong> · Share your moments with love 💌
        </footer>
      </body>
    </html>
  );
}
