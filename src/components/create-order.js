import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import ElementsToAdd from '../components/elements-to-add'
import ElementsAdded from '../components/elements-added'
import { getIndice } from '../utils/utils'
import { translate } from 'react-i18next/lib'
import Autocomplete from 'react-autocomplete'
import { matchStateToTerm, sortItems, styles } from '../utils/components/autocomplete'


class CreateOrderForm extends Component {
  addDishToOrder() {
    const {id,  name} = this.props.selectedAutocompleteItem
    const amount = parseInt(this.refs.amount.value, 10)
    const index = getIndice(id, this.props.values.dishes)
    if (index !== undefined) {this.props.removeDish('dishes', index)}
    this.props.addDish('dishes', {id, name, amount }, index == -1 ? undefined : index)
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
          selectedAutocompleteItem,
          selectItemOnAutocomplete,
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
          <div>
            <label>{t('createOrder.dishes')}</label>
            <Autocomplete 
              initialValue={selectedAutocompleteItem ? selectedAutocompleteItem.name : ""}
              items={totalDishes} 
              shouldItemRender={ matchStateToTerm }
              sortItems={sortItems}
              onSelect={(value, item) => {
                selectItemOnAutocomplete({ref: "create-order", item})
              }}
              getItemValue={(item) => item.name} 
              renderItem={(item, isHighlighted) => (
                <div
                  style={isHighlighted ? styles.highlightedItem : styles.item}
                  key={item.id}
                >{item.name}</div>
              )}
            />
            <input ref="amount" type="integer" placeholder={t('createOrder.amountPlaceholder')} />
            <input type="button" value="Add" onClick={this.addDishToOrder.bind(this)} />
          </div>
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
    selectItemOnAutocomplete: PropTypes.func.isRequired,
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
