var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

module.exports = Object.assign({
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, baseConfig);
