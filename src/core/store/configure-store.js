import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer, {initializers} from 'modules/reducer'
// eslint-disable-next-line no-shadow
function initModules(initializers) {
  Object.keys(initializers).forEach(key => initializers[key](key))
}

export default function configureStore(initialState) {
  let middleware = applyMiddleware(routerMiddleware(browserHistory), thunk)

  // Dev tools and MHR configuration
  if (process.env.NODE_ENV === 'development') {
    if (window.devToolsExtension) {
      middleware = compose(middleware, window.devToolsExtension())
    }
  }
  // In order to decouple state structure from modules we assign the annidation of each module from here
  initModules(initializers)
  const store = createStore(
    reducer,
    initialState,
    middleware
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('modules/reducer', () => {
        const nextReducer = require('modules/reducer')
        store.replaceReducer(nextReducer)
      })
    }
  }

  return store
}
