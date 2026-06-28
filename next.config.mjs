/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance
  poweredByHeader: false,
  compress: true,

  // Security - prevent leaking source maps in production
  productionBrowserSourceMaps: false,

  // Turbopack configuration (Next.js 16 default bundler)
  turbopack: {
    root: process.cwd(),
  },

  // Server external packages for pdf-parse and mammoth
  serverExternalPackages: ["pdf-parse", "mammoth"],

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(svg|png|jpg|jpeg|gif|webp|ico|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
