import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import App from './layouts/app'
import Ingredients from './containers/Ingredients'
import Orders from './layouts/Orders'
import Dishes from './layouts/Dishes'
//import {Home, Ingredients, Dishes, Orders } from './components'
import configureStore from './store/configureStore'


// Wraps with middleware the createStore function
const store = configureStore()
const history = createHistory()

syncReduxAndRouter(history, store)

render(
  // Makes the Redux store available to the connect() calls in the component hierarchy below
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="ingredients" component={Ingredients}/>
        <Route path="dishes" component={Dishes}/>
        <Route path="orders" component={Orders}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
