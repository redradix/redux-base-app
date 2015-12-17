import { RECEIVE_INGREDIENTS, REQUEST_INGREDIENTS } from '../actions/action'

// Reducers calculate a new state given the previous state and an action. They must be pure functions that return the exact same output for given inputs. They should also be free of side-effects. 
export default function (state = {
    isFetching: false,
    list: []
  }, action) {
  switch (action.type) {
    case REQUEST_INGREDIENTS:
      return Object.assign({}, state, {
        isFetching: true 
      })
    case RECEIVE_INGREDIENTS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload.list
      })
    default:
      return state
  }
}
