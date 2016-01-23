//TODO: Cambiar validate token por session (get) y llamarlo desde el login
import fetch from 'isomorphic-fetch'
import { applyToken, applyHeaders } from './helpers';
import config from "../config" 
import { CALL_API } from '../middleware/api'

/* Actions */
import { fetchIngredients } from './ingredients'
import { fetchDishes } from './dishes'
import { fetchOrders } from './orders'
import { initNotifications } from './notifications'
import { pushPath, replacePath } from 'redux-simple-router'

export const VALIDATE_TOKEN_FAIL = "AUTH:VALIDATE_TOKEN_FAIL"
export const VALIDATE_TOKEN = "AUTH:VALIDATE_TOKEN"
export const VALIDATE_TOKEN_ATTEMPT = "AUTH:VALIDATE_TOKEN_ATTEMPT"

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

export function checkLogged(callback) {
  return (dispatch, getState) => {
    if (getState().auth.logged) {
      dispatch(replacePath('/'))   
    } else {
      callback()  
    }
  }
}

export function validateToken() {
  return (dispatch, getState) => {
    debugger
    if (!getState().auth.logged) {
      return dispatch({
        [CALL_API]: {
          endpoint: 'session',
          authenticated: true,
          types: [VALIDATE_TOKEN_ATTEMPT, VALIDATE_TOKEN, VALIDATE_TOKEN_FAIL],
        }  
      }).then(({ payload }) =>  {
        dispatch(loadInitialData())
      }).catch((e) => {
        localStorage.removeItem('token')
      })
    }
  }
}

export function logout() {
  return (dispatch, getState) => {
    localStorage.removeItem('token')
    dispatch(LOGOUT)
    dispatch(pushPath("/login"))
  }
}

export function login({username, password}) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: 'session',
        config: {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password
          })
        },
        types: [LOGIN_ATTEMPT, LOGIN, LOGIN_FAIL],
        //parseResponse:
      }  
    }).then(({ payload }) =>  {
      localStorage.setItem('token', payload.token)
      dispatch(loadInitialData())
      dispatch(pushPath('/'))
    }).catch((e) => {
      return Promise.reject({ _error: e._error})
    })
  }    
}

export function register(credentials) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: 'register',
        config: {
          method: 'POST',
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
          })
        },
        types: [REGISTER_ATTEMPT, REGISTER, REGISTER_FAIL],
        //parseResponse:
      }  
    }).then(({ payload, error}) =>  {
      webStorage.save('token', json.data.token)
      dispatch(loadInitialData())
      dispatch(pushPath('/'))
    }).catch((e) => {
      return Promise.reject({_error: e._error })
    })
  }  
}
