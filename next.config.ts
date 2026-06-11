import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Enable automatic image optimization via Next.js Image API.
     * This optimizes images on-demand and caches them.
     * Works with both self-hosted and CDN deployments.
     *
     * Set to 'true' only if you cannot use Next.js Image optimization
     * (e.g., pure static hosting without serverless support).
     */
    unoptimized: false,

    /**
     * Allow remote images from external domains if needed.
     * Currently unused but available for future external image sources.
     */
    remotePatterns: [
      // Example: { protocol: "https", hostname: "*.example.com" }
    ],
  },
};

export default nextConfig;
