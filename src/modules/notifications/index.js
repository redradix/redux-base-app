import { CREATE_NOTIFICATIONS} from '../../actions/notifications'

export default function reducer(state=[], action) {
  switch (action.type) {
    case CREATE_NOTIFICATIONS:
      return action.payload
    default:
      return state
  }
}
