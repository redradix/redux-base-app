import React from 'react'
import { Route } from 'react-router'

/* Route handlers/layouts */
import App from 'layouts/app'
import Landing from 'layouts/landing'
import Home from 'views/home'
import Login from 'connected/login'
import Register from 'connected/register'

import { checkLogged, getSession } from './modules/auth'

const configureRoutes = ({ dispatch, getState }) => {
  return (
    <Route>
      <Route component={Landing}>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Route>
      <Route component={App}>
        <Route  path='/' component={Home} />
      </Route>
    </Route>
  )
}

export default configureRoutes
