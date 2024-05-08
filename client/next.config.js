/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ila.edu.vn",
      },
    ],
  },
};

module.exports = nextConfig;
