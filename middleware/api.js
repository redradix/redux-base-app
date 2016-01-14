//TODO: Not finished (post requests)
import config from '../config'
import { applyToken, applyHeaders }from '../actions/helpers'

const BASE_URL = config.api 


function callApi(endpoint, authenticated, config={}) {
  let token = localStorage.getItem('token') || null
  config = applyHeaders(config, token)

  if (authenticated && !token) {
    throw "No token saved!"
  }

  return fetch(BASE_URL + endpoint, config)
  .then(response => 
    response.json().then(json=> ({ json, response }))
  ).then(({ json, response }) => {
    if (!response.ok) {
      throw json.errors[0] 
    } else {
      debugger
      return json.data
    }
  }).catch(error => {
    throw error.message
  })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated, config  } = callAPI

  const [ requestType, successType, errorType] = types

  // Passing the authenticated boolean back in our data will let us distinguish
  return callApi(endpoint, authenticated, config).then(
    payload =>
      next({
        payload,
        authenticated,
        type: successType
      }),
    error => 
      next({
        error: error.message || 'There was an error.',
        type: errorType
      })
  )
}
