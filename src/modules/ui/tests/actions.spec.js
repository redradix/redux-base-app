import * as actionTypes from '../action-types'
import * as actions from '../actions'

describe('UI - actions', () => {
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
  it('should create a setUIElements action', () => {
    expect(actions.setUIElements(DOMAIN, domains.calendar)).to.deep.equal({
      type: `${actions.MERGE}*${DOMAIN}`,
      payload: {elements: domains[DOMAIN]},
      meta: {domain: DOMAIN}
    })
  })

  it('should create a setDomainUIElement action', () => {
    expect(actions.setUIElement(DOMAIN, 'viewMode', 'list')).to.deep.equal({
      type: `${actions.MERGE}*${DOMAIN}`,
      payload: {elements: {viewMode: 'list'}},
      meta: {domain: DOMAIN}
    })
  })

  it('should create a toggleUIElement taction', () => {
    expect(actions.toggleUIElement(DOMAIN, 'viewMode', 'list')).to.deep.equal({
      type: `${actions.TOGGLE}*${DOMAIN}`,
      payload: {key: 'viewMode', value: 'list'},
      meta: {domain: DOMAIN}
    })
  })

  it('should create a deleteUIElements action', () => {
    expect(actions.deleteUIElements(DOMAIN, ['viewMode'])).to.deep.equal({
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

  it('should create a resetUIElements action', () => {
    expect(actions.resetUI()).to.deep.equal({
      type: actions.RESET_UI
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
