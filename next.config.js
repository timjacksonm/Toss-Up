/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    dirs: ['pages', 'components', 'app', 'styles', 'lib'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
