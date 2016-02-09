import * as actions from './actions'
export * from './actions'

export default function reducer(state={
    autocomplete: {}
  }, action) {
  switch (action.type) {
    case actions.SELECTED_ITEM_ON_AUTOCOMPLETE:
      return Object.assign({}, state, {
        autocomplete: {
          [action.payload.ref]: action.payload.item
        }
      })
    default:
      return state
  }
}
