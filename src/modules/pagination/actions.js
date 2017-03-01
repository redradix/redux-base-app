import * as actions from './action-types'

export const setPage = (domain, pageNumber, ids) => ({
  domain,
  type: actions.SET_PAGE,
  payload: { [pageNumber]: ids }
})

export const setPageNumber = (domain, pageNumber) => ({
  domain,
  type: actions.SET_PAGE_NUMBER,
  payload: pageNumber
})
