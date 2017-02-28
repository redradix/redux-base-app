import * as actionTypes from '../action-types'
import * as actions from '../actions'

describe('Filters - actions', () => {
  const DOMAIN = 'calendar'
  const domains = {
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
  it('should create a setDomainFilters action', () => {
    expect(actions.setDomainFilters(DOMAIN, domains.calendar)).to.deep.equal({
      type: `${actions.MERGE}*${DOMAIN}`,
      payload: {elements: domains[DOMAIN]},
      meta: {domain: DOMAIN}
    })
  })

  it('should create a setDomainFilter action', () => {
    expect(actions.setDomainFilter(DOMAIN, 'viewMode', 'list')).to.deep.equal({
      type: `${actions.MERGE}*${DOMAIN}`,
      payload: {elements: {viewMode: 'list'}},
      meta: {domain: DOMAIN}
    })
  })

  it('should create a toggleDomainFilter action', () => {
    expect(actions.toggleDomainFilter(DOMAIN, 'viewMode', 'list')).to.deep.equal({
      type: `${actions.TOGGLE}*${DOMAIN}`,
      payload: {key: 'viewMode', value: 'list'},
      meta: {domain: DOMAIN}
    })
  })

  it('should create a deleteDomainFilters action', () => {
    expect(actions.deleteDomainFilters(DOMAIN, ['viewMode'])).to.deep.equal({
      type: `${actions.DELETE}*${DOMAIN}`,
      payload: {keys: ['viewMode']},
      meta: {domain: DOMAIN}
    })
  })

  it('should create a ClearDomain action', () => {
    expect(actions.clearDomain(DOMAIN)).to.deep.equal({
      type: `${actions.CLEAR_DOMAIN}*${DOMAIN}`,
      meta: {domain: DOMAIN}
    })
  })

  it('should create a resetFilters action', () => {
    expect(actions.resetFilters()).to.deep.equal({
      type: actions.RESET_FILTERS
    })
  })

  xit('should create a remove entities action from multiple keys', () => {
    expect(actions.unsetEntities('users', Object.keys(domains.users))).to.deep.equal({
      type: actionTypes.UNSET,
      payload: {domain: 'users', keys: Object.keys(domains.users)}
    })
  })

  xit('should create a remove entities action from one key', () => {
    expect(actions.unsetEntity('users', Object.keys(domains.users)[0])).to.deep.equal({
      type: actionTypes.UNSET,
      payload: {domain: 'users', keys: [Object.keys(domains.users)[0]]}
    })
  })

  xit('should create a clear entities action ', () => {
    expect(actions.clearAllEntities()).to.deep.equal({
      type: actionTypes.CLEAR
    })
  })
})
