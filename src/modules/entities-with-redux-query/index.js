import { queriesReducer } from 'redux-query'
import entitiesReducer from 'modules/entities'
export * from './constants'
export * from './selectors'

/**
 * @overview Entities module's initial state and reducer with superpowers
 * (i.e. redux-query)
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

const initialState = {}

export default function entitiesReducerWithReduxQuery(state = initialState, action) {
  return {
    ...entitiesReducer(state, action),
    queries: queriesReducer(state.queries, action)
  }
}
