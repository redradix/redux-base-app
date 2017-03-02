import { generateReducer } from 'core/utils'
import * as actions from './action-types'
export * from './constants'
export * from './actions'
export * from './selectors'

/**
 * @overview Data module's initial state and reducer
 * @version 0.1.0
 * @author Aaron Contreras <aaron@redradix.com>
 */

const initialState = {}

const reducer = generateReducer({
  [actions.SET]: (state, { payload: { key, value } }) => ({ ...state, [key]: value }),
  [actions.CLEAR]: (state, { payload: { key } }) => ({ ...state, [key]: void 0 })
}, initialState)

export default reducer
