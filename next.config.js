/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.pixabay.com',
      'i.scdn.co',
      'lh3.googleusercontent.com'
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
