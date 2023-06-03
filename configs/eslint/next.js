module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['next', 'airbnb', 'airbnb-typescript', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    next: { rootDir: ['apps/*/', 'packages/*/'] },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/function-component-definition': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/no-unknown-property': ['off'],
    'react/require-default-props': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/extensions': ['off'],
    '@next/next/no-html-link-for-pages': ['off'],
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo',
  ],
};
