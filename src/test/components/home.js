import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Home from '../../components/home'

function setup() {

  let renderer = TestUtils.createRenderer()
  renderer.render(<Home />)
  let output = renderer.getRenderOutput()

  return {
    output,
    renderer
  }
}

describe('Home', () => {
  it('should render correctly of the most simple component ever', () => {
    const { output } = setup()

    expect(output.type).toBe('div')

  })

})
