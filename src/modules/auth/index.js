import * as actions from './actions'
export * from './actions'

function session(state={
    username: undefined,
    email: undefined
  }, action) {
  switch (action.type) {
    case actions.REGISTER:
    case actions.LOGIN:
      return Object.assign({}, action.payload)
    case actions.LOGOUT:
      return {}
    default:
      return state
  }
}

export default function reducer(state={
  logged: false,
  loging: false,
  registering: false,
  session: session(undefined, {type: 'none'})
  }, action) {
  switch (action.type) {
    case actions.LOGIN_FAIL:
      return Object.assign({}, state, {
        loging: false
      })
    case actions.LOGIN_ATTEMPT:
      return Object.assign({}, state, {
        loging: true
      })
    case actions.VALIDATE_TOKEN_FAIL:
      return Object.assign({}, state, {
        logged: false
      })
    case actions.VALIDATE_TOKEN:
      return Object.assign({}, state, {
        logged: true
      })
    case actions.LOGIN:
      return Object.assign({}, state, {
        logged: true,
        loging: false,
        session: session(state.session, action)
      })
    case actions.LOGOUT:
      return Object.assign({}, state, {
        logged: false,
        logging: false,
        registering: false,
        session: session(state.session, action)
      })
    case actions.REGISTER_FAIL:
      return Object.assign({}, state, {
        registering: false
      })
    case actions.REGISTER_ATTEMPT:
      return Object.assign({}, state, {
        registering: true
      })
    case actions.REGISTER:
      return Object.assign({}, state, {
        registering: false,
        logged: true,
        session: session(state.session, action)
      })
    default:
      return state
  }
}
