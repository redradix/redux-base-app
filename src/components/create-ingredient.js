import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import {createValidator, required, maxLength, minLength, integer} from '../utils/validation'
import { translate } from 'react-i18next/lib'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  cost: [required, integer],
  stock: [required, integer]
});

class CreateIngredientForm extends Component {
  render() {
    const {
          fields: {name, cost, stock, id},
          handleSubmit,
          resetForm,
          submitting,
          error,
          t
          } = this.props
    return (
      <div>
        <p>{t('createIngredient.description')}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{t('createIngredient.nameLabel')}</label>
            <input type="text" placeholder={t('createIngredient.namePlaceholder')} {...name}/>
            {name.touched && name.error && <div>{name.error}</div>}
          </div>
          <div>
            <label>{t('createIngredient.costLabel')}</label>
            <input type='number' placeholder={t('createIngredient.costPlaceholder')} {...cost}/>
            {cost.touched && cost.error && <div>{cost.error}</div>}
          </div>
          <div>
            <label>{t('createIngredient.stockLabel')}</label>
            <input type="number" placeholder={t('createIngredient.stockPlaceholder')} {...stock}/>
            {stock.touched && stock.error && <div>{stock.error}</div>}
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting }type='submit' onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} {t('createIngredient.submitButton')}
          </button>
          <button disabled={submitting} onClick={resetForm}>
            {t('createIngredient.clearForm')}
          </button>
        </form>
      </div>
    )
  }
}

CreateIngredientForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

//TODO: Parse params to manipulate them before sending (parseInt)
CreateIngredientForm = reduxForm({
  form: 'create-ingredient',
  fields: ['name', 'cost', 'stock', 'id']
})(CreateIngredientForm)

export default translate(['common'])(CreateIngredientForm) 
