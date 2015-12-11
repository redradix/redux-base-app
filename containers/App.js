import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import Component from '../components/component'
//import * as Actions from '../actions/action'

// The component will subscribe to Redux store updates
function mapStateToProps(state) {
  return {
    prop: state.prop
  }
}
// The component will have available the ActionCreators that you return
function mapDispatchToProps(dispatch) {
  // Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.
  return bindActionCreators(Actions, dispatch)
}

// Connects a React component to a store
// https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
export default connect(mapStateToProps, mapDispatchToProps)(Component)
