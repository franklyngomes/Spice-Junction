import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify the protocol (e.g., 'http', 'https')
        hostname: 'picsum.photos', // The exact hostname of the image source
      },
      {
        protocol: 'https', // Specify the protocol (e.g., 'http', 'https')
        hostname: 'spice-junction-server.onrender.com', // The exact hostname of the image source
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
