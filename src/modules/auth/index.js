//TODO: Cambiar validate token por session (get) y llamarlo desde el login
import { CALL_API } from '../../middleware/api'

import { pushPath, replacePath } from 'redux-simple-router'
const APP_NAME = "base-app/"

export const VALIDATE_TOKEN_FAIL = APP_NAME.concat("AUTH:VALIDATE_TOKEN_FAIL")
export const VALIDATE_TOKEN = APP_NAME.concat("AUTH:VALIDATE_TOKEN")
export const VALIDATE_TOKEN_ATTEMPT = APP_NAME.concat("AUTH:VALIDATE_TOKEN_ATTEMPT")

export const LOGIN_ATTEMPT = APP_NAME.concat("AUTH:LOGIN_ATTEMPT")
export const LOGIN_FAIL = APP_NAME.concat("AUTH:LOGIN_FAIL")
export const LOGIN = APP_NAME.concat("AUTH:LOGIN")
export const LOGOUT = APP_NAME.concat("AUTH:LOGOUT")

export const REGISTER = APP_NAME.concat("AUTH:REGISTER")
export const REGISTER_ATTEMPT = APP_NAME.concat("AUTH:REGISTER_ATTEMPT")
export const REGISTER_FAIL = APP_NAME.concat("AUTH:REGISTER_FAIL")

function session(state, action) {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case VALIDATE_TOKEN:
      return Object.assign({}, action.payload)
    case LOGOUT:
      return {}
    default: 
      return state
  } 
}

const initialState = {
  logged: false,
  loging: false,
  registering: false,
  session: {
    username: undefined,
    email: undefined
  } 
}

export default function reducer(state=initialState, action={}) {
  switch (action.type) {
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        loging: false 
      })
    case LOGIN_ATTEMPT: 
      return Object.assign({}, state, {
        loging: true  
      })
    case VALIDATE_TOKEN_FAIL:
      return Object.assign({}, state, {
        logged: false
      })
    case VALIDATE_TOKEN:
      return Object.assign({}, state, {
        logged: true,
        session: session(state.session, action)
      })
    case LOGIN:
      return Object.assign({}, state, {
        logged: true,
        loging: false,
        session: session(state.session, action)
      })
    case LOGOUT:
      return Object.assign({}, state, {
        logged: false,
        logging: false,
        registering: false,
        session: session(state.session, action) 
      })
    case REGISTER_FAIL:
      return Object.assign({}, state, {
        registering: false
      })
    case REGISTER_ATTEMPT:
      return Object.assign({}, state, {
        registering: true
      })
    case REGISTER:
      return Object.assign({}, state, {
        registering: false,
        logged: true,
        session: session(state.session, action)
      })
    default:
      return state
  }  
}

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
