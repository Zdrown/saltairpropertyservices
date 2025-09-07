/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable hot reload and fast refresh
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization settings
  images: {
    unoptimized: false,
    domains: [],
  },
  
  // Webpack configuration for better hot reload
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
};

export default nextConfig;
