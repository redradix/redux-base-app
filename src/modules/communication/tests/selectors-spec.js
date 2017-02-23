import * as selectors from '../'

const DOMAIN = 'general'
const ANOTHER_DOMAIN = 'dashboard'

describe('Communication - Selectors: ', () => {
  const state = {
    communication: {
      [DOMAIN]: {
        isReady: false
      }
    }
  }
  it('gets the communication state of a domain', () => {
    expect(selectors.getCommState).to.be.a('function')
    expect(selectors.getCommState(state, DOMAIN)).to.equals(false)
  })

  it('gets the communication state of a domain an return defaultValue if domain is undefined', () => {
    expect(selectors.getCommState).to.be.a('function')
    expect(selectors.getCommState(state, ANOTHER_DOMAIN, true)).to.equals(true)
  })
})
