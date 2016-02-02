import fetch from 'isomorphic-fetch'
import config from '../config'
import { applyToken, applyHeaders } from '../modules/helpers'
import { LOGOUT } from '../modules/auth'

const BASE_URL = config.api


function callApi(endpoint, authenticated, config={}) {
  let token = localStorage.getItem('token') || null
  config = applyHeaders(config, token)

  if (authenticated && !token) {
    return Promise.reject("Unauthorized")
  }

  return fetch(BASE_URL + endpoint, config)
  .then(response =>
    response.json().then(json=> ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json.errors[0]
    } else {
      return json.data
    }
  }).catch(error => {
    throw error.message
  })
}

export const CALL_API = Symbol('Call API')

export default store => dispatch => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return dispatch(action)
  }

  let { endpoint, types, authenticated, config  } = callAPI

  const [ requestType, successType, errorType] = types
  dispatch({type: requestType, authenticated})
  // Passing the authenticated boolean back in our data will let us distinguish
  return callApi(endpoint, authenticated, config).then(
    payload =>
      dispatch({
        payload,
        authenticated,
        type: successType
      }),
    error => {
      // Switch con todos los casos de excepcion comunes
      if (error == 'Unauthorized') {
        return Promise.reject(error)
      } else {
        dispatch({
          error: error || 'There was an error.',
          type: errorType
        })
        return Promise.reject({
          _error: error || 'There was an error.',
        })
      }
    }
  )
}
