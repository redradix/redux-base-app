import { moduleName } from './constants'

export const getEntityIds = (s, schema) => {
  const state = s[moduleName] || {}
  return Object.keys(state[schema])
}

export const getEntityList = (s, schema) => {
  const state = s[moduleName] || {}
  return Object.keys(state[schema]).map(id => state[schema][id])
}

export const getEntity = (s, schema, id) => {
  const state = s[moduleName] || {}
  return state[schema] ? state[schema][id] : void 0
}
