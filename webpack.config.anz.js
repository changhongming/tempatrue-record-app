const webpackComCnf = require('./webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackComCnf.plugins.push(new BundleAnalyzerPlugin());

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

