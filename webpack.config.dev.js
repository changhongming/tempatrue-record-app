const path = require('path');
const webpackComCnf = require('./webpack.config.js');

module.exports = {
  ...webpackComCnf,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // publicPath: '/assets/',
    // contentBasePublicPath: '/assets/',
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: {
      index: '/index.html'
    },
    open: true,
    clientLogLevel: 'error'
  }
};
