const withTwin = require('./withTwin.js');

/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  reactStrictMode: false,
  output: 'standalone',
  webpack: (config, options) => {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        // Load polyfills only in the client.
        if (!options.isServer && !entries['main.js'].includes('./src/polyfills.ts')) {
          entries['main.js'].unshift('./src/polyfills.ts');
        }
      }

      return entries;
    };

    config.module.rules.push(
      ...[
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
          use: ['@svgr/webpack'],
        },
      ],
    );

    return config;
  },
});

module.exports = nextConfig;
