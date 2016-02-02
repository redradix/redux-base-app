/* Example with selectors */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeDish} from '../modules/dishes'
import { totalSelector, escandalloSelector } from '../modules/dishes/selectors'
import ShowDish from '../components/show-dish'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish }, dispatch)
}

export default connect(totalSelector, mapDispatchToProps)(ShowDish)
