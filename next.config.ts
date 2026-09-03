import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  ],
},
 experimental: {
    authInterrupts: true,
  },
  reactCompiler: true,
};

export default nextConfig;
