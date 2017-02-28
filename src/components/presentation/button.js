import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Icon from 'components/presentation/icon'

class Button extends Component {
  handleClick = (e) => {
    const { onClick } = this.props
    e.preventDefault()
    e.stopPropagation()
    onClick(e)
  }
  render() {
    const { children, type, styling, size, loading, icon } = this.props
    const className = this.props.className || cx('button',
      `button-${type}`, `button-${styling}`, `button-${size}`,
      { 'button-loading': loading }
    )
    return (
      <button className={className} onClick={this.handleClick}>
        {children ? <span>{children}</span> : null}
        {loading ? <span className='loading'/> : null}
        {icon ? <Icon type={icon}/> : null}
      </button>
    )
  }
}

Button.defaultProps = {
  children: '',
  type: 'primary',
  styling: 'normal',
  size: 'small',
  loading: false
}

Button.propTypes = {
  className: PropTypes.string, // overrides type, style and size
  children: PropTypes.string,
  type: PropTypes.string.isRequired,
  styling: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  icon: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
