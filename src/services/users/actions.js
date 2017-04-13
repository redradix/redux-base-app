import { normalize } from 'normalizr'
import { batch } from 'utils/batch'
import { post } from 'core/api'
import { del } from 'resources/users'
import { setIn, deleteIn } from 'modules/ui'
import { merge, remove } from 'modules/entities'
import { commAttempt, commError, commSuccess } from 'modules/communication'
import { getPageNumber, setPage, setTotal } from 'modules/pagination'
import { DOMAIN, ENDPOINT, userSchema } from './'

import { setPageNumber as setPageN } from 'modules/pagination'

export const storeUser = ({ data }) => (dispatch) => {
  const entities = { users: { [data.id]: data } }
  dispatch(merge(entities))
  return entities
}

export const storeUsers = ({ data }) => (dispatch, getState) => {
  const { users, pagination: { total } } = data
  const { entities, result } = normalize(users, [userSchema])
  const pageNumber = getPageNumber(getState(), DOMAIN)
  dispatch(batch('STORE_USERS', [
    merge(entities),
    setPage(DOMAIN, pageNumber, result),
    setTotal(DOMAIN, total),
    commSuccess(DOMAIN)
  ]))
  return entities
}

export function deleteUser(id) {
  return (dispatch, getState) => {
    dispatch(commAttempt(DOMAIN))
    return del(dispatch, getState, { id })
    .then(() => {
      dispatch(remove(DOMAIN, id))
    })
  }
}

export function createUser(data) {
  return dispatch => {
    dispatch(commAttempt(DOMAIN))
    return post(`${ENDPOINT}/create`, data)
    .then(() => {
      dispatch(commSuccess(DOMAIN))
      dispatch(setIn(['my-account', 'user'], true))
      setTimeout(() => dispatch(deleteIn(['my-account', 'user'])), 3000)
    }, err => dispatch(commError(DOMAIN, err)))
  }
}

export function updateUser(data) {
  return dispatch => {
    dispatch(commAttempt(DOMAIN))
    return post(`${ENDPOINT}/update`, data)
    .then(() => {
      dispatch(commSuccess(DOMAIN))
      dispatch(setIn(['my-account', 'user'], true))
      setTimeout(() => dispatch(deleteIn(['my-account', 'user'])), 3000)
    }, err => dispatch(commError(DOMAIN, err)))
  }
}

export function setPageNumber(pageNumber) {
  return setPageN(DOMAIN, pageNumber)
}
