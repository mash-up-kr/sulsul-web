module.exports = {
  ...require('@sulsul/eslint/react.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
