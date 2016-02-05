import { combineReducers } from 'redux';
import auth from './auth/';
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  auth,
  // A reducer function that keeps track of the router state. You must to add this reducer to your app reducers when creating the store. If you do not provide a custom selectRouterState function, the piece of state must be named routing.
  routing: routeReducer,
  form: formReducer
});

export default rootReducer;
// A reducer function that keeps track of the router state. You must to add this reducer to your app reducers when creating the store. If you do not provide a custom selectRouterState function, the piece of state must be named routing.
