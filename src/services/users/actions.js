import { normalize } from 'normalizr'
import { mutateAsync } from 'redux-query'
import { batch } from 'utils/batch'
import { setIn, deleteIn } from 'modules/ui'
import { merge, remove } from 'modules/entities'
import { getPageNumber, setPage, clearFromPageOnwards, setTotal } from 'modules/pagination'
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
    setTotal(DOMAIN, total)
  ]))
  return entities
}

export const deleteUser = (id, callback) => (dispatch, getState) =>
  dispatch(mutateAsync({
    url: `${ENDPOINT}${id}`,
    options: { method: 'DELETE' }
  }))
  .then(function() {
    // NOTE: When server responds with 204 (no content), redux-query will not
    // call either of the callback functions, transform and update
    dispatch(remove(DOMAIN, id))
    dispatch(clearFromPageOnwards(DOMAIN, getPageNumber(getState(), DOMAIN)))
    callback()
  })

export const createUser = (data) => (dispatch) => dispatch(
  mutateAsync({
    url: `${ENDPOINT}`,
    options: { method: 'POST' },
    body: data,
    transform: function(user) {
      dispatch(storeUser(user))
      dispatch(setIn(['my-account', 'user'], true))
      setTimeout(() => dispatch(deleteIn(['my-account', 'user'])), 3000)
    },
    update: {} // Disregard redux-query update methods
  })
)

export const updateUser = (data) => (dispatch) =>
  dispatch(mutateAsync({
    url: `${ENDPOINT}${data.id}`,
    options: { method: 'PUT' },
    body: data,
    transform: function(user) {
      dispatch(storeUser(user))
      dispatch(setIn(['my-account', 'user'], true))
      setTimeout(() => dispatch(deleteIn(['my-account', 'user'])), 3000)
    },
    update: {} // Disregard redux-query update methods
  }))

export function setPageNumber(pageNumber) {
  return setPageN(DOMAIN, pageNumber)
}
