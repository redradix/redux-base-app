var path = require('path');

module.exports = {
  name: 'redux-base-app',
  output: {
    path: path.join(__dirname, '../public/js'),
    filename: 'bundle.[hash:6].js',
    publicPath: '/js/',
    hash: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      },
			{
				test: /\.css$/, // Only .css files
				loader: 'style!css' // Run both loaders
			}
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },
  watchOptions: {
    aggregateTimeout: 100
  }
};
