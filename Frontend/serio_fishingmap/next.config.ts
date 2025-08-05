import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// 画像表示のテスト用
module.exports = {
  async rewrites() {
    return [
      {
        source: "/300",
        destination: "https://picsum.photos/",
      },
    ];
  },
};

export default nextConfig;
