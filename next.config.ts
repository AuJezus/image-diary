import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "album.dimden.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "xsvosgzzbkwmgjtditzu.supabase.co",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
