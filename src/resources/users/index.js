import { schema, normalize } from 'normalizr'
import { get as getEndpoint, del as delEndpoint } from 'core/api'
import { commAttempt, commError, commSuccess } from 'modules/communication'
import { merge } from 'modules/entities'
import { getPage, getPageNumber, setPage, setTotal } from 'modules/pagination'

export const DOMAIN = 'users'
export const ENDPOINT = 'api/user'

export const userSchema = new schema.Entity(DOMAIN)

export function get(dispatch, getState) {
  const state = getState()
  const pageNumber = getPageNumber(state, DOMAIN)
  const page = getPage(state, DOMAIN, pageNumber)
  if (!page) {
    // fetch page
    dispatch(commAttempt(DOMAIN))
    return getEndpoint(`${ENDPOINT}/list?page=${pageNumber}`)
      .then(({ users, pagination: { total } }) => {
        const { entities, result } = normalize(users, [userSchema])
        dispatch(merge(entities))
        dispatch(setPage(DOMAIN, pageNumber, result))
        dispatch(setTotal(DOMAIN, total))
        dispatch(commSuccess(DOMAIN))
      }, err => dispatch(commError(DOMAIN, err)))
  }
  return true
}

export function del(dispatch, getState, data) {
  dispatch(commAttempt(DOMAIN))
  return delEndpoint(ENDPOINT, data)
  .then(() => {
    dispatch(commSuccess(DOMAIN))
  }, err => dispatch(commError(DOMAIN, err)))
}
