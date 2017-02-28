import { generateReducer } from 'core/utils'
import * as actions from './action-types'
export * from './constants'
export * from './actions'
export * from './selectors'

/**
 * @overview Entities module's initial state and reducer
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

const initialState = {}

const reducer = generateReducer({
  [actions.MERGE]: (state, { payload }) => Object.assign({}, state, payload)
}, initialState)

export default reducer
