import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addOrder, editOrder} from '../actions/orders'
import { checkAvailability } from '../actions/ingredients'
import {reduxForm} from 'redux-form'
import {addArrayValue, removeArrayValue } from 'redux-form/lib/actions'
import bindActionData from 'redux-form/lib/bindActionData'
import ElementsToAdd from '../components/elements-to-add'
import ElementsAdded from '../components/elements-added'
import { totalSelector } from '../selectors/orders'
import { getIndice } from '../utils/utils'

class CreateOrderForm extends Component {
  addDishToOrder(id, quantity, name) {
    const orderDish= {id, quantity, name}
    const index = getIndice(id, this.props.values.dishes)
    if (index !== undefined) {this.props.removeDish('dishes', index)}
    this.props.addDish('dishes', orderDish, index == -1 ? undefined : index) 
  }
  removeDishFromOrder(id) {
    const index = getIndice(id, this.props.values.dishes)
    this.props.removeDish('dishes', index)
  }
  render() {
    const {
          fields: {id, dishes},
          totalDishes,
          pvp,
          removeDishFromOrder,
          handleSubmit,
          resetForm,
          submitting,
          error
          } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <ElementsToAdd elements={totalDishes}  add={this.addDishToOrder.bind(this)} subject='dish' />
        <ElementsAdded elements={dishes} totalElements={totalDishes} remove={this.removeDishFromOrder.bind(this)} subject={'dish'}/>
        <div>
          <p>PVP: {pvp || 0}</p>
        </div>
        {error && <div>{error}</div>}
        <button disabled={submitting} type='submit' onClick={handleSubmit}>
          {submitting ? <i/> : <i/>} Submit
        </button>
        <button disabled={submitting} onClick={resetForm}>
          Clear Values
        </button>
      </form> 
    )
  }
}

CreateOrderForm.propTypes = {
    fields: PropTypes.object.isRequired,
    dishes: PropTypes.array,
    pvp: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

CreateOrderForm = reduxForm({
  form: 'create-order',
  fields: ['id',
           'dishes[].name',
           'dishes[].id',
           'dishes[].quantity'
  ]
})(CreateOrderForm)

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

