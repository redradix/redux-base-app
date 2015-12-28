import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeIngredient } from '../actions/action'
import { Link } from 'react-router'

function mapStateToProps(state) {
  const id = parseInt(state.routing.path.split("/")[2])
  return {
    ingredient: state.ingredients.list.find((e) => {return e.id == id})
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient }, dispatch)
}

class ShowIngredient extends Component {
  onRemove() {
    this.props.removeIngredient(this.props.ingredient)  
  }
  render() {
    const { ingredient: {id, name, cost, stock }, onRemove } = this.props
    return (
      <div>
        <span>
          <h1>Info del ingrediente</h1>
        </span>
        <ul>
          <li><p>{name}</p></li>
          <li><p>{cost}</p></li>
          <li><p>{stock}</p></li>
        </ul>
        <Link to={`/ingredients/${id}/edit/`}>Edit</Link>
        {' '}
        <button onClick={this.onRemove.bind(this)}>Remove</button>
      </div>
    )
  }
}

ShowIngredient.propTypes = {
  ingredient: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowIngredient)
