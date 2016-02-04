//TODO: Cambiar validate token por session (get) y llamarlo desde el login
import * as actions from './actions'
export * from './actions'

function session(state, action) {
  switch (action.type) {
    case actions.REGISTER_SUCCEEDED:
    case actions.LOGIN_SUCCEEDED:
    case actions.TOKEN_VALIDATION_SUCCEEDED:
      return Object.assign({}, action.payload)
    case actions.LOGOUT_SUCCEEDED:
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
    case actions.LOGIN_FAILED:
      return Object.assign({}, state, {
        loging: false 
      })
    case actions.LOGIN_ATTEMPTED: 
      return Object.assign({}, state, {
        loging: true  
      })
    case actions.TOKEN_VALIDATION_FAILED:
      return Object.assign({}, state, {
        logged: false
      })
    case actions.TOKEN_VALIDATION_SUCCEEDED:
      return Object.assign({}, state, {
        logged: true,
        session: session(state.session, action)
      })
    case actions.LOGIN_SUCCEEDED:
      return Object.assign({}, state, {
        logged: true,
        loging: false,
        session: session(state.session, action)
      })
    case actions.LOGOUT_SUCCEEDED:
      return Object.assign({}, state, {
        logged: false,
        logging: false,
        registering: false,
        session: session(state.session, action) 
      })
    case actions.REGISTER_FAILED:
      return Object.assign({}, state, {
        registering: false
      })
    case actions.REGISTER_ATTEMPTED:
      return Object.assign({}, state, {
        registering: true
      })
    case actions.REGISTER_SUCCEEDED:
      return Object.assign({}, state, {
        registering: false,
        logged: true,
        session: session(state.session, action)
      })
    default:
      return state
  }  
}
