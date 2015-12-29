import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeIngredient, fetchIngredients } from '../actions/ingredients'
import { pushPath } from 'redux-simple-router'
import { Link } from 'react-router'

function mapStateToProps(state) {
  return {
    isFetching: state.ingredients.isFetching,
    list: state.ingredients.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient, fetchIngredients }, dispatch, pushPath)
}

class ListIngredients extends Component {
  onRemove(ingredient) {
    this.props.removeIngredient(ingredient)  
  }
  componentDidMount() {
    const {list, dispatch} = this.props
    if (list.length == 0) {
      this.props.fetchIngredients()
    }
  }
  render() {
    const { isFetching, list} = this.props
    return (
      <div>
        <span>
          <h1>Lista de productos</h1>

        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching && list.length == 0 && <p>Empty</p>}
          {!isFetching && list.length > 0 && list.map((i, index) =>
            <li key={index}>
              <Link to={`/ingredients/${i.id}/show`}>{i.name}</Link>
              {' '}
              <Link to={`/ingredients/${i.id}/edit`}>Edit</Link>
              {' '}
              <button onClick={this.onRemove.bind(this, i)}>Remove</button>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

ListIngredients.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ListIngredients)
