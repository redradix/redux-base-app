var serverHost = 'dev.redux.calendar';
var serverPort = 8001;
var clientHost = 'dev.redux.calendar';
var clientPort = 3000;

module.exports = {
  serverHost,
  serverPort,
  clientHost,
  clientPort,
  api: `http://${serverHost}:${serverPort}/api/`
}
