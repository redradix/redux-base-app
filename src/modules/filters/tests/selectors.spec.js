import * as selectors from '../'

describe('Filters - Selectors: ', () => {
  const DOMAIN = 'calendar'
  const state = {
    filters: {
      calendar: {
        viewMode: 'list',
        legendOpen: true,
        keyEvents: {1: {}, 2: {}, 3: {}, 4: {}}
      },
      userList: {
        deleteUserModal: true,
        viewMode: 'list'
      }
    }
  }
  it('gets the filters of the given keys under a domains', () => {
    expect(selectors.getFilterElements).to.be.a('function')
    expect(selectors.getFilterElements(state, DOMAIN, ['viewMode', 'legendOpen'])).to.deep.equals({viewMode: 'list', legendOpen: true})
  })

  it('gets the filter of the given key under a domain', () => {
    expect(selectors.getFilterElement).to.be.a('function')
    expect(selectors.getFilterElement(state, DOMAIN, 'legendOpen')).to.equals(true)
  })

  it('gets the default value of a filter of the given key under a domain if the filter is undefined', () => {
    expect(selectors.getFilterElement).to.be.a('function')
    expect(selectors.getFilterElement(state, DOMAIN, 'nonExistingFilter', 4)).to.equals(4)
  })

  it('gets all the filters of a domain', () => {
    expect(selectors.getFiltersDomain).to.be.a('function')
    expect(selectors.getFiltersDomain(state, DOMAIN)).to.deep.equals({
      viewMode: 'list',
      legendOpen: true,
      keyEvents: {1: {}, 2: {}, 3: {}, 4: {}}
    })
  })

})
