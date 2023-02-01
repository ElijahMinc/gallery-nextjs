/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.unsplash.com',
        pathname: '/photos',
      },
    ],
  },
};

module.exports = nextConfig;
