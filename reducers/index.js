import { combineReducers } from 'redux'
import ingredients from './ingredients'
import dishes from './dishes'
import orders from './orders'
import auth from './auth'
import notifications from './notifications'
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'redux-simple-router';

const rootReducer = combineReducers({
  ingredients,
  dishes,
  orders,
  notifications,
  auth,
  routing: routeReducer,
  form: formReducer
})

export default rootReducer
