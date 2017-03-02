import { LOCALSTORAGE_TOKEN_KEY } from './config'
import 'isomorphic-fetch'

const getToken = () => localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
const defaultParse = jsonBody => jsonBody.data
const defaultPrepare = jsonData => jsonData
const defaultOnError = response => response.errors

// Makes an AJAX call using fetch API
export function makeRequest(endpoint, config = {}) {
  return window.fetch(endpoint, config)
    .then(response => {
      return response.json()
      .then(json => ({ json, response }))
      .catch(() => ({ response }))
    })
    .then(({ json, response }) => {
      // console.log('Fetch then', json, response);
      if (!response.ok) {
        // NOTE: this "errors" props is app-specific
        // throw json.errors
        throw json ? json : new Error(response.statusText)
      } else {
        // NOTE: this json.data is app-specific!!!
        // return json.data;
        return json
      }
    })
    .catch((e) => {
      return Promise.reject(e)
    })
}

/**
 * This function defines what means than an API call is 'secure'
 * In this case, it reads the JSON Web Token from localStorage
 * and appends it as a header
 *
 * Different projects may need to change this behaviour
 */


const applyHeaders = (request = {}, shouldUseToken) => {
  const token = getToken()
  if (token && shouldUseToken) {
    request.headers = request.headers || {}
    request.headers.Authorization = 'Bearer ' + token
  }
  return {
    ...request,
    headers: {
      ...request.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
}

/**
 * Default options for every REST API call
 * @type {Object}
 */
const defaultOptions = {
  /**
   * parse is a function used to transform the API response
   * Its argument is the JSON.parsed response
   * @type {Function}
   */
  parse: defaultParse,
  /**
   * onError is a function used to parse the API response
   * in case on error. Its return value will be the reject
   * value from the Promise
   */
  onError: defaultOnError,
  /**
   * prepare is a function used to transform the API request body
   * prior to the request
   * @type {Function}
   */
  prepare: defaultPrepare,
  /**
   * For `update` method, use PATCH instead of PUT as HTTP verb
   * @type {Boolean}
   */
  patch: false,
  /**
   * Flag indicating if the API call should be secure
   * See `applyHeaders` function above
   * Default implementation is to send Authorization header with JSON Web Token
   * @type {Boolean}
   */
  secure: true
}

const fetchEndpoint = (endpoint, request = {}) => {
  const config = applyHeaders(request, true)
  return makeRequest(process.env.REACT_APP_API_URL + endpoint, config)
  .then(response => response.data)
}

export const post = (endpoint, data = {}, options = {}) => {
  const opts = Object.assign({}, defaultOptions, options)
  const config = applyHeaders({
    method: 'POST',
    body: JSON.stringify(opts.prepare(data))
  }, opts.secure)
  return fetchEndpoint(endpoint, config)
}

// REVIEW: Right now, the only way to add url parameters to a get request is by
// adding them directly to the endpoint. Wouldn't it be nice to receive them
// here, just like in `post`?
export const get = (endpoint, options = {}) => {
  const opts = Object.assign({}, defaultOptions, options)
  const config = applyHeaders({
    method: 'GET'
  }, opts.secure)
  return fetchEndpoint(endpoint, config)
}

export const update = (endpoint, data = {}, options = {}) => {
  const opts = Object.assign({}, defaultOptions, options)
  const config = applyHeaders({
    method: 'PUT',
    body: JSON.stringify(opts.prepare(data))
  }, opts.secure)
  return fetchEndpoint(endpoint, config)
}

export const del = (endpoint, options = {}) => {
  const opts = Object.assign({}, defaultOptions, options)
  const config = applyHeaders({
    method: 'DELETE'
  }, opts.secure)
  return fetchEndpoint(endpoint, config)
}
