/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ['s3-alpha-sig.figma.com'], // Ajoutez le domaine de votre image
      domains: ['drive.google.com'], // Ajoutez le domaine de votre image
    },
  }

  const path = require("path");

// next.config.js
module.exports = {
  reactStrictMode: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modifie la config Webpack ici si nécessaire
    config.resolve.alias["vanta"] = path.resolve(__dirname, "node_modules/vanta");
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};


