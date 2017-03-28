import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from 'modules/reducer'

const configureStore = (initialState) => {
  const middleware = applyMiddleware(
    routerMiddleware(browserHistory),
    thunk
  )
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(middleware)
  )

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('modules/reducer', () => {
      const nextReducer = require('modules/reducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore
