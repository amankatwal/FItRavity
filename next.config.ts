import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/dwyvsmlx3/image/upload/**",
    },
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    },
    {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
  ],
},
 experimental: {
    authInterrupts: true,
  },
  reactCompiler: true,
};

export default nextConfig;
