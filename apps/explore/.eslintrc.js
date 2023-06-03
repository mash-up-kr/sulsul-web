module.exports = {
  root: true,
  extends: ['@sulsul/eslint-config/next'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
