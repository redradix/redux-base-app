// TODO: Cambiar validate token por session (get) y llamarlo desde el login
import * as actions from './actions';
export * from './actions';

function session(state = {}, action) {
  switch (action.type) {
  case actions.REGISTER_SUCCEEDED:
  case actions.LOGIN_SUCCEEDED:
  case actions.GET_SESSION_SUCCEEDED:
    return Object.assign({}, action.payload);
  case actions.LOGOUT_SUCCEEDED:
    return {};
  default:
    return state;
  }
}

const initialState = {
  isLogged: false,
  isLogging: false,
  isRegistering: false,
  session: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case actions.LOGIN_FAILED:
    return Object.assign({}, state, {
      isLogging: false
    });
  case actions.LOGIN_ATTEMPTED:
    return Object.assign({}, state, {
      isLogging: true
    });
  case actions.GET_SESSION_FAILED:
    return Object.assign({}, state, {
      isLogged: false
    });
  case actions.GET_SESSION_SUCCEEDED:
    return Object.assign({}, state, {
      isLogged: true,
      session: session(state.session, action)
    });
  case actions.LOGIN_SUCCEEDED:
    return Object.assign({}, state, {
      isLogged: true,
      isLogging: false
    });
  case actions.LOGOUT_SUCCEEDED:
    return Object.assign({}, state, {
      isLogged: false,
      logging: false,
      isRegistering: false,
      session: {}
    });
  case actions.REGISTER_FAILED:
    return Object.assign({}, state, {
      isRegistering: false
    });
  case actions.REGISTER_ATTEMPTED:
    return Object.assign({}, state, {
      isRegistering: true
    });
  case actions.REGISTER_SUCCEEDED:
    return Object.assign({}, state, {
      isRegistering: false,
      isLogged: true
    });
  default:
    return state;
  }
}
