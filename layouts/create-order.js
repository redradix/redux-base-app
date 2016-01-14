import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import bindActionData from 'redux-form/lib/bindActionData'

/* Selectors */
import { totalSelector } from '../selectors/orders'

/* Actions */
import { addOrder, editOrder} from '../actions/orders'
import { checkAvailability } from '../actions/ingredients'
import {addArrayValue, removeArrayValue } from 'redux-form/lib/actions'

/* Components */
import CreateOrderForm from '../components/create-order'

class CreateOrder extends Component {
  onSubmit(order) {
    return this.props.checkAvailability(order)  
    .then(() => {
      if (this.props.location.pathname.includes("edit")) {
        return this.props.editOrder(order)  
      } else {
        return this.props.addOrder(order)
      }
    })
  }
  render() {
    const { order, dishes, pvp,  addArrayValue, removeArrayValue } = this.props
    return (
      <div>
        <p>Crea la comanda indicando la lista de platos</p>
        <CreateOrderForm onSubmit={this.onSubmit.bind(this)} initialValues={ order } totalDishes={dishes}  removeDish={removeArrayValue} pvp={pvp} addDish={addArrayValue}/>
      </div>
    )
  }
}

CreateOrder.propTypes = {
  order: PropTypes.object,
  dishes: PropTypes.array,
  pvp: PropTypes.number,
  addOrder: PropTypes.func,
  editOrder: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  const data = {form: "create-order", key: ""}
  const bindedAddArrayValue = bindActionData(addArrayValue, data)
  const bindedRemoveArrayValue = bindActionData(removeArrayValue, data)
  return bindActionCreators({ addOrder, editOrder, addArrayValue: bindedAddArrayValue, removeArrayValue: bindedRemoveArrayValue, checkAvailability }, dispatch)
}

export default connect(
  totalSelector,
  mapDispatchToProps
)(CreateOrder)

