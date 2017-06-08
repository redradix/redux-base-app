import { querySelectors } from 'redux-query'
import { getCommState } from 'modules/communication'
import { getEntityList } from 'modules/entities'
import { getQueries } from 'modules/entities-with-redux-query'
import { getIn } from 'modules/ui'
import { getPage, getPageNumber, getTotal } from 'modules/pagination'
import { DOMAIN } from './'

export const isUserListReady = state => getCommState(state, DOMAIN, false)
// REVIEW: Should we use `isPending` instead of `isFinished`?
export const isUserPageReady = (state, pageNumber) =>
  querySelectors.isFinished(getQueries(state), { queryKey: `users-list#${pageNumber}` })
export const getUserList = state => getEntityList(state, DOMAIN)
export const getUser = (state, id) => getUserList(state).find((user) => user.id === id)

export const getUserListPage = (state, pageNumber) => {
  // NOTE: Give a default value because otherwise all users are returned
  const ids = getPage(state, DOMAIN, pageNumber) || []
  return getEntityList(state, DOMAIN, ids)
}
export const getCurrentPage = state => getPageNumber(state, 'users')
export const getTotalUsers = state => getTotal(state, 'users')

export const isUserCreated = state => getIn(state, ['my-account', 'user'])
