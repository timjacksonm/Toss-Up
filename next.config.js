/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['pages', 'components', 'app', 'styles'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
