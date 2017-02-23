import * as actionTypes from '../action-types'
import * as actions from '../actions'

describe('Entities - actions', () => {
  const domains = {
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
  it('should create a merge entities action', () => {
    expect(actions.mergeEntities(domains)).to.deep.equal({
      type: actionTypes.MERGE,
      payload: {domains}
    })
  })

  it('should create a merge entity action', () => {
    expect(actions.mergeEntity('users', domains.users)).to.deep.equal({
      type: actionTypes.MERGE,
      payload: {domains: {users: domains.users}}
    })
  })

  it('should create a remove entities action from multiple keys', () => {
    expect(actions.unsetEntities('users', Object.keys(domains.users))).to.deep.equal({
      type: actionTypes.UNSET,
      payload: {domain: 'users', keys: Object.keys(domains.users)}
    })
  })

  it('should create a remove entities action from one key', () => {
    expect(actions.unsetEntity('users', Object.keys(domains.users)[0])).to.deep.equal({
      type: actionTypes.UNSET,
      payload: {domain: 'users', keys: [Object.keys(domains.users)[0]]}
    })
  })

  it('should create a clear entities action ', () => {
    expect(actions.clearAllEntities()).to.deep.equal({
      type: actionTypes.CLEAR
    })
  })
})
