/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      //->> for develop
      "i.picsum.photos",
      "mestergraph.com",
      "images.kojaro.com",
      "placeimg.com",
      //->> main host domains
      "valavid.nwhco.ir",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
module.exports = nextConfig;
