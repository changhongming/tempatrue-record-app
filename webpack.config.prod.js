const webpackComCnf = require('./webpack.config.js');

module.exports = {
  ...webpackComCnf,
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.min.js'
    }
  },
  mode: 'production',
  devtool: 'none'
};
