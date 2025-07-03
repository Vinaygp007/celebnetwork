/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Remove deprecated options
  // experimental: {
  //   appDir: true, // This is now default
  // },
  // swcMinify: true, // This is now default
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig