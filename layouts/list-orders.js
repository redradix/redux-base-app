import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeOrder, fetchOrders } from '../actions/orders'
import { pushPath } from 'redux-simple-router'
import { Link } from 'react-router'
import { formatDate } from '../utils/utils'

function mapStateToProps(state) {
  return {
    isFetching: state.orders.isFetching,
    list: state.orders.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeOrder, fetchOrders }, dispatch, pushPath)
}

class ListOrders extends Component {
  onRemove(order) {
    this.props.removeOrder(order)  
  }
  render() {
    const { isFetching, list} = this.props
    return (
      <div>
        <span>
          <h1>Lista de orders</h1>

        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching && list.length == 0 && <p>Empty</p>}
          {!isFetching && list.length > 0 && list.map((d, index) =>
            <li key={index}>
              <Link to={`/orders/${d.id}/show`}>Order {d.id} </Link> from {formatDate(d.createdAt)}
              {' '}
              <Link to={`/orders/${d.id}/edit`}>Edit</Link>
              {' '}
              <button onClick={this.onRemove.bind(this, d)}>Remove</button>
            </li>)
          }
        </ul>
      </div>
    )
  }
}

ListOrders.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders)
