import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../actions/auth'

/* Components */
import LoginForm from '../components/login'

class Login extends Component {
  onSubmit(credentials) {
    return this.props.login(credentials)  
  }
  render() {
    return (
      <div>
        <p>Introduce tus datos de acceso</p>
        <LoginForm onSubmit={this.onSubmit.bind(this)} />
        Si no estas registrado, <Link to='/register'>registrate</Link>
      </div>
    )  
  }  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
