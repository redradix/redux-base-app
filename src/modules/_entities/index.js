import { omit } from 'lodash'
import * as actions from './action-types'
export * from './constants'
export * from './actions'
export * from './selectors'

/**
 * @overview Entities module's initial state and reducer
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

const initialState = {}

function mergeSchemas(state, domainDictionary) {
  const domains = Object.keys(domainDictionary)
  if (!domains.length) return state

  return domains.reduce((acc, domain) => {
    let entityDictionary = domainDictionary[domain]

    if (acc[domain]) {
      entityDictionary = Object.keys(entityDictionary).reduce((acc2, entityId) => {
        let entity = entityDictionary[entityId]

        if (acc2[entityId]) {
          entity = Object.assign({}, acc2[entityId], entityDictionary[entityId])
        }

        return Object.assign(acc2, { [entityId]: entity })
      }, Object.assign({}, acc[domain]))
    }

    return Object.assign(acc, { [domain]: entityDictionary })
  }, Object.assign({}, state))
}

function reducer(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
  case actions.MERGE:
    return mergeSchemas(state, payload)
  case actions.REMOVE_DOMAINS:
    return omit(state, payload)
  case actions.REMOVE_ENTITIES:
    return Object.assign({}, state, {
      [payload.domain]: omit(state[payload.domain], payload.entities)
    })
  case actions.CLEAR:
    return initialState
  default:
    return state
  }
}

export default reducer
