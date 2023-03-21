module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['@typescript-eslint', 'jsx-a11y', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/restrict-template-expressions': 'warn',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
