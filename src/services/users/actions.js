import { remove } from 'lodash'
import { get, post } from 'core/api'
import { setUIElement, deleteUIElements } from 'modules/ui'
import { mergeEntity } from 'modules/entities'
import { commAttempt, commError, commSuccess } from 'modules/communication'
import { DOMAIN, ENDPOINT, getUserList } from './'

export function fetchUsers() {
  return dispatch => {
    dispatch(commAttempt(DOMAIN))
    return get(`${ENDPOINT}/list`)
    .then(users => {
      dispatch(mergeEntity(DOMAIN, users))
      dispatch(commSuccess(DOMAIN))
    }, err => dispatch(commError(DOMAIN, err)))
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
