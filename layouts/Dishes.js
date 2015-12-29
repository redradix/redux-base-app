import React, { PropTypes, Component } from 'react'

const Dishes = React.createClass({
  render() {
    return (
      <div>
        <h2>Dishes</h2>
        {this.props.children || "No children"}
      </div>
    )
  }
})

export default Dishes 
