/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  // 1. Disable Vercel Image Optimization quota consumption
  images: {
    unoptimized: true,
  },

  // 2. Extreme Aggressive Edge & Browser Caching Headers
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
        // Service Worker
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
