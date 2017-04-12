import { getIn } from 'modules/ui-reborn'
import { LOCALSTORAGE_TOKEN_KEY } from 'core/api'
import {DOMAIN} from './'

export function getSession(state) {
  return getIn(state, [DOMAIN, 'session'])
}

export function getUser(state) {
  return getSession(state).user
}

export function getUsername(state) {
  const user = getUser(state)
  return `${user.name} ${user.surname}`
}

export function getRole(state) {
  return getUser(state).role
}

export function getToken() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
}

export function getDefaultFilters(state) {
  return getSession(state).defaultFilters || {}
}

export function loggedIn() {
  return !!getToken()
}

export function isPasswordChanged(state) {
  return getIn(state, ['my-account', 'password']) || false
}
