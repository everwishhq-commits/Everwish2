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

export default nextConfig;
