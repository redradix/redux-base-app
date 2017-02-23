
import reducer from '../'
import * as actions from '../'

const DOMAIN = 'general'
const ANOTHER_DOMAIN = 'dashboard'

describe('Communication - reducer', () => {
  const initialState = {
    [DOMAIN]: {
      isReady: true
    }
  }

  it('Exports by default a reducer function', () => {
    expect(reducer).to.be.a('function')
  })

  it('should handle undefined initial state', () => {
    expect(reducer(undefined, {})).deep.equal({})
  })

  it('should handle initial state as a param', () => {
    expect(reducer(initialState, {})).equal(initialState)
  })

  it('should handle communication ATTEMPT of an existing domain', () => {
    const communicationState = reducer(initialState, {type: actions.ATTEMPT, meta: {domain: [DOMAIN]}})
    expect(communicationState[DOMAIN].isReady).to.equals(false)
  })

  it('should handle communication ATTEMPT of a new domain', () => {
    const communicationState = reducer(initialState, {type: actions.ATTEMPT, meta: {domain: [ANOTHER_DOMAIN]}})
    expect(communicationState[ANOTHER_DOMAIN].isReady).to.equals(false)
  })

  it('should handle communication SUCCESS of an existing domain', () => {
    const communicationState = reducer(initialState, {type: actions.SUCCESS, meta: {domain: [DOMAIN]}})
    expect(communicationState[DOMAIN].isReady).to.equals(true)
  })

  it('should handle communication ERROR of an existing domain', () => {
    const error = 'Something went wrong'
    const communicationState = reducer(initialState, {type: actions.ERROR, error: true, payload: {error}, meta: {domain: [DOMAIN]}})
    expect(communicationState[DOMAIN].isReady).to.equals(false)
    expect(communicationState[DOMAIN].error).to.equals(error)
  })
})
