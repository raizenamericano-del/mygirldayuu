/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Seamless rendering for local images and Vercel static assets
  },
};

module.exports = nextConfig;
