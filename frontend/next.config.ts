/** @type {import('next').NextConfig} */
const remoteApi =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_INTERNAL_API_BASE_URL ||
    "https://muesum-a252b23f7b32.herokuapp.com";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${remoteApi.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'tse2.mm.bing.net' },
      { protocol: 'https', hostname: 'tse1.mm.bing.net' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'preview.redd.it' },
      { protocol: 'https', hostname: 'w7.pngwing.com' },
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'dynamic-media-cdn.tripadvisor.com' },     
      { protocol: 'https', hostname: 'deltalighting.me' },
      { protocol: 'https', hostname: 'art50.net' },
      { protocol: 'https', hostname: 'www.cairo24.com' },
      { protocol: 'https', hostname: 'newsroom.info' },
      { protocol: 'https', hostname: 'artdogistanbul.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'googleusercontent.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons', 'recharts', 'swiper'],
  },
};

export default nextConfig;
