import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeOrder} from '../actions/orders'
import { Link } from 'react-router'
// Example with reselect
import { totalSelector, escandalloSelector } from '../selectors/orders'
import { formatDate } from "../utils/utils"


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeOrder }, dispatch)
}

class ShowOrder extends Component {
  onRemove() {
    this.props.removeOrder(this.props.order)  
  }
  render() {
    const { order: { id, createdAt}, pvp, isFetching } = this.props
    return (
      <div>
        <span>
          <h1>Info de la comanda</h1>
        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching &&  
            <div>
              <li><p>Order {id}</p></li>
              <li><p>{formatDate(createdAt)}</p></li>
              <li><p>{pvp}</p></li>
            </div>
          }
        </ul>
        <Link to={`/orders/${id}/edit/`}>Edit</Link>
        {' '}
        <button onClick={this.onRemove.bind(this)}>Remove</button>
      </div>
    )
  }
}

ShowOrder.propTypes = {
  order: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  removeOrder: PropTypes.func.isRequired
}

export default connect(totalSelector, mapDispatchToProps)(ShowOrder)
