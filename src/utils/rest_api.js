//API utils
import { CALL_API } from '../middleware/api'
import { BASE_API_URL, LOCALSTORAGE_TOKEN_KEY } from '../config'

//Helpers
function getToken(){
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

function defaultParse(jsonBody){
  return jsonBody;
}

function defaultPrepare(jsonData){
  return jsonData;
}

function defaultOnError(response){
  return response;
}

/**
 * This function defines what means than an API call is 'secure'
 * In this case, it reads the JSON Web Token from localStorage
 * and appends it as a header
 *
 * Different projects may need to change this behaviour
 */

function applyHeaders(request, shouldUseToken) {
  const token = getToken();
  if (token && shouldUseToken) {
    request.headers = request.headers || {}
    request.headers['Authorization'] = 'Bearer ' + token
  }
  return {
    ...request,
    headers: {
      ...request.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      }
    };
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

/**
 * Makes a GET request to fetch a resource collection
 * @param  {String} url     Endpoint URL
 * @param  {Array}  types   Array of ACTION_TYPES (attempt, success, fail)
 * @param  {Object} options Overriden options
 * @return {Object}         CALL_API action, ready to dispatch
 */
export function fetch(url, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options)
  var config = applyHeaders({}, opts.secure)
  return {
    [CALL_API]: {
      endpoint: BASE_API_URL + url,
      config,
      types,
      options: opts
    }
  }
}


/**
 * Makes a POST request to create a new resource
 * @param  {String} url     Endpoint URL
 * @param  {Object} data    Javascript object containing the JSON body to send
 * @param  {Array}  types   Array of ACTION_TYPES
 * @param  {Object} options Overriden options
 * @return {Object}         CALL_API action, ready to dispatch
 */
export function create(url, data, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options)
  var config = applyHeaders({
    method: 'POST',
    body: JSON.stringify(opts.prepare(data))
  }, opts.secure);
  return {
    [CALL_API]: {
      endpoint: BASE_API_URL + url,
      config,
      types,
      options: opts
    }
  }
}

/**
 * Makes a PUT/PATCH request to update a resources
 * @param  {String} url     Endpoint URL
 * @param  {object} data    Javascript object that will be JSON.stringified
 * @param  {Array}  types   Array of ACTION_TYPES (attempt, succes, fail)
 * @param  {Object} options Overriden options
 * @return {Object}         CALL_API action
 */
export function update(url, data, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options);
  var config = applyHeaders({
    method: options.patch ? 'PATCH': 'PUT',
    body: JSON.stringify(opts.prepare(data))
  }, opts.secure);
  return {
    [CALL_API]: {
      endpoint: BASE_API_URL + url,
      config,
      types,
      options: opts
    }
  }
}

/**
 * Makes a DELETE request to remove a resource
 * @param  {String} url     Endpoint URL
 * @param  {Array} types    Array of ACTION_TYPES (attempt, success, fail)
 * @param  {Object} options Overriden options
 * @return {Object}         CALL_API action
 */
export function del(url, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options);
  var config = applyHeaders({
    method: 'DELETE'
  }, opts.secure);

  return {
    [CALL_API]: {
      endpoint: BASE_API_URL + url,
      config,
      types,
      options: opts
    }
  }
}


