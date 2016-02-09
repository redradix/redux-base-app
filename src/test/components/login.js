import expect from 'expect'
import React from 'react'
import { createStore, combineReducers} from 'redux'
import {reduxForm} from 'redux-form'
import TestUtils from 'react-addons-test-utils'
import LoginForm from '../../components/login'

//is this right?
function setup() {
  const initialState= {logged: false};
  const createFakeStore = createStore(
    combineReducers({form: reduxForm}),
    initialState
  );
  const props = {
    onSubmit: expect.createSpy(),
    store: createFakeStore,
    t: expect.createSpy(),
    submitting: false
  }
  const component = TestUtils.renderIntoDocument(<LoginForm {...props} />)
  return {
    component: component,
    props: props,
    buttons: TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
  }
}

describe('LoginForm component', () => {
  it('should display login button', () => {
    const { buttons } = setup()
    expect(buttons[0]).toExist();
  })

  //it('first button should call increment', () => {
  //  const { buttons, actions } = setup()
  //  TestUtils.Simulate.click(buttons[0])
  //  expect(actions.increment).toHaveBeenCalled()
  //})

  //it('second button should call decrement', () => {
  //  const { buttons, actions } = setup()
  //  TestUtils.Simulate.click(buttons[1])
  //  expect(actions.decrement).toHaveBeenCalled()
  //})

  //it('third button should call incrementIfOdd', () => {
  //  const { buttons, actions } = setup()
  //  TestUtils.Simulate.click(buttons[2])
  //  expect(actions.incrementIfOdd).toHaveBeenCalled()
  //})

  //it('fourth button should call incrementAsync', () => {
  //  const { buttons, actions } = setup()
  //  TestUtils.Simulate.click(buttons[3])
  //  expect(actions.incrementAsync).toHaveBeenCalled()
  //})
})
