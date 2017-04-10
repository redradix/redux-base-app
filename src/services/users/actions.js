import { normalize } from 'normalizr'
import { post } from 'core/api'
import { get, del } from 'resources/users'
import { setUIElement, deleteUIElements } from 'modules/ui'
import { merge, replace } from 'modules/entities'
import { commAttempt, commError, commSuccess } from 'modules/communication'
import { getPageNumber, setPage, setTotal } from 'modules/pagination'
import { DOMAIN, ENDPOINT, getUserList, userSchema } from './'

import { setPageNumber as setPageN } from 'modules/pagination'

export function fetchUsers(pageNumber = 0) {
  return (dispatch, getState) => {
    dispatch(setPageN(DOMAIN, pageNumber))
    return get(dispatch, getState)
  }
}

export const storeUsers = ({ data }) => (dispatch, getState) => {
  const { users, pagination: { total } } = data
  const { entities, result } = normalize(users, [userSchema])
  const pageNumber = getPageNumber(getState(), DOMAIN)
  dispatch(merge(entities))
  dispatch(setPage(DOMAIN, pageNumber, result))
  dispatch(setTotal(DOMAIN, total))
  dispatch(commSuccess(DOMAIN))
}

export function deleteUser(id) {
  return (dispatch, getState) => {
    dispatch(commAttempt(DOMAIN))
    return del(dispatch, getState, { id })
    .then(() => {
      const users = getUserList(getState()).reduce(
        (acc, u) => u.id === id ? acc : Object.assign(acc, { [u.id]: u })
      , {})
      dispatch(replace({ users }))
    })
  }
}

export function createUser(data) {
  return dispatch => {
    dispatch(commAttempt(DOMAIN))
    return post(`${ENDPOINT}/create`, data)
    .then(() => {
      dispatch(commSuccess(DOMAIN))
      dispatch(setUIElement('myAccount', 'user', true))
      setTimeout(() => dispatch(deleteUIElements('myAccount', ['user'])), 3000)
    }, err => dispatch(commError(DOMAIN, err)))
  }
}

export function updateUser(data) {
  return dispatch => {
    dispatch(commAttempt(DOMAIN))
    return post(`${ENDPOINT}/update`, data)
    .then(() => {
      dispatch(commSuccess(DOMAIN))
      dispatch(setUIElement('myAccount', 'user', true))
      setTimeout(() => dispatch(deleteUIElements('myAccount', ['user'])), 3000)
    }, err => dispatch(commError(DOMAIN, err)))
  }
}

export function setPageNumber(pageNumber) {
  return setPageN(DOMAIN, pageNumber)
}
