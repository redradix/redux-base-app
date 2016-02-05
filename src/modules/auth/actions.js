import { CALL_API } from '../../middleware/api';
import { pushPath, replacePath } from 'react-router-redux';

const MODULE_NAME = 'base-app/auth/';

// Past tense for actions
export const TOKEN_VALIDATION_FAILED = MODULE_NAME.concat('VALIDATE_TOKEN_FAIL');
export const TOKEN_VALIDATION_SUCCEEDED = MODULE_NAME.concat('VALIDATE_TOKEN');
export const TOKEN_VALIDATION_ATTEMPTED = MODULE_NAME.concat('VALIDATE_TOKEN_ATTEMPT');

export const LOGIN_ATTEMPTED = MODULE_NAME.concat('LOGIN_ATTEMPT');
export const LOGIN_FAILED = MODULE_NAME.concat('LOGIN_FAIL');
export const LOGIN_SUCCEEDED = MODULE_NAME.concat('LOGIN');
export const LOGOUT_SUCCEEDED = MODULE_NAME.concat('LOGOUT');

export const REGISTER_SUCCEEDED = MODULE_NAME.concat('REGISTER');
export const REGISTER_ATTEMPTED = MODULE_NAME.concat('REGISTER_ATTEMPT');
export const REGISTER_FAILED = MODULE_NAME.concat('REGISTER_FAIL');

function loadInitialData(store) {
  return (dispatch, getState) => {
  };
}

export function checkLogged(callback) {
  return (dispatch, getState) => {
    if (getState().auth.logged) {
      dispatch(replacePath('/'));
    } else {
      callback();
    }
  };
}

export function validateToken() {
  return (dispatch, getState) => {
    if (!getState().auth.logged) {
      return dispatch({
        [CALL_API]: {
          endpoint: 'session',
          authenticated: true,
          types: [TOKEN_VALIDATION_ATTEMPTED, TOKEN_VALIDATION_SUCCEEDED, TOKEN_VALIDATION_FAILED]
        }
      }).then(({ payload }) =>  {
        dispatch(loadInitialData());
      }).catch((e) => {
        localStorage.removeItem('token');
      });
    }
  };
}

export function logout() {
  return (dispatch, getState) => {
    localStorage.removeItem('token');
    dispatch(LOGOUT_SUCCEEDED);
    dispatch(pushPath('/login'));
  };
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
        types: [LOGIN_ATTEMPTED, LOGIN_SUCCEEDED, LOGIN_FAILED]
      }
    }).then(({ payload }) =>  {
      localStorage.setItem('token', payload.token);
      dispatch(loadInitialData());
      dispatch(pushPath('/'));
    }).catch((e) => {
      return Promise.reject({ _error: e._error});
    });
  };
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
        types: [REGISTER_ATTEMPTED, REGISTER_SUCCEEDED, REGISTER_FAILED]
      }
    }).then(({ payload, error}) =>  {
      localStorage.setItem('token', payload.token);
      dispatch(loadInitialData());
      dispatch(pushPath('/'));
    }).catch((e) => {
      return Promise.reject({_error: e._error });
    });
  };
}
