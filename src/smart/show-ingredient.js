import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeIngredient } from '../modules/ingredients'
import ShowIngredient from '../components/show-ingredient'

function mapStateToProps(state) {
  debugger
  const id = state.routing.location.pathname.split("/")[2]
  return {
    ingredient: state.ingredients.list.find((e) => {return e.id == id})
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowIngredient)
