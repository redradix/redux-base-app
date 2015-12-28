import React, { PropTypes, Component } from 'react'

const Ingredients = React.createClass({
  render() {
    return (
      <div>
        <h2>Ingredients</h2>
        {this.props.children || "No children"}
      </div>
    )
  }
})

export default Ingredients
