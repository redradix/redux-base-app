import { LOCALSTORAGE_TOKEN_KEY } from '../../config'
import AuthAPI from './api'
import { push, replace } from 'react-router-redux'
export * from './action_types'
// TODO
// Transform server API errors into valid redux-form errors

//UTILS
function clearToken(){
  localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
}

function getToken(){
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

function saveToken(token){
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token)
}

function goToLogin(){
  return push('/login');
}

/** Auth module Action Creators */

/**
 * Async action creator that performs login
 * @param  {String} options.username Username
 * @param  {String} options.password Password
 * @return {Function}                Thunk
 */
export function login({username, password}) {
  return (dispatch, getState) => {
    return dispatch(AuthAPI.login(username, password))
    .then(response =>  {
      saveToken(response.token)
      dispatch(push('/'))
    })
    .catch((e) => {
      let error = e.errors[0];
      if(error.message.match(/not found/))
        return Promise.reject({ _error: 'Login failed', username: 'Invalid username' })
      else
        return Promise.reject({ _error: 'Login failed', password: 'Invalid password' })
    })
  }
}

/**
 * Async action that fetches the current user session
 * if a JSON Web Token is present
 * @return {Function} Async action (thunk)
 */
export function getSession() {
  return (dispatch, getState) => {
    //bail out early, if no token avoid calling the API
    if(!getToken()){
      return dispatch(goToLogin())
    }
    if (!getState().session) {
      return dispatch(AuthAPI.getSession())
      .catch((e) => {
        //throw e;
        console.log('getSession failed', e)
        clearToken();
        dispatch(goToLogin());
      })
    }
  }
}

/**
 * Async action that performs logout
 * @return {Function} Thunk
 */
export function logout() {
  return (dispatch, getState) => {
    dispatch(AuthAPI.logout())
      .then(() => {
        clearToken();
        dispatch(goToLogin())
      })
      .catch(errors => {
        console.log('Logout failed!', errors)
      })
  }
}

/**
 * Async action creator that register a user against the API
 * @param  {Object} credentials Object with username, password fields
 * @return {Function}           Thunk
 */
export function register(credentials) {
  return (dispatch, getState) => {
    return dispatch(AuthAPI.register(credentials))
    .then((payload) =>  {
      saveToken(payload.token)
      dispatch(push('/'))
    })
    .catch((e) => {
      console.log('Register failed', e);
      return Promise.reject({_error: 'Register failed', username: 'Username already in use' })
    })
  }
}