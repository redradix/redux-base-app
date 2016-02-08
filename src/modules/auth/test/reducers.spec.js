import expect from 'expect'
import reducer from '../index'
import * as actions from '../actions'

const initialState = {
  logged: false,
  loging: false,
  registering: false,
  session: {
    username: undefined,
    email: undefined
  }
}

describe('reducers', () => {
  describe('auth', () => {
    it('should handle initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should handle LOGIN_ATTEMPTED', () => {
      expect(reducer(initialState, {type: actions.LOGIN_ATTEMPTED}).loging).toEqual(true);
    })

    it('should handle LOGIN_FAILED', () => {
      const state = Object.assign({}, initialState, {loging: true});
      expect(reducer(state, {type: actions.LOGIN_FAILED}).loging).toEqual(false);
    })

    it('should handle LOGIN_SUCCEDED', () => {
      const state = Object.assign({}, initialState, {loging: true});
      expect(reducer(state, {type: actions.LOGIN_SUCCEEDED}).loging).toEqual(false);
      expect(reducer(state, {type: actions.LOGIN_SUCCEEDED}).logged).toEqual(true);
      expect(reducer(state, {type: actions.LOGIN_SUCCEEDED, payload:{user: 'user'}}).session)
        .toNotEqual({});
    })

    it('should handle LOGOUT_SUCCEEDED', () => {
      const state = Object.assign({}, initialState, {logged: true});
      expect(reducer(state, {type: actions.LOGOUT_SUCCEEDED}).loging).toEqual(false);
      expect(reducer(state, {type: actions.LOGOUT_SUCCEEDED}).logged).toEqual(false);
      expect(reducer(state, {type: actions.LOGOUT_SUCCEEDED}).session).toEqual({});
    })

    it('should handle TOKEN_VALIDATION_FAILED', () => {
      const state = Object.assign({}, initialState, {logged: true});
      expect(reducer(state, {type: actions.TOKEN_VALIDATION_FAILED}).logged).toEqual(false);
    })

    it('should handle TOKEN_VALIDATION_SUCCEEDED', () => {
      const state = Object.assign({}, initialState, {logged: true});
      expect(reducer(state, {type: actions.TOKEN_VALIDATION_SUCCEEDED}).logged).toEqual(true);
      expect(reducer(state, {type: actions.TOKEN_VALIDATION_SUCCEEDED, payload:{user: 'user'}}).session)
        .toNotEqual({});
    })

    it('should handle REGISTER_ATTEMPTED', () => {
      const state = Object.assign({}, initialState, {logged: false});
      expect(reducer(state, {type: actions.REGISTER_ATTEMPTED}).registering).toEqual(true);
    })

    it('should handle REGISTER_FAILED', () => {
      const state = Object.assign({}, initialState, {logged: false});
      expect(reducer(state, {type: actions.REGISTER_FAILED}).registering).toEqual(false);
    })

    it('should handle REGISTER_SUCCEEDED', () => {
      const state = Object.assign({}, initialState, {logged: false});
      expect(reducer(state, {type: actions.REGISTER_SUCCEEDED}).registering).toEqual(false);
      expect(reducer(state, {type: actions.REGISTER_SUCCEEDED}).logged).toEqual(true);
      expect(reducer(state, {type: actions.REGISTER_SUCCEEDED, payload:{user: 'user'}}).session)
        .toNotEqual({});
    })

  })
})
