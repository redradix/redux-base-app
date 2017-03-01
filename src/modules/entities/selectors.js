import { createSelector } from 'reselect'
import { moduleName } from './constants'

export const getEntities = (state, domain) => state[moduleName][domain] || {}

export const getEntityIds = createSelector(
  getEntities,
  entities => Object.keys(entities)
)

export const getEntityList = createSelector(
  getEntities,
  entities => Object.keys(entities).map(id => entities[id])
)

export const getEntitiy = createSelector(
  getEntities,
  (state, domain, id) => id,
  (entities, id) => entities[id]
)
