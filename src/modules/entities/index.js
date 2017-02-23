import * as actions from './action-types'
export * from './actions'
export * from './selectors'
import {omit, merge} from 'lodash'
import { generateReducer } from 'core/utils'

const ACTIONS = {
  [actions.MERGE]: (state, {payload: {domains}}) => merge({}, state, domains),
  [actions.UNSET]: (state, {payload: {domain, keys}}) => ({...state, [domain]: omit(state[domain], keys)}),
  [actions.UNSET_ALL]: (state, {payload: {domain}}) => omit(state, domain),
  [actions.CLEAR]: (state) => omit({}, state)
}

export default generateReducer(ACTIONS)
