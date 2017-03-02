import { merge } from 'lodash'
import { generateReducer } from 'core/utils'
import * as actions from './action-types'
export * from './constants'
export * from './actions'
export * from './selectors'

const initialState = {}

const reducer = generateReducer({
  [actions.ATTEMPT]: (state, {meta: {domain}}) => ({...state, [domain]: merge({}, state[domain], {isReady: false})}),
  [actions.SUCCESS]: (state, {meta: {domain}}) => ({...state, [domain]: merge({}, state[domain], {isReady: true})}),
  [actions.ERROR]: (state, {meta: {domain}, payload: {error}}) => ({...state, [domain]: merge({}, state[domain], {isReady: false, error})})
}, initialState)

export default reducer
