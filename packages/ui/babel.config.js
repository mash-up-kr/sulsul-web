module.exports = {
  extends: '@sulsul/babel',
  presets: [
    ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }],
  ],
};
