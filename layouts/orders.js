import React, { PropTypes, Component } from 'react'

const Orders  = React.createClass({
  render() {
    return (
      <div>
        {this.props.children || "No children"}
      </div>
    )
  }
})

export default Orders 
