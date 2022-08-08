/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.pixabay.com',
      'i.scdn.co'
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
