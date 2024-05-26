/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [
      {
        hostname: 'platform-lookaside.fbsbx.com',
      },
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
}

export default nextConfig
