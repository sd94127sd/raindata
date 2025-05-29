import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 啟用 standalone 輸出用於 Docker 部署
  output: 'standalone',
  
  // 圖片優化配置
  images: {
    domains: [],
    unoptimized: true, // 在容器環境中禁用圖片優化
  },
  
  // 環境變量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 重定向配置
  async redirects() {
    return [];
  },
  
  // 頭部配置
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
