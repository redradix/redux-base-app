import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addIngredient, editIngredient } from '../actions/action'
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
          <input type="text" placeholder="Cost" {...cost}/>
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

CreateIngredientForm = reduxForm({
  form: 'create-ingredient',
  validate,
  fields: ['name', 'cost', 'stock', 'id']
})(CreateIngredientForm)

class CreateIngredient extends Component {
  onSubmit(ingredient) {
    if (this.props.location.pathname.includes("edit")) {
      return this.props.editIngredient(ingredient)  
    } else {
      return this.props.addIngredient(ingredient)
    }
  }
  render() {
    const { ingredient } = this.props
    return (
      <div>
        <p>Crea el ingrediente que necesites indicando su coste aproximado por Kg y su stock actual</p>
        <CreateIngredientForm onSubmit={this.onSubmit.bind(this)} initialValues={ ingredient }/>
      </div>
    )
  }
}

CreateIngredient.propTypes = {
  ingredient: PropTypes.object,
  addIngredient: PropTypes.func
}

function mapStateToProps(state) {
  const id = parseInt(state.routing.path.split("/")[2])
  if (!id) return {}
  return {
    ingredient: state.ingredients.list.find((e) => {return e.id == id})
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addIngredient, editIngredient }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CreateIngredient)

