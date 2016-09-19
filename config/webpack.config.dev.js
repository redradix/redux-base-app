'use strict'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base')

// Load environment variables to pass them to webpack's define plugin
let env = require('dotenv').load('../.env')
Object.keys(env).forEach(k => env[k] = JSON.stringify(env[k]))

module.exports = Object.assign({

  /* source-map type */
  devtool: 'source-map',

  /* entry module config */
  entry: [
    'webpack-hot-middleware/client', // hot reaload path
    './src/index' // entry module path
  ],

  /* plugins config */
  plugins: [

    /* define global variables which will be replaced by its values at build time */
    new webpack.DefinePlugin({
      process: { env: Object.assign({ NODE_ENV: JSON.stringify('development') }, env) }
    }),

    /* smart code reloading */
    new webpack.HotModuleReplacementPlugin(),

    /* do not re-build when there's an error in the code */
    new webpack.NoErrorsPlugin(),

    /* automate HTML file creation when using hashes in file names or any other dynamic output */
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      filename: 'index.html'
    })
  ]
}, baseConfig)
