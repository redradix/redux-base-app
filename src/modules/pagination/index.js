import * as actions from './action-types'
export * from './actions'
export * from './selectors'
import {merge, omit, assign} from 'lodash'
import { generateReducer } from 'core/utils'

const ACTIONS = {
  [actions.MERGE]: (state, {entities}) => merge({}, state, entities),
  [actions.UNSET]: (state, {domains}) => omit({}, state, domains),
  [actions.REMOVE]: (state, {domain, ids}) => assign({}, state, {domain: omit(state[domain], ids)}),
  [actions.CLEAR]: (state) => omit({}, state)
}

export default generateReducer(ACTIONS)
