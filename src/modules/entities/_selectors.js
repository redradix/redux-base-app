import invariant from 'invariant'
import { createSelector } from 'reselect'
import { moduleName } from './constants'

export const getState = (state) => state[moduleName]
export const getSchemas = createSelector(
  getState,
  (_, schema) => schema, // keep 2nd argument
  (schemaDictionary, schema) => Array.isArray(schema) ? schema.reduce(
    (acc, sc) => Object.assign(acc, { [sc]: schemaDictionary[sc] || {} })
  , {}) : schemaDictionary[schema] || {}
)
export const getEntities = createSelector(
  getSchemas,
  (_1, _2, ids) => ids,
  (entityDictionary, ids) => {
    if (Array.isArray(ids)) {
      return ids.reduce(
        (acc, id) => entityDictionary[id] ?
          Object.assign(acc, { [id]: entityDictionary[id] }) : acc
      , {})
    } else if (typeof ids === 'function') {
      const testFn = ids // huh
      return Object.keys(entityDictionary).reduce(
        (acc, id) => testFn(entityDictionary[id]) ?
          Object.assign(acc, { [id]: entityDictionary[id] }) : acc
      , {})
    }
    return entityDictionary[ids]
  }
)

export function get(state, schema, id) {
  if (arguments.length === 1) {
    return getState(state)
  }

  if (arguments.length === 2) {
    invariant(typeof schema === 'string' || Array.isArray(schema),
      'The schema must be either a string or an array of strings'
    )
    return getSchemas(state, schema)
  }

  // if (arguments.length === 3) {
  invariant(typeof schema === 'string',
    'Schema must be a string when passing three arguments'
  )
  invariant(typeof id === 'string' || typeof id === 'number' || Array.isArray(id) || typeof id === 'function',
    'id must be a string or a number, or array of them, or a function'
  )
  return getEntities(state, schema, id)
  // }
}
