import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 开启独立打包模式，这是 Docker 部署必须的
  output: 'standalone', 
  
  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
