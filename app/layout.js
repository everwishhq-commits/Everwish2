import "./globals.css";

export const metadata = {
  title: "Everwish – Share Moments That Last Forever 💌",
  description:
    "Send beautiful digital cards for every occasion. Celebrate love, family, friendship, and life with Everwish.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFDDE7" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased text-gray-800 overflow-x-hidden m-0 p-0">
        {children}
      </body>
    </html>
  );
            }
