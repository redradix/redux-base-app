import React, {Component, PropTypes}  from 'react'
import { connect } from 'react-redux'
import spinnerWhileCondition from 'components/interaction/spinner-while-condition'
import { isAppReady } from 'services/app'
import Header from 'components/presentation/header'
import Footer from 'components/presentation/footer'
import {getUsername, getRole} from 'services/session'

const enhance = spinnerWhileCondition(
  props => {
    return !!props.isAppReady
  }
)

class AppContext extends Component {
  render() {
    const { username, role, children } = this.props
    return (
      <div className='outer-wrapper'>
        <Header username={username} role={role}/>
        {children}
        <Footer/>
      </div>
    )
  }
  threshold = undefined
}

AppContext.propTypes = {
  children: PropTypes.element.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    username: getUsername(state),
    role: getRole(state),
    isAppReady: isAppReady(state)
  }
}

export default connect(mapStateToProps)(enhance(AppContext))
