import React, { PropTypes, Component } from 'react'

const Orders  = React.createClass({
  render() {
    return (
      <div>
        <h2>Orders</h2>
        {this.props.children || "No children"}
      </div>
    )
  }
})

export default Orders 
