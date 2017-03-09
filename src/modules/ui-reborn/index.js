import { fromJS } from 'immutable'
import * as actions from './action-types'
export * from './constants'
export * from './actions'
export * from './selectors'

const initialState = {}

function reducer(state = initialState, action) {
  switch (action.type) {
  case actions.SET:
    return state.set(action.payload.path, action.payload.value)
  case actions.SETIN:
    return state.setIn(action.payload.path, action.payload.value)
  case actions.MERGE:
    return state.merge(action.payload.path, action.payload.value)
  case actions.MERGEIN:
    return state.mergeIn(action.payload.path, action.payload.value)
  case actions.DELETE:
    return state.delete(action.payload.path, action.payload.value)
  case actions.DELETEIN:
    return state.deleteIn(action.payload.path, action.payload.value)
  case actions.TOGGLE:
    return state.update(action.payload.path, action.payload.value)
  case actions.TOGGLEIN:
    return state.updateIn(action.payload.path, action.payload.value)
  default:
    return fromJS(state)
  }
}

export default reducer
