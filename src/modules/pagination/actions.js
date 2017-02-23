import * as types from './action-types'

/*
Domain: Refers to a given visualization: list view
entities: All entities used on this visualization: {campaigns: {
  ids: [1,2,3,4],
  pageSize: 4,
  currentPage: 3
}}
*/
export function merge(domain, entities) {
  return {
    type: types.MERGE,
    payload: {
      entities,
      domain
    }
  }
}

export function unset(domain) {
  return {
    type: types.UNSET,
    payload: {domain}
  }
}


export function clear() {
  return {
    type: types.CLEAR
  }
}
