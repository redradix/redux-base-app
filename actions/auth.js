//TODO: Introducir los metodos de middleware api
//TODO: Cambiar validate token por session (get) y llamarlo desde el login
import fetch from 'isomorphic-fetch'
import { applyToken, applyHeaders } from './helpers';
import config from "../config" 

/* Actions */
import { fetchIngredients } from './ingredients'
import { fetchDishes } from './dishes'
import { fetchOrders } from './orders'
import { initNotifications } from './notifications'
import { pushPath, replacePath } from 'redux-simple-router'

export const LOGIN_ATTEMPT = "AUTH:LOGIN_ATTEMPT"
export const LOGIN_FAIL = "AUTH:LOGIN_FAIL"
export const LOGIN = "AUTH:LOGIN"
export const LOGOUT = "AUTH:LOGOUT"

export const REGISTER = "AUTH:REGISTER"
export const REGISTER_ATTEMPT = "AUTH:REGISTER_ATTEMPT"
export const REGISTER_FAIL = "AUTH:REGISTER_FAIL"

function loadInitialData(store) {
  return (dispatch, getState) => {
    dispatch(fetchIngredients())
    dispatch(fetchDishes())
    dispatch(fetchOrders())
    //dispatch(initNotifications())
  }
}

export function requireAuth() {
  return (dispatch, getState) => {
    if (!getState().auth.logged) {
      // DOC: An action creator that you can use to replace the current URL without updating the browser history.
      dispatch(replacePath('/login'));
    }
  }
}

export function checkLogged(callback) {
  return (dispatch, getState) => {
    if (getState().auth.logged) {
      dispatch(replacePath('/'))   
    } else {
      callback()  
    }
  }
}

function logginAttempt(credentials) {
  return {
    type: LOGIN_ATTEMPT,
    payload: credentials
  }  
}

function loginSuccess(session) {
  return {
    type: LOGIN,
    payload: session
  }  
}

function loginFail(error) {
  return {
    type: LOGIN_FAIL,
    payload: error 
  }  
}

export function validateToken() {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token')
    return fetch([config.api, "session"].join(""), applyHeaders({}, token))
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) =>  {
      if (response.ok) {
        json.data.token = localStorage.getItem('token')
        delete json.data.id
        dispatch(loginSuccess(json.data))  
        dispatch(loadInitialData())
      } else {
        dispatch(logout())  
        localStorage.removeItem('token')
      } 
    })
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT
  }  
}

export function logout() {
  return (dispatch, getState) => {
    localStorage.removeItem('token')
    dispatch(logoutSuccess())
    dispatch(pushPath("/login"))
  }
}

export function login({username, password}) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(logginAttempt({login, password}))  
      return fetch([config.api, 'session'].join(''),
        applyHeaders({
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password
          })
        }, {})
      ).then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) =>  {
        if (response.ok) {
          localStorage.setItem('token', json.data.token)
          dispatch(loginSuccess(json.data))  
          dispatch(loadInitialData())
          dispatch(pushPath('/'))
          resolve()
        } else {
          dispatch(loginFail(json.errors[0].message))
          reject({password: json.errors[0].message, _error: 'There was an error during login'})
        } 
      })
      .catch(error => {console.log('request failed', error)})
    })
  }    
}

function registerAttempt(credentials) {
  return {
    type: REGISTER_ATTEMPT  
  }  
}

function registerFail(response) {
  console.log(response)
  return {
    type: REGISTER_FAIL
  }  
}

function registerSuccess(credentials) {
  return {
    type: REGISTER,
    payload: credentials
  }  
}

export function register(credentials) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(registerAttempt(credentials))  
      return fetch([config.api, 'register'].join(""), applyHeaders({
        method: 'POST',
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      }))
      .then(response =>
        response.json().then(json => ({ json, response }))
      ).then(({ json, response }) =>  {
        if (response.ok) {
          webStorage.save('token', json.data.token)
          dispatch(registerSuccess(json.data))
          dispatch(loadInitialData())
          dispatch(pushPath('/'))
          resolve()
        } else {
          dispatch(registerFail(json.errors[0].message))
          reject({username: json.errors[0].message, _error: 'There was an error during register'})
        }
      })
    })  
  }  
}
