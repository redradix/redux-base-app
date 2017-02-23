import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { login } from 'services/session'
import LoginForm from 'components/composition/login/login-form'
import spinnerWhileCondition from 'components/interaction/spinner-while-condition'
import {getCommState} from 'modules/communication'

const enhance = spinnerWhileCondition(
  props => !!!props.isLogging
)

export class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(credentials) {
    return this.props.login(credentials)
  }
  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogging: getCommState(state, 'login')
  }
}

const mapDispatchToProps = {
  login
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(enhance(Login))
