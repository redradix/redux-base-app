import * as actions from './actions'
export * from './actions'

function orderList(state=[], action) {
  switch (action.type) {
    case actions.RECEIVE_ORDER:
      return state.map(order=>
        order.id == action.payload.id ?
          Object.assign({}, action.payload) :
          order
      )
    case actions.RECEIVE_ORDERS:
      return action.payload
    case actions.EDIT_ORDER:
      return state.map(order =>
        order.id == action.payload.id ?
          Object.assign({}, order, action.payload) :
          order
      )
    case actions.ADD_ORDER:
      return [
        {
          ...action.payload,
          id: state.reduce((maxId, order) => Math.max(order.id, maxId), 0) + 1
        },
        ...state
      ]
    case actions.REMOVE_ORDER:
      return state.filter(order =>
        order.id !== action.payload.id
      )
    default:
      return state
  }
}

export default function reducer(state = {
    isFetching: false,
    list: []
  }, action) {
  switch (action.type) {
    case actions.EDIT_ORDER:
    case actions.REMOVE_ORDER:
    case actions.ADD_ORDER:
      return Object.assign({}, state, {
        list: orderList(state.list, action)
      })
    case actions.REQUEST_ORDERS:
    case actions.REQUEST_ORDER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case actions.RECEIVE_ORDERS:
    case actions.RECEIVE_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        list: orderList(state.list, action)
      })
    default:
      return state
  }
}
