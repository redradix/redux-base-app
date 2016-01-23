var path = require('path');
var request = require('superagent');

var __DEV__ = process.env.NODE_ENV !== 'production';

var app = new (require('express'))()
var port = 3000

if (__DEV__) {
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var config = require('./webpack.config')

  var compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

//keep this handler on the last position of the stack, it serves the index.html if reloading from any url.
if (__DEV__) {
  app.get('*', function (req, res){
    request.get('http://localhost:' + port + '/static/index.html')
      .end(function(err, response) {
        return err ? res.send(err) : res.send(response.text);
      });
  });
} else {
  app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
  });
}

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
