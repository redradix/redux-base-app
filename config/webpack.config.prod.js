var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseConfig = require('./webpack.config.base');

var __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = Object.assign({
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: __DEV__,
      'process.env': { 'NODE_ENV': __DEV__ ? '"delevopment"' : '"production"' }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      acorn: true
    }),
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      filename: '../main.html'
    })
  ]
}, baseConfig);
