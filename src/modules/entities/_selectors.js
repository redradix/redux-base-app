import invariant from 'invariant'
import { moduleName } from './constants'

/**
 * @overview Entities module - Selectors
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

const getState = (state) => state[moduleName]

const getSchema = (state, schema) => state[moduleName][schema] || {}

function getSchemas(state, schemas) {
  const schemaDictionary = getState(state)
  if (!schemas) return schemaDictionary

  return schemas.reduce(
    (acc, s) => Object.assign(acc, { [s]: schemaDictionary[s] || {} })
  , {})
}

function getEntities(state, schema, ids) {
  const entityDictionary = getSchema(state, schema)
  if (typeof ids === 'string' || typeof ids === 'number') return entityDictionary[ids]

  const arr = Array.isArray(ids) ? ids : Object.keys(entityDictionary)
  const testFn = typeof ids === 'function' ? ids : e => e && ids.includes(e.id)

  return arr.reduce(
    (acc, id) => testFn(entityDictionary[id]) ?
      Object.assign(acc, { [id]: entityDictionary[id] }) : acc
  , {})
}

export function get(state, schema, id) {
  if (arguments.length < 3) {

    invariant(!schema || typeof schema === 'string' || Array.isArray(schema),
      'Schema must be a string or an array of strings'
    )

    return typeof schema === 'string' ? getSchema(state, schema) :
                                        getSchemas(state, schema)
  }

  invariant(typeof schema === 'string',
    'Schema must be a string when passing three arguments'
  )

  invariant(typeof id === 'string' || typeof id === 'number' ||
            Array.isArray(id) || typeof id === 'function',
    'Id must be a string or a number, or array of them, or a function'
  )

  return getEntities(state, schema, id)
}
