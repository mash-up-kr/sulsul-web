module.exports = {
  extends: ['@sulsul/eslint-config/common'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
