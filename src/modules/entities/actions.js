import * as actions from './action-types'

/**
 * Normalize entities and merge them into the state
 *
 * @param {array} data Array from which entities will be extracted
 * @param {object} schema Schema to be used for normalization
 * @return {object} An action ready to be dispatched
 */
export const merge = entities => ({ type: actions.MERGE, payload: entities })
