// import { createSelector } from 'reselect'
import { moduleName } from './constants'

const empty = { pages: {} }

export const getPagination = (state, domain) => state[moduleName][domain] || empty

export const getPage = (state, domain, pageNumber) =>
  getPagination(state, domain).pages[pageNumber]
