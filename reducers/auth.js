import { LOGIN, LOGIN_ATTEMPT, LOGIN_FAIL, LOGOUT, REGISTER, REGISTER_ATTEMPT, REGISTER_FAIL } from '../actions/auth'

function session(state={
    username: undefined,
    email: undefined,
    token: localStorage.getItem('token')
  }, action) {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return Object.assign({}, action.payload)
    case LOGOUT:
      return {}
    default: 
      return state
  } 
}


export default function (state={
  logged: localStorage.getItem('token') ? true : false,
  loging: false,
  registering: false,
  session: session(undefined, {type: 'none'}) 
  }, action) {
  switch (action.type) {
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        loging: false 
      })
    case LOGIN_ATTEMPT: 
      return Object.assign({}, state, {
        loging: true  
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
