import React, { Component, PropTypes } from 'react'

function getHeadingNode(type) {
  switch (type) {
  case 'alpha':
    return 'h2'
  case 'beta':
    return 'h1'
  case 'gamma':
  case 'delta':
  case 'epsilon':
    return 'h3'
  case 'zeta':
    return 'h4'
  default:
    return 'p'
  }
}

class Heading extends Component {
  render() {
    const { type, children } = this.props
    const Tag = getHeadingNode(type)
    return (
      <Tag className={type}>{children}</Tag>
    )
  }
}

Heading.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Heading
