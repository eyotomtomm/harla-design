import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/thought-leadership", permanent: true },
      { source: "/blog/:slug", destination: "/thought-leadership", permanent: true },
      { source: "/projects/:slug", destination: "/projects", permanent: true },
    ];
  },
};

export default nextConfig;
