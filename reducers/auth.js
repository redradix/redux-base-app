import { LOGIN, LOGIN_ATTEMPT, LOGIN_FAIL, LOGOUT, REGISTER, REGISTER_ATTEMPT, REGISTER_FAIL } from '../actions/auth'

function session(state={
    username: "Miguel", //undefined,
    email: 'kanedaki@gmail.com', //undefined,
    token: '2344rdfsf34dsf34rgv452342342534w342423' //undefined
  }, action) {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return Object.assign({}, action.payload)
    default: 
      return state
  } 
}


export default function (state={
  logged: true, //false,
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
        session: {}//session(undefined, {type: 'none'}) 
      })
    case REGISTER_FAIL:
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
