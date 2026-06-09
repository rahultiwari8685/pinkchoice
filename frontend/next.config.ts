import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "api.pinkchoice.in",
    },
  ],
},
};

export default nextConfig;
