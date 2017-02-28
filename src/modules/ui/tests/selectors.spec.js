import * as selectors from '../'

describe('UI - Selectors: ', () => {
  const DOMAIN = 'calendar'
  const state = {
    ui: {
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
  it('gets the ui elements of the given keys under a domains', () => {
    expect(selectors.getUIElements).to.be.a('function')
    expect(selectors.getUIElements(state, DOMAIN, ['viewMode', 'legendOpen'])).to.deep.equals({viewMode: 'list', legendOpen: true})
  })

  it('gets the ui element of the given key under a domain', () => {
    expect(selectors.getUIElement).to.be.a('function')
    expect(selectors.getUIElement(state, DOMAIN, 'legendOpen')).to.equals(true)
  })

  it('gets the default value of a ui element of the given key under a domain if the ui element is undefined', () => {
    expect(selectors.getUIElement).to.be.a('function')
    expect(selectors.getUIElement(state, DOMAIN, 'nonExistingUIElement', 4)).to.equals(4)
  })

  it('gets all the ui elements of a domain', () => {
    expect(selectors.getUIDomain).to.be.a('function')
    expect(selectors.getUIDomain(state, DOMAIN)).to.deep.equals({
      viewMode: 'list',
      legendOpen: true,
      keyEvents: {1: {}, 2: {}, 3: {}, 4: {}}
    })
  })

})
