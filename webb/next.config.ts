import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  /** Undviker Vercel Image Optimization-kvot (Hobby). Bilder levereras direkt från /public. */
  images: {
    unoptimized: true,
  },

  /** Gammal sida → startsida */
  async redirects() {
    return [
      {
        source: "/tradgardsplanering",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tradgardsplanering/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
