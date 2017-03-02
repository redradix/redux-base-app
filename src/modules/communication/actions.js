import * as actions from './action-types'

export function commAttempt(domain) {
  return {
    type: actions.ATTEMPT,
    meta: {
      domain
    }
  }
}

export function commSuccess(domain) {
  return {
    type: actions.SUCCESS,
    meta: {
      domain
    }
  }
}

export function commError(domain, error) {
  return {
    type: actions.ERROR,
    payload: {
      error
    },
    error: true,
    meta: {
      domain
    }
  }
}
