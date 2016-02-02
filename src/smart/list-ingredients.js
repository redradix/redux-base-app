import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeIngredient, fetchIngredients } from '../modules/ingredients'
import ListIngredients from '../components/list-ingredients'

function mapStateToProps(state) {
  return {
    isFetching: state.ingredients.isFetching,
    list: state.ingredients.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeIngredient, fetchIngredients }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListIngredients)
