import React from 'react'
import { Route } from 'react-router'

/* Route handlers/layouts */
import App from './components/layouts/app'
import Landing from './components/layouts/landing'
import Home from './components/common/home'
import Login from './containers/login'
import Register from './containers/register'

import { checkLogged, validateToken } from './modules/auth'

export default (
  <Route>
    <Route component={Landing} onEnter={(dispatch, cb) => dispatch(checkLogged(cb))}>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Route>
    <Route component={App} onEnter={(dispatch, cb) => dispatch(validateToken(cb))}>
      <Route  path='/' component={Home} />
    </Route>
  </Route>
)
