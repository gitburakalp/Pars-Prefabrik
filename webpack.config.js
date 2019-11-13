const PATH = require('path');
const HTML_WEBPACK_PLUGIN = require('html-webpack-plugin');
const MINI_CSS_EXTRACT_PLUGIN = require('mini-css-extract-plugin');
const IMAGEMIN_PLUGIN = require('imagemin-webpack-plugin')
  .default;
const COPY_WEBPACK_PLUGIN = require('copy-webpack-plugin');

const DIST_DIR = PATH.resolve(__dirname, './dist');
const SRC_DIR = PATH.resolve(__dirname, './src');

const CONFIG = {
  entry: SRC_DIR + '/js/app.js',
  output: {
    path: DIST_DIR,
    filename: 'js/main.js',
    publicPath: '',
    crossOriginLoading: 'use-credentials',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'imports-loader?define=>false',
      },
      {
        test: /\.(s?)css$/,
        use: [
          MINI_CSS_EXTRACT_PLUGIN.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'file-loader?prefix=font/&name=fonts/[name].[ext]',
        options: {
          publicPath: '../',
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader:
          'url-loader?prefix=font/&limit=5000&name=fonts/[name].[ext]',
        options: {
          publicPath: '../',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]',
        options: {
          publicPath: '../',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.jsx?$/,
        },
        use: [
          'babel-loader',
          '@svgr/webpack',
          'url-loader',
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?limit=10000&name=fonts/[name].[ext]',
        options: {
          publicPath: '../',
        },
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/png&name=images/[name].[ext]',
      },
      {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/gif&name=images/[name].[ext]',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    writeToDisk: true,
  },
  plugins: [
    new HTML_WEBPACK_PLUGIN({
      template: SRC_DIR + '/index.html',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new COPY_WEBPACK_PLUGIN([
      { from: SRC_DIR + '/images', to: 'images' },
    ]),
    new IMAGEMIN_PLUGIN({
      disable: process.env.NODE_ENV !== 'production',
      pngquant: {
        quantity: '95-100',
      },
    }),
    new MINI_CSS_EXTRACT_PLUGIN({
      filename: 'css/main.css',
    }),
  ],
  resolve: {
    alias: {
      jquery: PATH.resolve(
        'node_modules',
        'jquery/dist/jquery.min.js'
      ),
      'animation.gsap': PATH.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
      ),
      'debug.addIndicators': PATH.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
      ),
    },
  },
};

module.exports = CONFIG;
