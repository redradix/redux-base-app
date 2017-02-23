import { generateReducer } from 'core/utils'
import { merge } from 'lodash'
// Action types
export const ATTEMPT = '#COMMUNICATION/ATTEMPT'
export const SUCCESS = '#COMMUNICATION/SUCCESS'
export const ERROR = '#COMMUNICATION/ERROR'

// Selectors
let PATH
export const init = (p) => {
  PATH = p
}

export const getCommState = (state, domain, defaultValue) => {
  return state[PATH][domain] ? state[PATH][domain].isReady : defaultValue
}

// Actions
export function commAttempt(domain) {
  return {
    type: ATTEMPT,
    meta: {
      domain
    }
  }
}

export function commSuccess(domain) {
  return {
    type: SUCCESS,
    meta: {
      domain
    }
  }
}

export function commError(domain, error) {
  return {
    type: ERROR,
    payload: {
      error
    },
    error: true,
    meta: {
      domain
    }
  }
}

const ACTIONS = {
  [ATTEMPT]: (state, {meta: {domain}}) => ({...state, [domain]: merge({}, state[domain], {isReady: false})}),
  [SUCCESS]: (state, {meta: {domain}}) => ({...state, [domain]: merge({}, state[domain], {isReady: true})}),
  [ERROR]: (state, {meta: {domain}, payload: {error}}) => ({...state, [domain]: merge({}, state[domain], {isReady: false, error})})
}

export default generateReducer(ACTIONS)
