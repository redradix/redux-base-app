import invariant from 'invariant'
import { isPlainObject } from 'lodash'
import * as actions from './action-types'

const isSchemaDictionary = (domainDictionary) =>
  isPlainObject(domainDictionary) && Object.keys(domainDictionary).reduce(
    (acc, sc) => acc && isPlainObject(domainDictionary[sc])
  , true)

export function merge(domain, id, body) {
  let entities = {}
  if (arguments.length === 1) {
    invariant(isSchemaDictionary(domain),
      'If a single argument is provided, it must be a dictionary of domains'
    )
    entities = domain
  } else if (arguments.length > 1) {
    invariant(typeof domain === 'string',
      `Schema must be a string when passing ${arguments.length} arguments`
    )
    if (arguments.length === 2) {
      invariant(isPlainObject(id),
        'Id must be an object when passing 2 arguments'
      )
      entities = { [domain]: id }
    } else {
      invariant((typeof id === 'string' || typeof id === 'number') &&
        isPlainObject(body),
        'Id must be an object when passing 2 arguments'
      )
      entities = { [domain]: { [id]: body } }
    }
  }

  return {
    type: actions.MERGE,
    payload: entities
  }
}

export function remove(domain, id) {
  if (arguments.length === 0) return { type: actions.CLEAR }

  if (arguments.length === 1) {
    invariant(typeof domain === 'string' || Array.isArray(domain),
      'Schema must be a string or an array of strings'
    )

    return {
      type: actions.REMOVE_DOMAINS,
      payload: typeof domain === 'string' ? [domain] : domain
    }
  }

  invariant(typeof domain === 'string',
    'Schema must be a string when passing two arguments'
  )

  invariant(typeof id === 'string' || typeof id === 'number' ||
            Array.isArray(id),
    'Id must be a string or a number, or an array of them'
  )

  return {
    type: actions.REMOVE_ENTITIES,
    payload: {
      domain,
      entities: Array.isArray(id) ? id : [id]
    }
  }
}
