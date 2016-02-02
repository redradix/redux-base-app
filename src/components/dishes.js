import React, { PropTypes, Component } from 'react'

const Dishes = React.createClass({
  render() {
    return (
      <div>
        {this.props.children || "No children"}
      </div>
    )
  }
})

export default Dishes
