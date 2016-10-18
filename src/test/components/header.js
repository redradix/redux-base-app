import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Header } from '../../components/views/header'

function setup() {
  const props = {
    title: 'Test running',
    username: 'testuser',
    t: expect.createSpy(),
    logout: expect.createSpy()
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(<Header {...props} />)
  const output = renderer.getRenderOutput()

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

    const [ h1 ] = output.props.children

    expect(h1.type).toBe('h1')
  })

})
