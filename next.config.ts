import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "o9njzoyega.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  experimental: {
    // globalNotFound: true,
    // turbopackFileSystemCacheForDev: true, // Enable filesystem caching for `next dev`
    // turbopackFileSystemCacheForBuild: true, // Enable filesystem caching for `next build`
  },
};

export default nextConfig;
