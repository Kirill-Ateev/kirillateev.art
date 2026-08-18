/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';

    const securityHeaders = [
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "object-src 'none'",
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com" +
            (isDev ? " 'unsafe-eval'" : ''),
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://og.rarible.com https://ipfs.io",
          "font-src 'self' data:",
          "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://vercel-rpc-view.vercel.app https://eth.llamarpc.com https://eth-mainnet.public.blastapi.io https://rpc.ankr.com/eth https://rpc.flashbots.net/ https://cloudflare-eth.com/ https://eth-mainnet.gateway.pokt.network https://ethereum.publicnode.com https://nodes.mewapi.io https://eth-mainnet.nodereal.io https://ipfs.io https://og.rarible.com" +
            (isDev ? ' ws: http:' : ''),
          "media-src 'self'",
          "manifest-src 'self'",
        ].join('; '),
      },
    ];

    const cacheHeaders = isDev
      ? []
      : [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        ];

    return [
      {
        source: '/(.*)',
        headers: [...securityHeaders, ...cacheHeaders],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/og/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/en',
  //       basePath: false,
  //       permanent: false,
  //     },
  //   ];
  // },
  // basePath: '/personal-landing',
  // assetPrefix: '/personal-landing/',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader',
      },
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
};

export default nextConfig;
