import React, { PropTypes, Component } from 'react'
import {createValidator, required, maxLength, minLength, integer} from '../utils/validation'
import ElementsToAdd from '../components/elements-to-add'
import ElementsAdded from '../components/elements-added'
import {reduxForm} from 'redux-form'
import { translate } from 'react-i18next/lib'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  price: [required, integer]
});

class CreateDishForm extends Component {
  addIngredientToDish(id, amount, name) {
    const dishIngredient = {id, amount, name}
    const index = this.props.values.ingredients.reduce((acc, i, index) => {
      return i.id == id ? index : acc
    }, undefined)
    if (index !== undefined) {this.props.removeIngredient('ingredients', index)}
    this.props.addIngredient('ingredients', dishIngredient, index == -1 ? undefined : index)
  }
  removeIngredientFromDish(id) {
    const index = this.props.values.ingredients.reduce((acc, i, index) => {
      return i.id == id ? index : acc
    }, undefined)
    this.props.removeIngredient('ingredients', index)
  }
  render() {
    const {
          fields: {name, cost, price, id, ingredients  },
          totalIngredients,
          escandallo,
          removeIngredientFromDish,
          handleSubmit,
          resetForm,
          submitting,
          error,
          t
          } = this.props
    return (
      <div>
        <p>{t('createDish.description')}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{t('createDish.nameLabel')}</label>
            <input type="text" placeholder={t('createDish.namePlaceholder')} {...name}/>
            {name.touched && name.error && <div>{name.error}</div>}
          </div>
          <div>
            <label>{t('createDish.priceLabel')}</label>
            <input type="integer" placeholder={t('createDish.pricePlaceholder')} {...price}/>
            {price.touched && price.error && <div>{price.error}</div>}
          </div>
          <ElementsToAdd subject='ingredient' elements={totalIngredients}  add={this.addIngredientToDish.bind(this)} />
          <ElementsAdded subject='ingredient' elements= {ingredients} totalElements={totalIngredients} remove={this.removeIngredientFromDish.bind(this)}/>
          <div>
            <p>{t('createDish.escandallo')}: {escandallo || 0}</p>
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting }type='submit' onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} {t('createDish.submitButton')}
          </button>
          <button disabled={submitting} onClick={resetForm}>
            {t('createDish.clearForm')}
          </button>
        </form>
      </div>
    )
  }
}

CreateDishForm.propTypes = {
    fields: PropTypes.object.isRequired,
    ingredients: PropTypes.array,
    escandallo: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

CreateDishForm = reduxForm({
  form: 'create-dish',
  validate,
  fields: ['name',
           'price',
           'id',
           'ingredients[].name',
           'ingredients[].id',
           'ingredients[].amount'
  ]
})(CreateDishForm)

export default translate(['common'])(CreateDishForm) 
