import expect from 'expect'
import nock from 'nock'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../../../middleware/api'
import * as actions from '../actions'
import config from '../../../config'

const middlewares = [ thunk , api ]


// ------- MOCKS
//
/*
 * Returns a nock header to mock API reqs
 */
function getMockedAPIRequest(headers) {
  return nock(config.api, headers);
}

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
        if (onLastAction && !expectedActions.length) {
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

// -------- TESTS

describe('Auth - actions', () => {
  it('checkLogged should create a replace path action if it is', (done) => {
    const expectedActions = [
      { payload: { args: ['/'], method: 'replace' }, type: '@@router/TRANSITION' }
    ];
    const store = mockStore({auth: {logged: true}}, expectedActions, done)
    store.dispatch(actions.checkLogged())
  })

  it('checkLogged should not create any replace path action if it isnt', (done) => {
    const expectedActions = [ ];
    const store = mockStore({auth: {logged: false}}, expectedActions, done)
    store.dispatch(actions.checkLogged((x) => x))
    done();
  })

  it('validateToken should create an attempt action', (done) => {
    getMockedAPIRequest({reqHeaders: {'authorization': 'Bearer madeUpToken'}})
      .get('/session')
      .reply(200, {
        type: 'session',
        data: {
          token: 'madeUpToken'
        }
      });
    const expectedActions = [
      {type: actions.TOKEN_VALIDATION_ATTEMPTED, authenticated: true},
      {type: actions.TOKEN_VALIDATION_SUCCEEDED, payload: {token: 'madeUpToken'}, authenticated: true}
    ];
    const store = mockStore({auth: {logged: false, session: {}}}, expectedActions, done)
    store.dispatch(actions.validateToken())
  })

  it('logout should create a logout action and a router transition', (done) => {
    const expectedActions = [
      {type: actions.LOGOUT_SUCCEEDED},
      { payload: { args: ['/login'], method: 'push' }, type: '@@router/TRANSITION' }
    ];
    const store = mockStore({auth: {logged: false}}, expectedActions, done)
    store.dispatch(actions.logout())
  })

  it('login should create a login attempt action and a router transition', (done) => {
    getMockedAPIRequest()
      .post('/session')
      .reply(200, {
        type: 'session',
        data: {
          token: 'madeUpToken'
        }
      });
    const expectedActions = [
      {type: actions.LOGIN_ATTEMPTED, authenticated: undefined},
      {type: actions.LOGIN_SUCCEEDED, payload: {token: 'madeUpToken'}, authenticated: undefined},
      { payload: { args: ['/'], method: 'push' }, type: '@@router/TRANSITION' }
    ];
    const store = mockStore({auth: {logged: false}}, expectedActions, done)
    store.dispatch(actions.login({username: 'admin', password: 'admin'}))
  })

  it('login should create a login attempt action and a fail action when it fails', (done) => {
    getMockedAPIRequest()
      .post('/session')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
    const expectedActions = [
      {type: actions.LOGIN_ATTEMPTED, authenticated: undefined},
      {type: actions.LOGIN_FAILED, error: 'error'}
    ];
    const store = mockStore({auth: {logged: false}}, expectedActions, done)
    store.dispatch(actions.login({username: 'admin3', password: 'admin'}))
  })

  it('register should create a register attempt action and a router transition', (done) => {
    getMockedAPIRequest()
      .post('/register')
      .reply(200, {
        type: 'session',
        data: {
          token: 'madeUpToken'
        }
      });
    const expectedActions = [
      {type: actions.REGISTER_ATTEMPTED, authenticated: undefined},
      {type: actions.REGISTER_SUCCEEDED, payload: {token: 'madeUpToken'}, authenticated: undefined},
      { payload: { args: ['/'], method: 'push' }, type: '@@router/TRANSITION' }
    ];
    const store = mockStore({auth: {logged: false}}, expectedActions, done)
    store.dispatch(actions.register({username: 'admin2', password: 'admin'}))
  })

  it('register should create a register attempt action and a fail action if it fails', (done) => {
    getMockedAPIRequest()
      .post('/register')
      .reply(404, {errors: [{message: 'error'}], message: 'error'});
      //.reply(500, {errors: [] });
    const expectedActions = [
      {type: actions.REGISTER_ATTEMPTED, authenticated: undefined},
      {type: actions.REGISTER_FAILED, error: 'error'}
    ];
    const store = mockStore({auth: {logged: false}}, expectedActions, done)
    store.dispatch(actions.register({username: 'admin', password: 'admin'}))
  })
})
