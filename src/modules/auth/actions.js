import { CALL_API } from '../../middleware/api'
import { pushPath, replacePath } from 'react-router-redux';

const APP_NAME = "base-app/"

// Paste tense for actions
export const TOKEN_VALIDATION_FAILED = APP_NAME.concat("AUTH:VALIDATE_TOKEN_FAIL")
export const TOKEN_VALIDATION_SUCCESS = APP_NAME.concat("AUTH:VALIDATE_TOKEN")
export const TOKEN_VALIDATION_ATTEMPTED = APP_NAME.concat("AUTH:VALIDATE_TOKEN_ATTEMPT")

export const LOGIN_ATTEMPTED = APP_NAME.concat("AUTH:LOGIN_ATTEMPT")
export const LOGIN_FAILED = APP_NAME.concat("AUTH:LOGIN_FAIL")
export const LOGIN_SUCCESS = APP_NAME.concat("AUTH:LOGIN")
export const LOGOUT_SUCCESS = APP_NAME.concat("AUTH:LOGOUT")

export const REGISTER_SUCCESS = APP_NAME.concat("AUTH:REGISTER")
export const REGISTER_ATTEMPTED = APP_NAME.concat("AUTH:REGISTER_ATTEMPT")
export const REGISTER_FAILED = APP_NAME.concat("AUTH:REGISTER_FAIL")

function loadInitialData(store) {
  return (dispatch, getState) => {
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
    if (!getState().auth.logged) {
      return dispatch({
        [CALL_API]: {
          endpoint: 'session',
          authenticated: true,
          types: [TOKEN_VALIDATION_ATTEMPTED, TOKEN_VALIDATION_SUCCESS, TOKEN_VALIDATION_FAILED],
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
    dispatch(LOGOUT_SUCCESS)
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
        types: [LOGIN_ATTEMPTED, LOGIN_SUCCESS, LOGIN_FAILED],
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
        types: [REGISTER_ATTEMPTED, REGISTER_SUCCESS, REGISTER_FAILED],
        //parseResponse:
      }
    }).then(({ payload, error}) =>  {
      debugger
      localStorage.setItem('token', payload.token)
      dispatch(loadInitialData())
      dispatch(pushPath('/'))
    }).catch((e) => {
      return Promise.reject({_error: e._error })
    })
  }
}
