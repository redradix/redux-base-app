import * as actions from './actions'
export * from './actions'

export default function reducer(state=[], action) {
  switch (action.type) {
    case actions.CREATE_NOTIFICATIONS:
      return action.payload
    default:
      return state
  }
}
