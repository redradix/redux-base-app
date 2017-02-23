import React, { Component, PropTypes } from 'react'

class Indicator extends Component {
  renderData() {
    const { children } = this.props
    if (!children) return null
    return (
      <span className='data'>{children}</span>
    )
  }
  render() {
    const { type, label, extraInfo } = this.props
    const dataBefore = type !== 'hush'
    return (
      <p className={`${type}-indicator`}>
        {dataBefore ? this.renderData() : null}
        {extraInfo}
        <span>{label}</span>
        {dataBefore ? null : this.renderData()}
      </p>
    )
  }
}

Indicator.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  extraInfo: PropTypes.node,
  children: PropTypes.node
}

export default Indicator
