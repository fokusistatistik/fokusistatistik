import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.fokusistatistik.com',
      },
      {
        protocol: 'https',
        hostname: 'asistan.fokusistatistik.com',
      },
    ],
  },
};

export default nextConfig;
