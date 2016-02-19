import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {Header} from '../../components/common/header'

function setup() {
  let props = {
    t: expect.createSpy(),
    logout: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Header {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('Header', () => {
  it('should render correctly', () => {
    const { output } = setup()

    expect(output.type).toBe('header')

    let [ h1, a ] = output.props.children

    expect(h1.type).toBe('h1')
  })

})
