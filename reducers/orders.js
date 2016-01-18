import { REQUEST_ORDER, RECEIVE_ORDER, ADD_ORDER, RECEIVE_ORDERS, REQUEST_ORDERS, EDIT_ORDER, REMOVE_ORDER } from '../actions/orders'

function orderList(state=[], action) {
  switch (action.type) {
    case RECEIVE_ORDER:
      return state.map(order=>
        order.id == action.payload.id ?
          Object.assign({}, action.payload) :
          order 
      )
    case RECEIVE_ORDERS:
      return action.payload 
    case EDIT_ORDER:
      return state.map(order =>
        order.id == action.payload.id ?
          Object.assign({}, order, action.payload) : 
          order
      )
    case ADD_ORDER:
      return [
        {
          ...action.payload,
          id: state.reduce((maxId, order) => Math.max(order.id, maxId), 0) + 1
        },
        ...state
      ]
    case REMOVE_ORDER:
      return state.filter(order =>
        order.id !== action.payload.id
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
    case EDIT_ORDER:
    case REMOVE_ORDER:
    case ADD_ORDER:
      return Object.assign({}, state, {
        list: orderList(state.list, action)
      })
    case REQUEST_ORDERS:
    case REQUEST_ORDER:
      return Object.assign({}, state, {
        isFetching: true 
      })
    case RECEIVE_ORDERS:
    case RECEIVE_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        list: orderList(state.list, action)
      })
    default:
      return state
  }
}
