import invariant from 'invariant'
import { isPlainObject } from 'lodash'
import * as actions from './action-types'

const isSchemaDictionary = (schemaDictionary) =>
  isPlainObject(schemaDictionary) && Object.keys(schemaDictionary).reduce(
    (acc, sc) => acc && isPlainObject(schemaDictionary[sc])
  , true)

export function merge(schema, id, body) {
  let entities = {}
  if (arguments.length === 1) {
    invariant(isSchemaDictionary(schema),
      'If a single argument is provided, it must be a dictionary of schemas'
    )
    entities = schema
  } else if (arguments.length > 1) {
    invariant(typeof schema === 'string',
      `Schema must be a string when passing ${arguments.length} arguments`
    )
    if (arguments.length === 2) {
      invariant(isPlainObject(id),
        'Id must be an object when passing 2 arguments'
      )
      entities = { [schema]: id }
    } else {
      invariant((typeof id === 'string' || typeof id === 'number') &&
        isPlainObject(body),
        'Id must be an object when passing 2 arguments'
      )
      entities = { [schema]: { [id]: body } }
    }
  }

  return {
    type: actions.MERGE,
    payload: entities
  }
}

export function remove(schema, id) {
  if (arguments.length === 0) return { type: actions.CLEAR }

  if (arguments.length === 1) {
    invariant(typeof schema === 'string' || Array.isArray(schema),
      'Schema must be a string or an array of strings'
    )

    return {
      type: actions.REMOVE_SCHEMAS,
      payload: typeof schema === 'string' ? [schema] : schema
    }
  }

  invariant(typeof schema === 'string',
    'Schema must be a string when passing two arguments'
  )

  invariant(typeof id === 'string' || typeof id === 'number' ||
            Array.isArray(id),
    'Id must be a string or a number, or an array of them'
  )

  return {
    type: actions.REMOVE_ENTITIES,
    payload: {
      schema,
      entities: Array.isArray(id) ? id : [id]
    }
  }
}
