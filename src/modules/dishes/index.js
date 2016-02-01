import * as actions from './actions'
export * from './actions'

function dishList(state=[], action) {
  switch (action.type) {
    case actions.RECEIVE_DISHES:
      return action.payload
    case actions.RECEIVE_DISH:
      return state.map(dish =>
        dish.id == action.payload.id ?
          Object.assign({}, action.payload) :
          dish
      )
    case actions.EDIT_DISH:
      return state.map(dish =>
        dish.id == action.payload.id ?
          Object.assign({}, dish, action.payload) :
          dish
      )
    case actions.ADD_DISH:
      return [
        {
          ...action.payload,
          id: state.reduce((maxId, dish) => Math.max(dish.id, maxId), 0) + 1
        },
        ...state
      ]
    case actions.REMOVE_DISH:
      return state.filter(dish =>
        dish.id !== action.payload.id
      )
    default:
      return state
  }
}

// Reducers calculate a new state given the previous state and an action. They must be pure functions that return the exact same output for given inputs. They should also be free of side-effects.
export default function reducer(state = {
    isFetching: false,
    list: []
  }, action) {
  switch (action.type) {
    case actions.EDIT_DISH:
    case actions.REMOVE_DISH:
    case actions.ADD_DISH:
      return Object.assign({}, state, {
        list: dishList(state.list, action)
      })
    case actions.REQUEST_DISHES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case actions.RECEIVE_DISHES:
    case actions.RECEIVE_DISH:
      return Object.assign({}, state, {
        isFetching: false,
        list: dishList(state.list, action)
      })
    default:
      return state
  }
}
