const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = Object.assign({
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': { NODE_ENV: '"development"' }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      filename: 'index.html'
    })
  ]
}, baseConfig)
