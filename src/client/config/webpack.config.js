'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var appPaths = require('../../../config/paths');

function join(dest) {
  return path.resolve(appPaths.appDir, dest);
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

  entry: {
    app: [require.resolve('../../../config/polyfills'), client('index.js')],
  },

  output: {
    path: join('dist/public/js'),
    filename: '[name]_bundle.js',
    publicPath: '/js',
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
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [],
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
      filename: '../css/[name].css',
    }),
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
});

// if (process.env.NODE_ENV === 'development') {
//   config.plugins.push(new webpack.HotModuleReplacementPlugin());
// }
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
