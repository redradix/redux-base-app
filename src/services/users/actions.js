import { normalize } from 'normalizr'
import { mutateAsync } from 'redux-query'
import { batch } from 'utils/batch'
import { setIn, deleteIn } from 'modules/ui'
import { merge, remove } from 'modules/entities'
import { getPageNumber, setCurrentPage, clearFromPageOnwards, getTotal, setTotal } from 'modules/pagination'
import { DOMAIN, ENDPOINT, userSchema } from './'

import { setPageNumber as setPageN } from 'modules/pagination'

export const storeUser = ({ data }) => merge({ users: { [data.id]: data } })

export function storeUsers({ data }) {
  const { users, pagination: { total } } = data
  const { entities, result } = normalize(users, [userSchema])
  return batch('STORE_USERS',
    merge(entities),
    setCurrentPage(DOMAIN, result),
    setTotal(DOMAIN, total)
  )
}

export const deleteUser = (id, callback) => (dispatch, getState) => dispatch(
  mutateAsync({
    url: `${ENDPOINT}${id}`,
    options: { method: 'DELETE' }
  })
)
.then(function() {
  // NOTE: When server responds with 204 (no content), redux-query will not
  // call either of the callback functions, transform and update
  dispatch(remove(DOMAIN, id))
  dispatch(setTotal(DOMAIN, getTotal(getState(), DOMAIN) - 1))
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

export const updateUser = (data) => (dispatch) => dispatch(
  mutateAsync({
    url: `${ENDPOINT}${data.id}`,
    options: { method: 'PUT' },
    body: data,
    transform: function(user) {
      dispatch(storeUser(user))
      dispatch(setIn(['my-account', 'user'], true))
      setTimeout(() => dispatch(deleteIn(['my-account', 'user'])), 3000)
    },
    update: {} // Disregard redux-query update methods
  })
)

export function setPageNumber(pageNumber) {
  return setPageN(DOMAIN, pageNumber)
}
