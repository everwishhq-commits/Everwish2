/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // ayuda a detectar errores en desarrollo
  swcMinify: true,       // optimiza el rendimiento del build
  images: {
    domains: ["everwish.store", "everwishs-projects.vercel.app"],
  },
  eslint: {
    ignoreDuringBuilds: true, // evita que falle el build si hay warnings
  },
  experimental: {
    appDir: true, // asegura compatibilidad total con la carpeta /app
  },
};

module.exports = nextConfig;
