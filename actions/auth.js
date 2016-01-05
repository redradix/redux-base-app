import fetch from 'isomorphic-fetch'
import webStorage from '../utils/WebStorage'
import { applyToken, applyHeaders } from './helpers';

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

const session = {
  username: 'Kanedaki',
  email: 'kanedaki@gmail.com',
  token: '1234'
}

function loadInitialData(store) {
  return (dispatch, getState) => {
    dispatch(fetchIngredients())
    dispatch(fetchDishes())
    dispatch(fetchOrders())
    dispatch(initNotifications())
    //store.dispatch(validateToken())
  }
}

export function requireAuth(callback) {
  return (dispatch, getState) => {
    if (getState().auth.logged) {
      callback()
    } else {
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
    const token = webStorage.load('token')
    if (token) {
      return fetch('http://dah.com/session', applyToken({}, token))
      .then( response => {
        dispatch(loadInitialData())
        dispatch(loginSuccess(response.data))  
      })
    }
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT
  }  
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(logoutSuccess())
    dispatch(pushPath("/login"))
  }
}

export function login({email, password}) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if (getState().auth.logged) {
        reject({error: 'Already logged in'})  
      } else {
        dispatch(logginAttempt({login, password}))  
        /*
        return fetch('http://dah.com/login' + createQueryString({ email, password }),
          applyHeaders({
            method: 'post',
          }, {})
        )
        .then( response => {
          if (response.status >= 200 && response.status < 300) {
            dispatch(loginSuccess(response.data))  
            resolve()
          } else {
            dispatch(loginFail(response))
            reject({error: response.statusText})
          } 
        })
        .catch(error => {console.log('request failed', error)})
        */
        dispatch(loadInitialData())
        dispatch(loginSuccess(session))
        dispatch(pushPath('/'))
        resolve()
      } 
    })
  }    
}

function registerAttempt(credentials) {
  return {
    type: REGISTER_ATTEMPT  
  }  
}

function registerFail(credentials) {
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
      //fetch
      dispatch(registerSuccess(session))
      dispatch(loadInitialData())
      dispatch(pushPath('/'))
      resolve()
    })  
  }  
}


