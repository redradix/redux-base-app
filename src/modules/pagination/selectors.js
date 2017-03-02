// import { createSelector } from 'reselect'
import { moduleName } from './constants'

const empty = { pages: {} }

export const getPagination = (state, domain) => state[moduleName][domain] || empty

export const getPage = (state, domain, pageNumber) =>
  getPagination(state, domain).pages[pageNumber]

export const getPageNumber = (state, domain) =>
  getPagination(state, domain).pageNumber

export const getTotal = (state, domain) =>
  getPagination(state, domain).total
