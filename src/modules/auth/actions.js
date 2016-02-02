//TODO: Cambiar validate token por session (get) y llamarlo desde el login
import fetch from 'isomorphic-fetch'
import { applyToken, applyHeaders } from '../helpers';
import config from "../../config"
import { CALL_API } from '../../middleware/api'

/* Actions */
import { fetchIngredients } from '../ingredients'
import { fetchDishes } from '../dishes'
import { fetchOrders } from '../orders'
import { initNotifications } from '../notifications'
import { routeActions } from 'react-router-redux'

const MODULE_NAME = "base-app/auth/"

export const VALIDATE_TOKEN_FAIL = MODULE_NAME.concat("VALIDATE_TOKEN_FAIL")
export const VALIDATE_TOKEN = MODULE_NAME.concat("VALIDATE_TOKEN")
export const VALIDATE_TOKEN_ATTEMPT = MODULE_NAME.concat("VALIDATE_TOKEN_ATTEMPT")

export const LOGIN_ATTEMPT = MODULE_NAME.concat("LOGIN_ATTEMPT")
export const LOGIN_FAIL = MODULE_NAME.concat("LOGIN_FAIL")
export const LOGIN = MODULE_NAME.concat("LOGIN")
export const LOGOUT = MODULE_NAME.concat("LOGOUT")

export const REGISTER = MODULE_NAME.concat("REGISTER")
export const REGISTER_ATTEMPT = MODULE_NAME.concat("REGISTER_ATTEMPT")
export const REGISTER_FAIL = MODULE_NAME.concat("REGISTER_FAIL")

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
      dispatch(routeActions.replace('/'))
    } else {
      callback()
    }
  }
}

export function validateToken() {
  return (dispatch, getState) => {
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
        dispatch(logout())
      })
    }
  }
}

export function logout() {
  return (dispatch, getState) => {
    localStorage.removeItem('token')
    dispatch({type: LOGOUT})
    dispatch(routeActions.replace("/login"))
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
      dispatch(routeActions.push('/'))
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
      dispatch(routeActions.push('/'))
    }).catch((e) => {
      return Promise.reject({_error: e._error })
    })
  }
}
