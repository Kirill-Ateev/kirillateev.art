/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
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
