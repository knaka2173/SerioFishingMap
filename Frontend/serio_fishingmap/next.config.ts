import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites() {
    return [
      {
        // 画像表示のテスト用
        source: "/300",
        destination: "https://picsum.photos/",
      },
    ];
  },
};

export default nextConfig;
