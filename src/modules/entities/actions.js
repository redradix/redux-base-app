import * as types from './action-types'

export function mergeEntities(domains) {
  return {
    type: types.MERGE,
    payload: {domains}
  }
}

export function mergeEntity(domain, entity) {
  return mergeEntities({[domain]: entity})
}

export function unsetEntities(domain, keys) {
  return {
    type: types.UNSET,
    payload: {domain, keys}
  }
}

export function unsetEntity(domain, key) {
  return unsetEntities(domain, [key])
}

export function clearAllEntities() {
  return {
    type: types.CLEAR
  }
}
