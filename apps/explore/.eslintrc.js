module.exports = {
  ...require('@sulsul/eslint/next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
