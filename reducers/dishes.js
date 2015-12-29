import { ADD_DISH, RECEIVE_DISHES, REQUEST_DISHES, EDIT_DISH, REMOVE_DISH } from '../actions/dishes'

function dishList(state=[], action) {
  switch (action.type) {
    case RECEIVE_DISHES:
      return action.payload.list 
    case EDIT_DISH:
      return state.map(dish =>
        dish.id == action.payload.id ?
          Object.assign({}, dish, action.payload) : 
          dish
      )
    case ADD_DISH:
      return [
        {
          ...action.payload,
          id: state.reduce((maxId, dish) => Math.max(dish.id, maxId), 0) + 1
        },
        ...state
      ]
    case REMOVE_DISH:
      return state.filter(dish =>
        dish.id !== action.payload.id
      )    
    default:
      return state
  }
}

// Reducers calculate a new state given the previous state and an action. They must be pure functions that return the exact same output for given inputs. They should also be free of side-effects. 
export default function (state = {
    isFetching: false,
    list: []
  }, action) {
  switch (action.type) {
    case EDIT_DISH:
    case REMOVE_DISH:
    case ADD_DISH:
      return Object.assign({}, state, {
        list: dishList(state.list, action)
      })
    case REQUEST_DISHES:
      return Object.assign({}, state, {
        isFetching: true 
      })
    case RECEIVE_DISHES:
      return Object.assign({}, state, {
        isFetching: false,
        list: dishList(state.list, action)
      })
    default:
      return state
  }
}
