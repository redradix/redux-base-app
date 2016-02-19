import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

const devTools = __DEV__ ? React.createFactory(require('../common/dev-tools').default) : () => null


class Landing extends Component {
  render() {
    return (
      <div>
        <div style={{marginTop: '1.5em'}}>{this.props.children}</div>
        {devTools()}
      </div>
    )
  }
}

Landing.propTypes = {
  children: PropTypes.element
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
