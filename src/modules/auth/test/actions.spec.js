import expect from 'expect'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as actions from '../actions'

const middlewares = [ thunk ]

/*
 * Creates a mock of Redux store with middleware.
 */
function mockStore(getState, expectedActions, onLastAction) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
    throw new Error('onLastAction should either be undefined or function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()
        expect(action).toEqual(expectedAction)
        if (onLastAction && !expectedActions.length && typeof onLastAction === 'function') {
          onLastAction()
        }
        return action
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}

describe('Auth - actions', () => {
  it('logout should create a logout action', (done) => {
    const expectedActions = [
      {type: actions.LOGOUT_SUCCEEDED},
      { payload: { arg: '/login', method: 'push' }, type: '@@router/TRANSITION' }
    ];
    const store = mockStore({logged: true }, expectedActions, done)
    store.dispatch(actions.logout())
  })

})
