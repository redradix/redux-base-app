import React, { Component, PropTypes } from 'react'
import { getDisplayName } from 'utils/react'

const defaultOptions = {
  preventDefault: true, stopPropagation: true, dbClickWindow: 300
}

/**
 * Clickable HOC factory
 * @TODO: This controller should use [the fastclick polyfill](https://github.com/ftlabs/fastclick)
 * since it already uses a timeout to distinguish between single and double taps
 * @version 0.1.0
 * @author Aarón Contreras <aaron@redradix.com> (https://github.com/acontreras89)
 * @param {object} options - Options object with the following accepted properties:
 *        {boolean} preventDefault - Whether preventDefault should be called
 *          on the event object. Defaults to true
 *        {boolean} stopPropagation - Whether stopPropagation should be called
 *          on the event object. Defaults to true
 *        {string|array|function} params - Props to be used as parameters when
 *          calling the onClick method. This can be either:
 *          A string or array of strings indicating the names of the props
 *          to be used as arguments
 *          A function receiving the component's props and returning the array
 *          of arguments
 *        {number} dbClickWindow - Number of milliseconds to wait for
 *          a second click before triggering the single click action. Defaults
 *          to 300
 */
const clickable = (options) => (WrappedComponent) => {
  class Clickable extends Component {
    options = Object.assign({}, defaultOptions, options)
    handleClick = (e) => {
      if (this.options.preventDefault) e.preventDefault()
      if (this.options.stopPropagation) e.stopPropagation()
      const { disabled, onClick, onDoubleClick } = this.props
      if (disabled) return
      let { params } = this.options
      if (typeof params === 'string') params = [ this.props[params] ]
      else if (typeof params === 'function') params = params(this.props)
      else if (Array.isArray(params)) params = params.map(p => this.props[p])
      else params = []

      if (onDoubleClick) {
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
          onDoubleClick(...params)
        } else {
          this.timeout = setTimeout(() => {
            this.timeout = null
            onClick(...params)
          }, this.options.dbClickWindow)
        }
      } else {
        onClick(...params)
      }
    }
    render() {
      // NOTE: Property `disabled` is passed through
      const { onClick, onDoubleClick, ...rest } = this.props
      return (<WrappedComponent {...rest} onClick={this.handleClick} />)
    }
  }
  Clickable.displayName = `Clickable(${getDisplayName(WrappedComponent)})`
  Clickable.propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func,
    disabled: PropTypes.bool
  }
  return Clickable
}

export default clickable
