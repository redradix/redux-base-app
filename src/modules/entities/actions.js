import { normalize } from 'normalizr'
import * as actions from './action-types'

/**
 * Normalize entities and merge them into the state
 *
 * @param {array} data Array from which entities will be extracted
 * @param {object} schema Schema to be used for normalization
 * @return {object} An action ready to be dispatched
 */
export function merge(data, schema) {
  // NOTE: Disregard normalizr's results, keep entities alone
  const { entities } = normalize(data, schema)
  return {
    type: actions.MERGE,
    payload: entities
  }
}
