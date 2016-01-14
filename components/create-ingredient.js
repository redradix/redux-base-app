import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import {createValidator, required, maxLength, minLength, integer} from '../utils/validation'

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
          error
          } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Name" {...name}/>
          {name.touched && name.error && <div>{name.error}</div>}
        </div>
        <div>
          <label>Cost per Kg</label>
          <input type='number' placeholder="Cost" {...cost}/>
          {cost.touched && cost.error && <div>{cost.error}</div>}
        </div>
        <div>
          <label>Stock</label>
          <input type="number" placeholder="Stock" {...stock}/>
          {stock.touched && stock.error && <div>{stock.error}</div>}
        </div>
        {error && <div>{error}</div>}
        <button disabled={submitting }type='submit' onClick={handleSubmit}>
          {submitting ? <i/> : <i/>} Submit
        </button>
        <button disabled={submitting} onClick={resetForm}>
          Clear Values
        </button>
      </form> 
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

export default CreateIngredientForm
