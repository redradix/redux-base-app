import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import WebStorage from './utils/WebStorage'
import configureStore from './store/configureStore'
import { replacePath } from 'redux-simple-router'

import App from './containers/app'
import Home from './layouts/home'
import Ingredients from './layouts/ingredients'
import ListIngredients from './layouts/list-ingredients'
import CreateIngredient from './layouts/create-ingredient'
import ShowIngredient from './layouts/show-ingredient'
import Orders from './layouts/orders'
import CreateOrder from './layouts/create-order'
import Dishes from './layouts/dishes'
import CreateDish from './layouts/create-dish'
import ListDishes from './layouts/list-dishes'
import ShowDish from './layouts/show-dish'
import Login from './layouts/login'
import Register from './layouts/register'


// Wraps with middleware the createStore function
const store = configureStore()
const history = createHistory()

syncReduxAndRouter(history, store)

function requireAuth(nextState, transition, callback) {
  if (store.getState().auth.logged) {
    callback()
  } else {
    store.dispatch(replacePath('/login'));
  }
}

function checkLogged(nextState, transition, callback) {
  if (store.getState().auth.logged) {
    store.dispatch(replacePath('/'))   
  } else {
    callback()  
  }
}

render(
  // Makes the Redux store available to the connect() calls in the component hierarchy below
  <Provider store={store}>
    <Router history={history}>
      <Route path="/login" component={Login} onEnter={checkLogged}/>
      <Route path="/register" component={Register} onEnter={checkLogged}/>
      <Route path= "/" component={App}>
        <IndexRoute component={Home} onEnter={requireAuth} />
        <Route path="ingredients" component={Ingredients} onEnter={requireAuth}>
          <IndexRoute component={ListIngredients}/>
          <Route path="create" component={CreateIngredient}/>
          <Route path=":id/show" component={ShowIngredient}/>
          <Route path=":id/edit" component={CreateIngredient}/>
        </Route>  
        <Route path="dishes" component={Dishes} onEnter={requireAuth}>
          <IndexRoute component={ListDishes}/>
          <Route path="create" component={CreateDish}/>
          <Route path=":id/edit" component={CreateDish}/>
          <Route path=":id/show" component={ShowDish}/>
        </Route>  
        <Route path="orders" component={Orders} onEnter={requireAuth}>
          <Route path="create"/>
        </Route>  
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
