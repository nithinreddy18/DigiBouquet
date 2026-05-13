import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.pauwee.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
