import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import ElementsToAdd from '../components/elements-to-add'
import ElementsAdded from '../components/elements-added'
import { getIndice } from '../utils/utils'
import { translate } from 'react-i18next/lib'


class CreateOrderForm extends Component {
  addDishToOrder(id, amount, name) {
    const orderDish= {id, amount, name}
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
          error,
          t
          } = this.props
    return (
      <div>
        <p>{t('createOrder.description')}</p>
        <p></p>
        <form onSubmit={handleSubmit}>
          <ElementsToAdd elements={totalDishes}  add={this.addDishToOrder.bind(this)} subject='dish' />
          <ElementsAdded elements={dishes} totalElements={totalDishes} remove={this.removeDishFromOrder.bind(this)} subject={'dish'}/>
          <div>
            <p>{t('createOrder.pvp')}: {pvp || 0}</p>
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting} type='submit' onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} {t('createOrder.submitButton')}
          </button>
          <button disabled={submitting} onClick={resetForm}>
            {t('createOrder.clearForm')}
          </button>
        </form>
      </div>
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
           'dishes[].amount'
  ]
})(CreateOrderForm)

export default translate(['common'])(CreateOrderForm) 
