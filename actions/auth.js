import fetch from 'isomorphic-fetch'
import webStorage from '../utils/WebStorage'
import { pushPath } from 'redux-simple-router'

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

//validateToken()

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

function validateToken(token) {
  return fetch('http://dah.com/session', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': webStorage.load('token')
    },
  }) 
  .then( response => {
    dispatch(loginSuccess(response.data))  
  })
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

export function login(credentials) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if (getState().auth.logged) {
        reject({error: 'Already logged in'})  
      } else {
        dispatch(logginAttempt(credentials))  
        /*fetch('http://dah.com/login', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: {
            email: credentials.email,
            password: credentials.password
          }
        })
        .then( response => {
          if (response.status >= 200 && response.status < 300) {
            dispatch(loginSuccess(response.data))  
            resolve()
          } else {
            dispatch(loginFail(response)
            reject({error: response.statusText})
          } 
        })
        .catch(error => {console.log('request failed', error)})
        */
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
      dispatch(pushPath('/'))
      resolve()
    })  
  }  
}


