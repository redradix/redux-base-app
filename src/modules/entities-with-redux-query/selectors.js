import { get } from 'modules/entities'

// Expose getEntities to be used when setting up the middleware
export const getEntities = get

export const getQueries = (state) => get(state, 'queries')
