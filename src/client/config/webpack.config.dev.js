'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var appConfig = require('../../../config');

function join(dest) {
  return path.resolve(appConfig.paths.appDir, dest);
}
function app(dest) {
  return join('src/' + dest);
}
function client(dest) {
  return join('src/client/' + dest);
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = (module.exports = {
  devtool: 'cheap-module-source-map',
  devServer: {
    compress: true,
    hot: true,
    historyApiFallback: {
      index: 'index.html',
    },
    port: 3000,
    proxy: {
      '*': 'http://localhost:3030',
    },
  },

  entry: {
    app: [require.resolve('../../../config/polyfills'), client('index.js')],
  },

  output: {
    path: join('dist/public/assets'),
    filename: 'js/[name]_bundle.js',
    publicPath: '/assets',
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules'],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [],
          presets: [
            [
              'env',
              {
                targets: {
                  uglify: true,
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true },
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [],
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: loader => [autoprefixer],
                },
              },
            ],
            fallback: 'style-loader',
          }),
        ),
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin(
      [
        { from: join('node_modules/font-awesome/fonts'), to: join('dist/public/fonts') },
        { from: join('node_modules/font-awesome/css'), to: join('dist/public/css') },
        { from: app('assets/images'), to: join('dist/public/images') },
        // { from: app('assets/fonts'), to: join('dist/public/fonts/fonts') },
        // { from: app('vendor/js'), to: join('dist/public/js') },
      ],
      {
        copyUnmodified: true,
      },
    ),
    new ExtractTextPlugin({
      allChunks: true,
      disable: false,
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
});
