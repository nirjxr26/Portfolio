import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/icons/hookdrop/:path*",
        headers: [
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
      {
        source: "/icons/home/:path*",
        headers: [
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
      {
        source: "/og-image.webp",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
