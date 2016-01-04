import { CREATE_NOTIFICATIONS} from '../actions/notifications'

export default function(state=[], action) {
  switch (action.type) {
    case CREATE_NOTIFICATIONS:
      return action.payload
    default:
      return state
  }  
}
