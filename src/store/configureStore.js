if (__DEV__) {
  module.exports = require('./configureStore.dev')
} else {
  module.exports = require('./configureStore.prod')
}
