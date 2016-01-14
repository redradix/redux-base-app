/* Example with selectors */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeDish} from '../actions/dishes'
import { Link } from 'react-router'
import { totalSelector, escandalloSelector } from '../selectors/dishSelectors'

class ShowDish extends Component {
  onRemove() {
    this.props.removeDish(this.props.dish)  
  }
  render() {
    const { dish: {id, name, price }, onRemove, escandallo } = this.props
    return (
      <div>
        <span>
          <h1>Info del plato</h1>
        </span>
        <ul>
          <li><p>{name}</p></li>
          <li><p>{price}</p></li>
          <li><p>{escandallo}</p></li>
        </ul>
        <Link to={`/dishes/${id}/edit/`}>Edit</Link>
        {' '}
        <button onClick={this.onRemove.bind(this)}>Remove</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish }, dispatch)
}

ShowDish.propTypes = {
  dish: PropTypes.object,
  removeDish: PropTypes.func.isRequired
}

export default connect(totalSelector, mapDispatchToProps)(ShowDish)
