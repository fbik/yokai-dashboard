/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем standalone для разработки
  // output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
