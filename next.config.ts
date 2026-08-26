import type { NextConfig } from "next";

// Unique per build: static asset URLs get ?dpl=<id>, so a CDN can never serve a
// stale (or, as happened once, mis-cached) copy of a chunk after a deploy.
const deploymentId = (process.env.HBUILD_ID || Date.now().toString(36)).replace(/[^a-z0-9-]/gi, "");

const nextConfig: NextConfig = {
  output: "standalone",
  deploymentId,
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
