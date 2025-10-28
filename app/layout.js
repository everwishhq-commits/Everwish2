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
      </body>
    </html>
  );
}
