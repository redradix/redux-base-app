import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

// Wraps with middleware the createStore function
const store = configureStore()

render(
  // Makes the Redux store available to the connect() calls in the component hierarchy below
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
