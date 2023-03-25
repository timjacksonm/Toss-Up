/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: true,
  },
  eslint: {
    dirs: ['pages', 'components', 'app', 'styles', 'lib'],
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
