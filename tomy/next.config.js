/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ['s3-alpha-sig.figma.com'], // Ajoutez le domaine de votre image
      domains: ['drive.google.com'], // Ajoutez le domaine de votre image
    },
  }

// next.config.js
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
    };
    return config;
  },
};

