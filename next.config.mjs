/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
    ],
    deviceSizes: [640, 828],
    imageSizes: [16, 48],
  },
}

export default nextConfig
