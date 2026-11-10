/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Photographs are bundled locally in /public/photos, so no remote
    // image optimisation domains are needed.
    remotePatterns: [],
  },
};

module.exports = nextConfig;
