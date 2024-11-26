/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['argobot-bucket.s3-website.us-east-2.amazonaws.com', 'argobot-bucket.s3.us-east-2.amazonaws.com']
  },
  reactStrictMode: false, //fix react strict mode -abrar
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true, }
}

export default nextConfig
