import { SubmissionError } from 'redux-form'
import { get as getEndpoint, post as postEndpoint, del as delEndpoint } from 'core/api'
import { commAttempt, commError, commSuccess } from 'modules/communication'

export const DOMAIN = 'authentication'
export const ENDPOINT = 'api/session'

export function get(dispatch) {
  dispatch(commAttempt(DOMAIN))
  return getEndpoint(ENDPOINT)
  .then(session => {
    dispatch(commSuccess(DOMAIN))
    return session
  }, e => {
    dispatch(commError(DOMAIN, e))
    return Promise.reject(e)
  })
}

export function post(data) {
  return postEndpoint(ENDPOINT, data, {secure: false})
  .then(void 0, e => {
    const error = e.errors !== undefined ? e.errors[0] : e
    if (error.message.match(/Failed to fetch/)) {
      throw new SubmissionError({ _error: 'Login failed: Conection error', application: 'dfdfdsf' })
    }
    if (error.field === 'application' || error.field === undefined) {
      throw new SubmissionError({ _error: error.message })
    }
    if (error.field) {
      throw new SubmissionError({ _error: 'Login failed', [error.field]: error.message })
    }
    throw new SubmissionError({ _error: 'Login failed: Try again later'})
  })
}

export function del() {
  return delEndpoint(ENDPOINT)
}
