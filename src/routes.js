import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* Route handlers/smart */
import App from './containers/app'
import Home from './components/home'
import Ingredients from './components/ingredients'
import ListIngredients from './smart/list-ingredients'
import CreateIngredient from './smart/create-ingredient'
import ShowIngredient from './smart/show-ingredient'
import Orders from './components/orders'
import CreateOrder from './smart/create-order'
import ListOrders from './smart/list-orders'
import ShowOrder from './smart/show-order'
import Dishes from './components/dishes'
import CreateDish from './smart/create-dish'
import ListDishes from './smart/list-dishes'
import ShowDish from './smart/show-dish'
import Login from './smart/login'
import Register from './smart/register'

import { checkLogged, validateToken } from './modules/auth'
import { fetchDish } from './modules/dishes'
import { fetchOrder} from './modules/orders'

export default (
  <Route>
    <Route onEnter={(dispatch, cb) => dispatch(checkLogged(cb))}>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
    <Route component={App} onEnter={(dispatch, cb) => dispatch(validateToken(cb))}>
      <Route  path= "/" component={Home} />
      <Route path="ingredients" component={Ingredients}>
        <IndexRoute component={ListIngredients}/>
        <Route path="create" component={CreateIngredient}/>
        <Route path=":id/show" component={ShowIngredient}/>
        <Route path=":id/edit" component={CreateIngredient}/>
      </Route>
      <Route path="dishes" component={Dishes}>
        <IndexRoute component={ListDishes}/>
        <Route path="create" component={CreateDish}/>
        <Route path=":id/edit" component={CreateDish} onEnter={(dispatch, cb, props) => dispatch(fetchDish(props.params.id))}/>
        <Route path=":id/show" component={ShowDish} onEnter={(dispatch, cb, props) => dispatch(fetchDish(props.params.id))}/>
      </Route>
      <Route path="orders" component={Orders}>
        <IndexRoute component={ListOrders}/>
        <Route path="create" component={CreateOrder}/>
        <Route path=":id/edit" component={CreateOrder} onEnter={(dispatch, cb, props) => dispatch(fetchOrder(props.params.id))}/>
        <Route path=":id/show" component={ShowOrder} onEnter={(dispatch, cb, props) => dispatch(fetchOrder(props.params.id))}/>
      </Route>
    </Route>
  </Route>
)
