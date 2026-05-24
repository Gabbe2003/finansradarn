import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "i.pravatar.cc" },
      { hostname: "cms.finansradarn.se" },
      { hostname: "finansradarn.se" },
      { hostname: "secure.gravatar.com" },
    ],
  },
};

export default nextConfig;
