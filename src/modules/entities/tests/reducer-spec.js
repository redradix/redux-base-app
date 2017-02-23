import reducer from '../index'
import * as actions from '../action-types'

describe('Entities - reducer', () => {
  const initialState = {
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

  it('Exports by default a reducer function', () => {
    expect(reducer).to.be.a('function')
  })

  it('should handle undefined initial state', () => {
    expect(reducer(undefined, {})).deep.equal({})
  })

  it('should handle initial state as a param', () => {
    expect(reducer(initialState, {})).equal(initialState)
  })

  it('should handle MERGE of entities under a domain keeping the existing ones', () => {
    const moreUsers = {
      users: {
        2: {id: 2, name: 'User two'},
        3: {id: 3, name: 'User three'}
      }
    }
    const entities = reducer(initialState, {type: actions.MERGE, payload: {domains: moreUsers}})
    expect(Object.keys(entities.users).length).to.equals(5)
  })

  it('should handle MERGE of multiple domains', () => {
    const moreEntities = {
      users: {
        2: {id: 2, name: 'User two'},
        3: {id: 3, name: 'User three'}
      },
      posts: {
        2: {id: 2, name: 'Post two'},
        3: {id: 3, name: 'Post three'}
      }
    }
    const entities = reducer(initialState, {type: actions.MERGE, payload: {domains: moreEntities}})
    expect(Object.keys(entities).length).to.equals(3)
    expect(Object.keys(entities.posts).length).to.equals(2)
  })

  it('should handle UNSET of multiple entities of a domain', () => {
    const existingUsers = [1, 5]
    const entities = reducer(initialState, {type: actions.UNSET, payload: {domain: 'users', keys: existingUsers}})
    expect(Object.keys(entities.users).length).to.equals(1)
  })

  it('should handle UNSET_ALL entities of a domain', () => {
    const entities = reducer(initialState, {type: actions.UNSET_ALL, payload: {domain: 'users'}})
    expect(entities.users).to.equals(undefined)
  })

  it('should handle CLEAR all domains', () => {
    const entities = reducer(initialState, {type: actions.CLEAR})
    expect(Object.keys(entities).length).to.equals(0)
  })
})
