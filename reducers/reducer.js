import { ACTION } from '../actions/reducer_actions'

// Reducers calculate a new state given the previous state and an action. They must be pure functions that return the exact same output for given inputs. They should also be free of side-effects. 
export default function (state = 0, action) {
  switch (action.type) {
    case ACTION:
      return state
    default:
      return state
  }
}
