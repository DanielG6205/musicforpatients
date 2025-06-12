import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Needed for `next export`
  trailingSlash: true, // Optional: ensures / at end of URLs for Firebase
  images: {
    unoptimized: true, // Required for Firebase static hosting (no Next.js Image optimization)
  },
};

export default nextConfig;
