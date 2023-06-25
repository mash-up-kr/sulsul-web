/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@sulsul/ui', '@sulsul/token'],
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
