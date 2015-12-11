import React, { Component, PropTypes } from 'react'

class Comp extends Component {
  render() {
    const { prop, action, conditionalAction, asyncAction } = this.props
    return (
      <p>
        Prop: {prop} 
        {' '}
        <button onClick={action}>action</button>
        {' '}
        <button onClick={conditionalAction}>conditional action</button>
        {' '}
        <button onClick={() => asyncAction()}>conditional action</button>
        {' '}
      </p>
    )
  }
}

Comp.propTypes = {
  action: PropTypes.func.isRequired,
  asyncAction: PropTypes.func.isRequired,
  conditionalAction: PropTypes.func.isRequired,
  prop: PropTypes.number.isRequired
}

export default Comp 

