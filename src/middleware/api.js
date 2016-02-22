//polyfills fetch for non-compatible browser (issue #6)
import fetch from 'isomorphic-fetch'

// Makes an AJAX call using fetch API
function makeRequest(endpoint, config={}) {
  return fetch(endpoint, config)
    .then(response => {
        return response.json()
          .then(json => ({ json, response }))
          .catch(() => ({ response }))
      }
    )
    .then(({ json, response }) => {
      //console.log('Fetch then', json, response);
      if (!response.ok) {
        //NOTE: this "errors" props is app-specific
        //throw json.errors
        throw json ? json : new Error(response.statusText)
      }
      else {
        //NOTE: this json.data is app-specific!!!
        //return json.data;
        return json

      }
    })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, config, options  } = callAPI
  if(!options.parse){
    options.parse = (x) => x
  }
  if(!options.onError){
    options.onError = (x) => x
  }
  const [requestType, successType, errorType] = types
  next({type: requestType })
  console.log('call api', endpoint, config)
  // Passing the authenticated boolean back in our data will let us distinguish
  return makeRequest(endpoint, config)
  .then(
    payload => {
      next({
        payload: options.parse(payload),
        type: successType
      });
      return options.parse(payload)
    },
    error => {
      let processedError = options.onError(error)
      console.log('fetch error', processedError)
      next({
        error: options.onError(error),
        type: errorType
      });
      throw processedError
    }
  )
}