import { combineReducers } from 'redux'
import ingredients from './ingredients'
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'redux-simple-router';

const rootReducer = combineReducers({
  ingredients,
  routing: routeReducer,
  form: formReducer
})

export default rootReducer
