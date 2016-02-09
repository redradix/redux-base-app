import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers} from 'redux'
import {reduxForm} from 'redux-form'
import TestUtils from 'react-addons-test-utils'
import LoginForm from '../../components/login'

//is this insane mockup necessary for redux-form?
function setup() {
  const createFakeStore = createStore(
    combineReducers({form: reduxForm}),
    {}
  );
  const props = {
    onSubmit: expect.createSpy(),
    //handleSubmit: expect.createSpy(),
    store: createFakeStore,
    t: expect.createSpy(),
    submitting: false
  }
  const component = TestUtils.renderIntoDocument(<LoginForm {...props} />)
  return {
    component: component,
    props: props,
    buttons: TestUtils.scryRenderedDOMComponentsWithTag(component, 'button'),
    inputs: TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
  }
}

describe('LoginForm component', () => {
  it('should display login button', () => {
    const { buttons, component } = setup()
    console.log(component.refs);
    expect(buttons[0]).toExist();
  })

  it('press button should not call submitHandler until inputs have values', () => {
    const { buttons, props } = setup()
    TestUtils.Simulate.click(buttons[0])
    expect(props.onSubmit).toNotHaveBeenCalled()
  })

  it('press button should call submitHandler now its inputs have values', () => {
    const { buttons, props, component, inputs } = setup()
    console.log('refs',component, component.refs);
    const username = ReactDOM.findDOMNode(component.refs.username);
    inputs[0].value = 'admin';
    inputs[1].value = 'admin';
    TestUtils.Simulate.change(inputs[0].getDOMNode())
    TestUtils.Simulate.change(inputs[1].getDOMNode())
    //TestUtils.Simulate.change(inputs[1], {target: {value: 'admin'}})
    //username.value = 'admin';
    //password.value = 'admin';
    console.log(inputs[0], username, component.refs);
    TestUtils.Simulate.click(buttons[0]);
    expect(props.onSubmit).toHaveBeenCalled()
  })

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
