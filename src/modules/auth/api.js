import {
  LOGIN_ATTEMPTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  GET_SESSION_ATTEMPTED,
  GET_SESSION_SUCCEEDED,
  GET_SESSION_FAILED,
  LOGOUT_ATTEMPTED,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILED,
  REGISTER_ATTEMPTED,
  REGISTER_SUCCEEDED,
  REGISTER_FAILED
} from './action_types';

import { fetch, create, update, del } from '../../utils/rest_api';


/*
 Common "parse" function. In this case, the example Auth API
 returns data as { type: 'resource', data: {xxx}|[xxx]}
 */
function parse(json){
  return json.data;
}


//The following API methods return actions to be dispatched in your
//async action creators

/**
 * Performs a user login by creating a `session` resource
 * @param  {String} username
 * @param  {String} password
 * @return {Object}          Action to dispatch
 */
function login(username, password){
  return create(
    'session',
    { username, password },
    [LOGIN_ATTEMPTED, LOGIN_SUCCEEDED, LOGIN_FAILED],
    {
      secure: false,
      parse
    }
  );
}

/**
 * Performs logout by DELETING the `session` resource
 * @return {Object} Action
 */
function logout(){
  return del('session', [LOGOUT_ATTEMPTED, LOGOUT_SUCCEEDED, LOGOUT_FAILED]);
}

/**
 * Register a user
 * @param  {String} options.username
 * @param  {String} options.password
 * @return {Object}                  Action
 */
function register({ username, password }){
  return create(
    'register',
    { username, password },
    [REGISTER_ATTEMPTED, REGISTER_SUCCEEDED, REGISTER_FAILED],
    {
      secure: false,
      parse
    }
  );
}

/**
 * Gets the current user session data
 * @return {Object} Action
 */
function getSession(){
  return fetch(
    'session',
    [GET_SESSION_ATTEMPTED, GET_SESSION_SUCCEEDED, GET_SESSION_FAILED],
    {
      parse
    }
  );

}

const AuthAPI = {
  login,
  logout,
  register,
  getSession
};

export default AuthAPI;