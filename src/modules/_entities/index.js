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

function mergeSchemas(state, schemaDictionary) {
  const schemas = Object.keys(schemaDictionary)
  if (!schemas.length) return state

  return schemas.reduce((acc, schema) => {
    let entityDictionary = schemaDictionary[schema]

    if (acc[schema]) {
      entityDictionary = Object.keys(entityDictionary).reduce((acc2, entityId) => {
        let entity = entityDictionary[entityId]

        if (acc2[entityId]) {
          entity = Object.assign({}, acc2[entityId], entityDictionary[entityId])
        }

        return Object.assign(acc2, { [entityId]: entity })
      }, Object.assign({}, acc[schema]))
    }

    return Object.assign(acc, { [schema]: entityDictionary })
  }, Object.assign({}, state))
}

function reducer(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
  case actions.MERGE:
    return mergeSchemas(state, payload)
  case actions.REMOVE_SCHEMAS:
    return omit(state, payload)
  case actions.REMOVE_ENTITIES:
    return Object.assign({}, state, {
      [payload.schema]: omit(state[payload.schema], payload.entities)
    })
  case actions.CLEAR:
    return initialState
  default:
    return state
  }
}

export default reducer
