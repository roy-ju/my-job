const withTwin = require('./withTwin.js');

/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  reactStrictMode: false,
  output: 'standalone',
});

module.exports = nextConfig;
