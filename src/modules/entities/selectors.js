import invariant from 'invariant'
import { moduleName } from './constants'

/**
 * @overview Entities module - Selectors
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

const getState = (state) => state[moduleName]

const getDomain = (state, domain) => state[moduleName][domain] || {}

function getDomains(state, domains) {
  const domainDictionary = getState(state)
  if (!domains) return domainDictionary

  return domains.reduce(
    (acc, s) => Object.assign(acc, { [s]: domainDictionary[s] || {} })
  , {})
}

function getEntities(state, domain, ids) {
  const entityDictionary = getDomain(state, domain)
  if (typeof ids === 'string' || typeof ids === 'number') return entityDictionary[ids]

  const arr = Array.isArray(ids) ? ids : Object.keys(entityDictionary)
  const testFn = typeof ids === 'function' ? ids : e => e && ids.includes(e.id)

  return arr.reduce(
    (acc, id) => testFn(entityDictionary[id]) ?
      Object.assign(acc, { [id]: entityDictionary[id] }) : acc
  , {})
}

export function get(state, domain, id) {
  if (arguments.length < 3) {

    invariant(!domain || typeof domain === 'string' || Array.isArray(domain),
      'Domain must be a string or an array of strings'
    )

    return typeof domain === 'string' ? getDomain(state, domain) :
                                        getDomains(state, domain)
  }

  invariant(typeof domain === 'string',
    'Domain must be a string when passing three arguments'
  )

  invariant(typeof id === 'string' || typeof id === 'number' ||
            Array.isArray(id) || typeof id === 'function',
    'Id must be a string or a number, or array of them, or a function'
  )

  return getEntities(state, domain, id)
}
