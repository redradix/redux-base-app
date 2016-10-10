import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { register } from 'modules/auth'

/* Components */
import RegisterForm from 'views/register'

class Register extends Component {
  handleSubmit(credentials) {
    return this.props.register(credentials)
  }
  render() {
    return (
      <RegisterForm onSubmit={this.handleSubmit.bind(this)} />
    )
  }
}

const mapDispatchToProps = { register }

Register.propTypes = {
  register: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Register)
