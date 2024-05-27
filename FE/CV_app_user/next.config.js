module.exports = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/upload/:path*',
          destination: 'https://legacy.youth.com.vn/upload/:path*',
        },
        {
          source: '/post/:path*',
          destination: '/posts/:path*',
        },
      ],
    };
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  poweredByHeader: false,
  distDir: 'dist',
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'storage.googleapis.com',
      '103.3.62.244',
      'upload.wikimedia.org',
      'course.youth.com.vn',
      'adbox-staging.s3.ap-northeast-1.amazonaws.com',
    ],
    formats: ['image/avif', 'image/webp'],
    disableStaticImages: true,
  },
  experimental: { images: { layoutRaw: true } },
  async redirects() {
    return [
      {
        source: '/topic/viec-lam',
        destination: process.env.NEXT_PUBLIC_JOB_URL,
        permanent: false,
        basePath: false,
      },
    ];
  },
};
