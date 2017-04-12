import reducer from '../index'
import * as actions from '../action-types'

describe('UI- reducer', () => {
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

  it('should handle MERGE of ui elements under a domain keeping the existing ones', () => {
    const moreCalendarUIElements= {
      showBankHolidays: false
    }
    const ui = reducer(initialState, {type: actions.MERGE, payload: {elements: moreCalendarUIElements}, meta: {domain: DOMAIN}})
    expect(Object.keys(ui.calendar).length).to.equals(4)
  })

  it('should handle TOGGLE of ui elements under a domain keeping the existing ones', () => {
    const viewModeUIElement = {
      key: 'viewMode'
    }
    const ui = reducer(initialState, {type: actions.TOGGLE, payload: viewModeUIElement, meta: {domain: DOMAIN}})
    expect(ui.calendar.viewMode).to.equals(undefined)
  })

  it('should handle TOGGLE of UI element under a domain keeping the existing ones', () => {
    const viewModeUIElement = {
      key: 'nonExistingUIElement'
    }
    const ui = reducer(initialState, {type: actions.TOGGLE, payload: viewModeUIElement, meta: {domain: DOMAIN}})
    expect(ui.calendar.nonExistingUIElement).to.equals(true)
  })

  it('should handle TOGGLE of ui element under a domain keeping the existing ones', () => {
    const viewModeUIElement = {
      key: 'nonExistingUIElement',
      value: 'value'
    }
    const ui = reducer(initialState, {type: actions.TOGGLE, payload: viewModeUIElement, meta: {domain: DOMAIN}})
    expect(ui.calendar.nonExistingUIElement).to.equals('value')
  })

  it('should handle DELETE of ui element under a domain keeping the existing ones', () => {
    const viewModeUIElement = {
      keys: ['viewMode']
    }
    const ui = reducer(initialState, {type: actions.DELETE, payload: viewModeUIElement, meta: {domain: DOMAIN}})
    expect(ui.calendar.viewMode).to.equals(undefined)
  })

  it('should handle CLEAR of all ui element under a domain', () => {
    const ui = reducer(initialState, {type: actions.CLEAR_DOMAIN, meta: {domain: DOMAIN}})
    expect(ui.calendar).to.equals(undefined)
  })

  it('should handle RESET_UI of all domains', () => {
    const ui = reducer(initialState, {type: actions.RESET_UI, meta: {domain: DOMAIN}})
    expect(ui).to.deep.equals({})
  })

  xit('should handle TOGGLE_IN_KEY of the elements of an object ui element under a domain keeping the existing ones', () => {
    const moreCalendarUIElements = {
      keyEvents: {2: {}, 6: {}, 7: {}}
    }
    const ui = reducer(initialState, {type: actions.TOGGLE_IN_KEY, payload: {elements: moreCalendarUIElements}, meta: {domain: 'calendar'}})
    expect(Object.keys(ui.calendar.keyEvents).length).to.equals(7)
  })

})
