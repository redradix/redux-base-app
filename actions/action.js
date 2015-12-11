export const ACTION = 'ACTION'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export function action() {
  return {
    type: ACTION 
  }
}


export function conditionalAction() {
  return (dispatch, getState) => {
    if (false) {
      return
    }
    dispatch(action())
  }
}

export function asyncAction(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(action())
    }, delay)
  }
}

