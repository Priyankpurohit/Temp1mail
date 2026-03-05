import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Favicon rewrite - serve icon.svg for /favicon.ico requests */
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
      },
    ];
  },

  /* Performance: compress output, enable granular chunking */
  compress: true,

  /* Cache static assets aggressively */
  async headers() {
    return [
      {
        source: "/icon.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/ads.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
