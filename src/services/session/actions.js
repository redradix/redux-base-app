import { LOCALSTORAGE_TOKEN_KEY } from 'core/config'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import { apiPost } from 'core/api'
import { get, post, del } from 'resources/session'
import { getSession, getToken } from './selectors'
import { setUIElement, deleteUIElements } from 'modules/ui'
import { DOMAIN } from './'
import { fetchData } from 'services/app'

// UTILS
function clearToken() {
  localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
}

function saveToken(token) {
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token)
}

export function goToLogin() {
  return browserHistory.push('/login')
}

/** Auth module Action Creators **/

/**
 * Async action that fetches the current user session
 * if a JSON Web Token is present
 * @return {Function} Async action (thunk)
 */
export function fetchSession() {
  return (dispatch, getState) => {
    // bail out early, if no token avoid calling the API
    if (!getToken()) {
      goToLogin()
      return Promise.reject()
    }
    if (!getSession(getState())) {
      return get(dispatch)
      .then(session => {
        dispatch(setUIElement(DOMAIN, 'session', session))
        return session
      }, e => {
        clearToken()
        goToLogin()
        return Promise.reject(e)
      })
      .then(session => {
        dispatch(fetchData())
        return session
      })
    }
    return dispatch(fetchData())
    .then(() => getSession(getState()))
  }
}

/**
 * Async action creator that performs login
 * @param  {String} options.username Username
 * @param  {String} options.password Password
 * @return {Function}                Thunk
 */
export function login(data) {
  return (dispatch) => {
    return post(data)
    .then(response => {
      saveToken(response.token)
      return dispatch(fetchSession())
      .then(session => {
        browserHistory.push('/')
        return session
      })
    })
  }
}

/**
 * Async action that performs logout
 * @return {Function} Thunk
 */
export function logout() {
  return (dispatch) => {
    return del()
    .then(() => {
      clearToken()
      return new Promise(resolve => {
        dispatch(deleteUIElements(DOMAIN, ['session']))
        goToLogin()
        resolve()
      })
    }, e => {
      throw new Error('Unexpected error', e)
    })
  }
}

/**
 * Async action that performs password update
 * @return {Function} Thunk
 */
export function setPassword(data) {
  return (dispatch) => {
    return apiPost('api/changePassword', data)
    .then(() => {
      dispatch(setUIElement('myAccount', 'password', true))
      setTimeout(() => dispatch(deleteUIElements('myAccount', ['password'])), 3000)
    })
    .catch((e) => {
      throw new SubmissionError({ _error: e })
    })
  }
}
