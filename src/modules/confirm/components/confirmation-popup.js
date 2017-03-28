import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getDisplayName } from 'utils/react'
import { needsConfirmation, getAction, confirm, cancel } from 'modules/confirm'

const defaultOptions = {}

/**
 * Confirmation Popup HOC factory
 * @version 0.1.0
 * @author Aarón Contreras <aaron@redradix.com> (https://github.com/acontreras89)
 * @param {object} options - Options object with the following accepted properties:
 *
 * @prop {string} actionName - Identifier for action being confirmed
 */
const confirmationPopup = (options) => (WrappedComponent) => {
  class ConfirmationPopup extends Component {
    options = Object.assign({}, defaultOptions, options)
    handleConfirm = () => {
      const { dispatch, action, actionName } = this.props
      dispatch(action)
      dispatch(confirm(actionName))
    }
    handleCancel = () => {
      const { dispatch, actionName } = this.props
      dispatch(cancel(actionName))
    }
    render() {
      // eslint-disable-next-line no-unused-vars
      const { dispatch, needsConfirmation, action, actionName, ...rest } = this.props
      if (!needsConfirmation) return null
      return (
        <WrappedComponent {...rest} onConfirm={this.handleConfirm}
          onCancel={this.handleCancel} />
      )
    }
  }
  ConfirmationPopup.displayName = `ConfirmationPopup(${getDisplayName(WrappedComponent)})`
  ConfirmationPopup.propTypes = {
    dispatch: PropTypes.func.isRequired,
    needsConfirmation: PropTypes.bool.isRequired,
    action: PropTypes.any, // allow any of action (regular actions, thunks...)
    actionName: PropTypes.string.isRequired
  }
  const mapStateToProps = (state, ownProps) => ({
    needsConfirmation: needsConfirmation(state, ownProps.actionName),
    action: getAction(state, ownProps.actionName)
  })
  ConfirmationPopup = connect(mapStateToProps)(ConfirmationPopup)
  return ConfirmationPopup
}

export default confirmationPopup
