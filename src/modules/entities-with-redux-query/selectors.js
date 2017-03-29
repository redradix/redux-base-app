import { getEntities } from 'modules/entities'

// Expose getEntities to be used when setting up the middleware
export { getEntities } from 'modules/entities'

export const getQueries = (state) => getEntities(state, 'queries')
