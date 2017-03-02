import { remove } from 'lodash'
import { post } from 'core/api'
import { get } from 'resources/users'
import { setUIElement, deleteUIElements } from 'modules/ui'
import { mergeEntity } from 'modules/entities'
import { commAttempt, commError, commSuccess } from 'modules/communication'
import { DOMAIN, ENDPOINT, getUserList } from './'

import { setPageNumber } from 'modules/pagination'

export function fetchUsers(pageNumber = 0) {
  return (dispatch, getState) => {
    dispatch(setPageNumber(DOMAIN, pageNumber))
    return get(dispatch, getState)
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
