import * as ActionTypes from './action-types'
import { makeRequest } from 'core/api'

export function setConfig(domain, data) {
  return {
    type: ActionTypes.SET_CONFIG,
    payload: {
      domain,
      data
    }
  }
}

export function fetchConfig(domain, url) {
  return (dispatch) => {
    return makeRequest(url)
    .then(data => {
      dispatch(setConfig(domain, data))
      return data
    })
  }
}
