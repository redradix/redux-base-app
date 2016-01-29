import React, { PropTypes, Component } from 'react'
import {reduxForm} from 'redux-form'
import {createValidator, required, maxLength, minLength, email} from '../utils/validation'

const validate = createValidator({
  username: [required, minLength(2), maxLength(10)],
  email: [required, email],
  password: [required, minLength(2), maxLength(10)]
});

class RegisterForm extends Component {
  render() {
    const {
          fields: {username, email, password},
          handleSubmit,
          submitting,
          error
        } = this.props
    return (
      <form onSubmit={handleSubmit}> 
        <div>
          <label>Username</label>
          <input type="text" placeholder="username" {...username}/>
          {username.touched && username.error && <div>{username.error}</div>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="email" {...email}/>
          {email.touched && email.error && <div>{email.error}</div>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="password" {...password}/>
          {password.touched && password.error && <div>{password.error}</div>}
        </div>
        {error && <div>{error}</div>}
        <button disabled={submitting} type="submit" onClick={handleSubmit}>
          {submitting ? <i/> : <i/>} Submit
        </button>
      </form>
    )
  }  
}

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

RegisterForm = reduxForm({
  form: 'register',
  validate,
  fields: ['username', 'email', 'password']
})(RegisterForm)

export default RegisterForm