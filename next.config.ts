import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images and common placeholders
    remotePatterns: [],
    // Disable image optimization for local dev simplicity
    unoptimized: true,
  },
};

export default nextConfig;
