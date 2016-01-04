import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addDish, editDish} from '../actions/dishes'
import {reduxForm} from 'redux-form'
import {addArrayValue, removeArrayValue } from 'redux-form/lib/actions'
import bindActionData from 'redux-form/lib/bindActionData'
import {createValidator, required, maxLength, minLength, integer} from '../utils/validation'
import ElementsToAdd from '../components/elements-to-add'
import ElementsAdded from '../components/elements-added'
import { totalSelector } from '../selectors/dishSelectors'

const validate = createValidator({
  name: [required, minLength(5), maxLength(10)],
  pvp: [required, integer]
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
          fields: {name, cost, pvp, id, ingredients  },
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
          <label>PVP</label>
          <input type="integer" placeholder="PVP" {...pvp}/>
          {pvp.touched && pvp.error && <div>{pvp.error}</div>}
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
           'pvp', 
           'id',
           'ingredients[].name',
           'ingredients[].id',
           'ingredients[].quantity'
  ]
})(CreateDishForm)

class CreateDish extends Component {
  onSubmit(dish) {
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editDish(dish)  
    } else {
      return this.props.addDish(dish)
    }
  }
  render() {
    const { dish, ingredients, escandallo,  addArrayValue, removeArrayValue } = this.props
    return (
      <div>
        <p>Crea el plato indicando su lista de ingredientes, nombre y pvp</p>
        <CreateDishForm onSubmit={this.onSubmit.bind(this)} initialValues={ dish } totalIngredients={ingredients}  removeIngredient={removeArrayValue} escandallo={escandallo} addIngredient={addArrayValue}/>
      </div>
    )
  }
}

CreateDish.propTypes = {
  dish: PropTypes.object,
  ingredients: PropTypes.array,
  escandallo: PropTypes.number,
  addDish: PropTypes.func,
  editDish: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  const data = {form: "create-dish", key: ""}
  const bindedAddArrayValue = bindActionData(addArrayValue, data)
  const bindedRemoveArrayValue = bindActionData(removeArrayValue, data)
  return bindActionCreators({ addDish, editDish, addArrayValue: bindedAddArrayValue, removeArrayValue: bindedRemoveArrayValue }, dispatch)
}

export default connect(
  totalSelector,
  mapDispatchToProps
)(CreateDish)

