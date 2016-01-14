import React, { PropTypes, Component } from 'react'
import {createValidator, required, maxLength, minLength, integer} from '../utils/validation'
import ElementsToAdd from '../components/elements-to-add'
import ElementsAdded from '../components/elements-added'
import {reduxForm} from 'redux-form'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  price: [required, integer]
});

class CreateDishForm extends Component {
  addIngredientToDish(id, quantity, name) {
    const dishIngredient = {id, quantity, name}
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
          <label>price</label>
          <input type="integer" placeholder="price" {...price}/>
          {price.touched && price.error && <div>{price.error}</div>}
        </div>
        <ElementsToAdd subject='ingredient' elements={totalIngredients}  add={this.addIngredientToDish.bind(this)} />
        <ElementsAdded subject='ingredient' elements= {ingredients} totalElements={totalIngredients} remove={this.removeIngredientFromDish.bind(this)}/>
        <div>
          <p>Escandallo: {escandallo || 0}</p>
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
           'ingredients[].quantity'
  ]
})(CreateDishForm)

export default CreateDishForm
