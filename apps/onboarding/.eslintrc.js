module.exports = {
  root: true,
  extends: ['@sulsul/eslint-config/react-ts-noimport', 'plugin:@next/next/recommended'],
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
  },
};
