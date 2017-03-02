import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from 'modules/reducer'

export default function configureStore(initialState) {
  let middleware = applyMiddleware(routerMiddleware(browserHistory), thunk)

  // Dev tools and MHR configuration
  if (process.env.NODE_ENV === 'development') {
    if (window.devToolsExtension) {
      middleware = compose(middleware, window.devToolsExtension())
    }
  }

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
