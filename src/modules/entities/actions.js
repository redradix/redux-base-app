import * as types from './action-types'

import { normalize } from 'normalizr'

/**
 * Normalize entities and merge them into the state
 * NOTE: During the rework of this module, normalized entities are stored under
 * the 'normalized' key in the state object for this module
 *
 * @param {array} data Array from which entities will be extracted
 * @param {object} schema Schema to be used for normalization
 * @return {object} An action ready to be dispatched
 */
export function merge(data, schema) {
  // NOTE: Disregard normalizr's results, keep entities alone
  const { entities } = normalize(data, schema)
  return {
    type: types.MERGE,
    payload: { domains: { normalized: entities } }
  }
}

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
