import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
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
