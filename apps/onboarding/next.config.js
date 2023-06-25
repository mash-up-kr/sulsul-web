/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@sulsul/ui',
    '@sulsul/token',
    'react-hook-step',
    '@suspensive/react',
    '@suspensive/react-query',
  ],
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
