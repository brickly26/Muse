/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.pixabay.com',
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
