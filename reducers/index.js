import { combineReducers } from 'redux'
import ingredients from './ingredients'
import { routeReducer } from 'redux-simple-router';

const rootReducer = combineReducers({
  // Here add your reducers
  ingredients,
  routing: routeReducer
})

export default rootReducer
