import "./globals.css";

export const metadata = {
  title: "Everwish",
  description: "Share moments that last forever ✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#fff5f8",
          color: "#333",
          fontFamily: "system-ui, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
        <footer
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            marginTop: "4rem",
            padding: "1rem 0",
            color: "#777",
          }}
        >
          © 2025 <strong>Everwish</strong> · Share your moments with love 💌
        </footer>
      </body>
    </html>
  );
            }
