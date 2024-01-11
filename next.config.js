const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withTwin = require('./withTwin.js');

/** @type {import('next').NextConfig} */
const nextConfig = withTwin(
  withBundleAnalyzer({
    // swcMinify: true,
    reactStrictMode: false,
    output: 'standalone',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'agent-test.negocio.kr',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'agent-test2.negocio.kr',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'agent.negocio.co.kr',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'negocio-common.s3.ap-northeast-2.amazonaws.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'negocio-agent-photos.s3.ap-northeast-2.amazonaws.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'negocio-common.s3.ap-northeast-2.amazonaws.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'negocio-listing-photos.s3.ap-northeast-2.amazonaws.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'negocio-user-photos.s3.ap-northeast-2.amazonaws.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'negocio-user-photos.s3.ap-northeast-2.amazonaws.com',
          port: '',
        },
      ],
    },
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
            use: {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              },
            },
          },
        ],
      );

      return config;
    },
  }),
);

module.exports = nextConfig;
