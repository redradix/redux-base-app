import reducer from '../index'
import * as actions from '../action-types'

describe('Filters - reducer', () => {
  const DOMAIN = 'calendar'
  const initialState = {
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

  it('Exports by default a reducer function', () => {
    expect(reducer).to.be.a('function')
  })

  it('should handle undefined initial state', () => {
    expect(reducer(undefined, {})).deep.equal({})
  })

  it('should handle initial state as a param', () => {
    expect(reducer(initialState, {})).equal(initialState)
  })

  it('should handle MERGE of filters under a domain keeping the existing ones', () => {
    const moreCalendarFilters = {
      showBankHolidays: false
    }
    const filters  = reducer(initialState, {type: actions.MERGE, payload: {elements: moreCalendarFilters }, meta: {domain: DOMAIN}})
    expect(Object.keys(filters.calendar).length).to.equals(4)
  })

  it('should handle TOGGLE of filters under a domain keeping the existing ones', () => {
    const viewModeFilter = {
      key: 'viewMode'
    }
    const filters = reducer(initialState, {type: actions.TOGGLE, payload: viewModeFilter, meta: {domain: DOMAIN}})
    expect(filters.calendar.viewMode).to.equals(undefined)
  })

  it('should handle TOGGLE of filters under a domain keeping the existing ones', () => {
    const viewModeFilter = {
      key: 'nonExistingFilter'
    }
    const filters = reducer(initialState, {type: actions.TOGGLE, payload: viewModeFilter, meta: {domain: DOMAIN}})
    expect(filters.calendar.nonExistingFilter).to.equals(true)
  })

  it('should handle TOGGLE of filters under a domain keeping the existing ones', () => {
    const viewModeFilter = {
      key: 'nonExistingFilter',
      value: 'value'
    }
    const filters = reducer(initialState, {type: actions.TOGGLE, payload: viewModeFilter, meta: {domain: DOMAIN}})
    expect(filters.calendar.nonExistingFilter).to.equals('value')
  })

  it('should handle DELETE of filters under a domain keeping the existing ones', () => {
    const viewModeFilter = {
      keys: ['viewMode']
    }
    const filters = reducer(initialState, {type: actions.DELETE, payload: viewModeFilter, meta: {domain: DOMAIN}})
    expect(filters.calendar.viewMode).to.equals(undefined)
  })

  it('should handle CLEAR of all filters under a domain', () => {
    const filters = reducer(initialState, {type: actions.CLEAR_DOMAIN, meta: {domain: DOMAIN}})
    expect(filters.calendar).to.equals(undefined)
  })

  it('should handle RESET_UI of all domains', () => {
    const filters = reducer(initialState, {type: actions.RESET_FILTERS, meta: {domain: DOMAIN}})
    expect(filters).to.deep.equals({})
  })

  xit('should handle TOGGLE_IN_KEY of the elements of an object filter under a domain keeping the existing ones', () => {
    const moreCalendarFilters = {
      keyEvents: {2: {}, 6: {}, 7: {}}
    }
    const filters  = reducer(initialState, {type: actions.TOGGLE_IN_KEY, payload: {elements: moreCalendarFilters }, meta: {domain: 'calendar'}})
    expect(Object.keys(filters.calendar.keyEvents).length).to.equals(7)
  })

})
