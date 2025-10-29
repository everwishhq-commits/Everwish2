/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "everwish.store", "vercel.app"],
  },
  experimental: {
    appDir: true,
  },
};

// 🚨 En proyectos con "type": "module", debes usar `export default`
export default nextConfig;
