import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getDisplayName } from 'utils/react'
import { triggerConfirmation } from 'modules/confirm'

const defaultOptions = {}

/**
 * Confirmation Trigger HOC factory
 * @version 0.1.0
 * @author Aarón Contreras <aaron@redradix.com> (https://github.com/acontreras89)
 * @param {string|function} actionName - Identifier for the intercepted action
 *          If a function is passed, it will be called with the received arguments
 * @param {function} actionCreator - Action creator used to generate the action
 *          which will be dispatched if confirmed
 * @param {object} options - Options object with the following accepted properties:
 */
const confirmationTrigger = (actionName, actionCreator, options) => (WrappedComponent) => {
  class ConfirmationTrigger extends Component {
    options = Object.assign({}, defaultOptions, options)
    getName = typeof actionName === 'string' ? () => actionName : actionName
    handleClick = (...args) => {
      const { triggerConfirmation } = this.props
      const action = actionCreator(...args)
      const name = this.getName(...args)
      triggerConfirmation(name, action)
    }
    render() {
      const { triggerConfirmation, ...rest } = this.props
      return <WrappedComponent {...rest} onClick={this.handleClick} />
    }
  }
  ConfirmationTrigger.displayName = `ConfirmationTrigger(${getDisplayName(WrappedComponent)})`
  ConfirmationTrigger.propTypes = {
    triggerConfirmation: PropTypes.func.isRequired
  }
  ConfirmationTrigger = connect(void 0, { triggerConfirmation })(ConfirmationTrigger)
  return ConfirmationTrigger
}


export default confirmationTrigger
