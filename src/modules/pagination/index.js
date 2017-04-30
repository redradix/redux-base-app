import { pick } from 'lodash'
import { generateReducer } from 'utils/utils'
import * as actions from './action-types'
export * from './constants'
export * from './actions'
export * from './selectors'

/**
 * @overview Pagination module's initial state and reducer
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

const initialState = {}

function setPage(state, action) {
  const { domain, payload } = action
  const pages = state[domain] ? Object.assign({}, state[domain].pages, payload) :
                                payload
  return Object.assign({}, state, { [domain]: { ...state[domain], pages }})
}

function setCurrentPage(state, action) {
  const { domain, payload } = action
  const domainState = state[domain] || { pages: {} }
  const pageNumber = domainState.pageNumber || 0
  const pages = Object.assign({}, domainState.pages, { [pageNumber]: payload })

  return Object.assign({}, state, { [domain]: { ...domainState, pages }})
}

function clearPage(state, action) {
  const { domain, payload } = action
  const pages = state[domain] ? Object.assign({}, state[domain].pages) : {}
  delete pages[payload]
  return Object.assign({}, state, { [domain]: { ...state[domain], pages }})
}

function clearFromPageOnwards(state, action) {
  const { domain, payload } = action
  const domainState = state[domain]
  if (!domainState || !domainState.pages) return state

  const pages = Object.keys(domainState.pages).sort()
  const index = pages.indexOf(`${payload}`) // NOTE: Object property (string)
  pages.splice(index)

  return Object.assign({}, state, {
    [domain]: {
      ...domainState,
      pages: pick(domainState.pages, pages)
    }
  })
}

function setPageNumber(state, action) {
  const { domain, payload } = action
  return Object.assign({}, state, { [domain]: { ...state[domain], pageNumber: payload }})
}

function setTotal(state, action) {
  const { domain, payload } = action
  return Object.assign({}, state, { [domain]: { ...state[domain], total: payload }})
}

const reducer = generateReducer({
  [actions.SET_PAGE]: setPage,
  [actions.SET_CURRENT_PAGE]: setCurrentPage,
  [actions.CLEAR_PAGE]: clearPage,
  [actions.CLEAR_PAGE_AND_ONWARDS]: clearFromPageOnwards,
  [actions.SET_PAGE_NUMBER]: setPageNumber,
  [actions.SET_TOTAL]: setTotal
}, initialState)

export default reducer
