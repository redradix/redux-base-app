import * as actions from '../'

describe('Communication - actions', () => {
  const domain = 'general'
  it('should create a communication attempt action', () => {
    expect(actions.commAttempt(domain)).to.deep.equal({
      type: actions.ATTEMPT,
      meta: {domain}
    })
  })

  it('should create a communication success action', () => {
    expect(actions.commSuccess(domain)).to.deep.equal({
      type: actions.SUCCESS,
      meta: {domain}
    })
  })

  it('should create a communication error action', () => {
    const error = 'Something went wrong'
    expect(actions.commError(domain, error)).to.deep.equal({
      type: actions.ERROR,
      meta: {domain},
      error: true,
      payload: {error}
    })
  })
})
