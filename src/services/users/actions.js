import { remove } from 'lodash'
import { get, post } from 'core/api'
import { setUIElement, deleteUIElements } from 'modules/ui'
import { mergeEntity } from 'modules/entities'
import { commAttempt, commError, commSuccess } from 'modules/communication'
import { DOMAIN, ENDPOINT, getUserList } from './'

import { merge } from 'modules/entities'
import { schema, normalize } from 'normalizr'

// FIXME: `DOMAIN` should be passed as the schema key, but it is undefined
// due to a circular dependency between this file and ./index.js
const userSchema = new schema.Entity('users')
// const userSchema = new schema.Entity(DOMAIN)

import { getPage, setPage, setPageNumber, setTotal } from 'modules/pagination'

export function fetchUsers(pageNumber = 0) {
  return (dispatch, getState) => {
    dispatch(setPageNumber(DOMAIN, pageNumber))
    const state = getState()
    const page = getPage(state, DOMAIN, pageNumber)
    if (!page) {
      // fetch page
      dispatch(commAttempt(DOMAIN))
      return get(`${ENDPOINT}/list?page=${pageNumber}`)
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
}

export function deleteUser(email) {
  return (dispatch, getState) => {
    dispatch(commAttempt(DOMAIN))
    return post(`${ENDPOINT}/remove`, { email })
    .then(() => {
      const users = getUserList(getState())
      remove(users, ({ user }) => user.email === email)
      dispatch(mergeEntity(DOMAIN, users))
      dispatch(commSuccess(DOMAIN))
    }, err => dispatch(commError(DOMAIN, err)))
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
