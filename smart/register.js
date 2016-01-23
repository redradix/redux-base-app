import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { register } from '../actions/auth'

/* Components */
import RegisterForm from '../components/register'

class Register extends Component {
  onSubmit(credentials) {
    return this.props.register(credentials)  
  }
  render() {
    return (
      <div>
        <p>Introduce tus datos para registrarte en DAH</p>
        <RegisterForm onSubmit={this.onSubmit.bind(this)} />
        Si ya estas registrado, <Link to='/Login'>haz login</Link>
      </div>
    )  
  }  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ register }, dispatch)
}

export default connect(null, mapDispatchToProps)(Register)
