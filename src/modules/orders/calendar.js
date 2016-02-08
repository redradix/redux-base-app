// calendar.js
import * as actions from './actions'

export default function reducer(state = {
    currentDate:      null,
    initialRangeDate: null,
    selected:         null,
  }, action) {
  switch (action.type) {
    case actions.CALENDAR_SET_CURRENT_DATE:
      return Object.assign({}, state, {
        currentDate: action.date
      })
      break;
    case actions.CALENDAR_SET_INITIAL_RANGE_DATE:
      return Object.assign({}, state, {
        initialRangeDate: action.date
      })
      break;
    case actions.CALENDAR_ADD_SELECTED_RANGE:
      return Object.assign({}, state, {
        initialRangeDate: null,
        selected: action.range
      })
      break;
    case actions.CALENDAR_REMOVE_SELECTED_RANGE:
      return Object.assign({}, state, {
        selected: null
      })
      break;
    default:
     return state;
  }
}