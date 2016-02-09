var path = require('path');
var express = require('express')
var app = new (express)()
var port = 3000

var __DEV__ = process.env.NODE_ENV !== 'production';

if (__DEV__) {
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var config = require('../config/webpack.config.dev')

  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  app.use(webpackHotMiddleware(compiler))
}


app.use(express.static('public'));

//keep this handler on the last position of the stack, it serves the index.html if reloading from any url.
if (__DEV__) {
  require('isomorphic-fetch');
  app.get('*', function(req, res) {
    fetch('http://localhost:' + port + '/js/index.html')
      .then(function(r) {
        return r.text();
      })
      .then(function(html) {
        res.send(html);
      })
      .catch(function(err) {
        console.error(err);
      });
  });
} else {
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/main.html'))
  });
}


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
