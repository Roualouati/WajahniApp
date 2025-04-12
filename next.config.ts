import type { NextConfig } from "next";

const nextConfig: NextConfig = {
devIndicators: false
  /* config options here */
};

export default nextConfig;
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // or even '10mb' if needed
    },
  },
};
