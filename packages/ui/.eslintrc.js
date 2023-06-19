/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@sulsul/eslint-config/react-ts'],
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};
