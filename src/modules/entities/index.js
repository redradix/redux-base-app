import { generateReducer } from 'utils/utils'
import { merge } from 'lodash'
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
  [actions.REPLACE]: (state, { payload }) => Object.assign({}, state, payload),
  [actions.MERGE]: (state, { payload }) => merge({}, state, payload)
}, initialState)

export default reducer
