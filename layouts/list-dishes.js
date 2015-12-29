import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeDish, fetchDishes } from '../actions/dishes'
import { pushPath } from 'redux-simple-router'
import { Link } from 'react-router'

function mapStateToProps(state) {
  return {
    isFetching: state.dishes.isFetching,
    list: state.dishes.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish, fetchDishes }, dispatch, pushPath)
}

class ListDishes extends Component {
  onRemove(dish) {
    this.props.removeDish(dish)  
  }
  componentDidMount() {
    const {list, dispatch} = this.props
    if (list.length == 0) {
      this.props.fetchDishes()
    }
  }
  render() {
    const { isFetching, list} = this.props
    return (
      <div>
        <span>
          <h1>Lista de platos</h1>

        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching && list.length == 0 && <p>Empty</p>}
          {!isFetching && list.length > 0 && list.map((d, index) =>
            <li key={index}>
              <Link to={`/dishes/${d.id}/show`}>{d.name}</Link>
              {' '}
              <Link to={`/dishes/${d.id}/edit`}>Edit</Link>
              {' '}
              <button onClick={this.onRemove.bind(this, d)}>Remove</button>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

ListDishes.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDishes)
