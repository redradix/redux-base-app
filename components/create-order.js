import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import ElementsToAdd from '../components/elements-to-add'
import ElementsAdded from '../components/elements-added'


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

export default CreateOrderForm
