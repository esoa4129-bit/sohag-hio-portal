/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  // 1. Disable Vercel Image Optimization quota consumption
  // Serves images directly with zero serverless transformation cost
  images: {
    unoptimized: true,
  },

  // 2. Extreme Aggressive Edge & Browser Caching Headers
  // Visitors download static files, fonts, and schedules once; subsequent visits consume 0 bytes from Vercel!
  async headers() {
    return [
      {
        // 1 Year Immutable Cache for Static Assets (Images, Icons, Fonts, Manifests)
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|eot|webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 1 Year Immutable Cache for Next.js Bundled Chunks (JS & CSS with content-hash)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Service Worker: Short cache to allow instant updates while avoiding excessive calls
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
