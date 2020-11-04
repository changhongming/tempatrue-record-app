// webpack.config.js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const HtmlWebpackTemplate = path.join(__dirname, 'frontend', 'index.html');

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  mode: 'development',
  entry: {
    'app': './frontend/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH
  },
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: false
            }
          }
        ]
      },
      {
        test: /\.json$/i,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin()
    new HtmlWebpackPlugin({
      favicon: 'frontend/img/icon.png',
      inject: true,
      hash: false,
      template: HtmlWebpackTemplate,
      appMountId: 'app',
      chunks: ['app', 'vendor'],
      filename: 'index.html',
      csrf: '<%= csrf %>',
    }),
    new WebpackPwaManifest({
      name: 'Cloud Temperature Record',
      short_name: 'temperature-record',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      theme_color: "#2196F3",
      start_url: ".",
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('frontend/img/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
          src: path.resolve('frontend/img/icon.png'),
          size: '1024x1024' // you can also use the specifications pattern
        },
        {
          src: path.resolve('frontend/img/icon.png'),
          size: '1024x1024',
          purpose: 'maskable'
        }
      ]
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './frontend/sw.js',
      swDest: 'service-worker.js',
      maximumFileSizeToCacheInBytes: 10485760 // 10MB single file limit
    })
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        // commons: {
        //   chunks: 'initial',
        //   name: 'commons',
        //   minChunks: 2,
        //   priority: 1,
        // },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          priority: 2,
          enforce: true
        }
      },
    }
  }
}
