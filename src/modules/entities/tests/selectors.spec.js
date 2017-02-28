import * as selectors from '../'

const DOMAIN = 'users'

describe('Entities - Selectors: ', () => {
  const state = {
    entities: {
      users: {
        1: {id: 1, name: 'User one'},
        4: {id: 4, name: 'User four'},
        5: {id: 5, name: 'User five'}
      },
      companies: {
        1: {id: 1, name: 'Redradix'},
        3: {id: 3, name: 'Favmonster'}
      }
    }
  }
  it('gets the entity of a domain with the specified id', () => {
    expect(selectors.getEntity).to.be.a('function')
    expect(selectors.getEntity(state, DOMAIN, 1)).to.equals(state.entities.users[1])
  })

  it('gets the entity of a domain an return defaultValue if it does not exists', () => {
    expect(selectors.getEntity(state, DOMAIN, 28, {})).to.deep.equals({})
  })

  it('gets all entites of a domain', () => {
    expect(selectors.getEntity).to.be.a('function')
    expect(selectors.getEntities(state, DOMAIN)).to.equals(state.entities.users)
  })

})
