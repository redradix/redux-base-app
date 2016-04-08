import { createValidator, required } from '../../utils/validation'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import React, { PropTypes, Component } from 'react'
import { translate } from 'react-i18next'


const validate = createValidator({
  username: [required],
  password: [required]
})

export class LoginFormComponent extends Component {
  render() {
    const {
          fields: {username, password},
          handleSubmit,
          submitting,
          error,
          t
        } = this.props
    return (
      <div>
        <p>{t('login.title')}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{t('username')}</label>
            <input type='text' placeholder='username' {...username} />
            {username.touched && username.error && <div>{username.error}</div>}
          </div>
          <div>
            <label>{t('password')}</label>
            <input type='password' placeholder='password' {...password} />
            {password.touched && password.error && <div>{password.error}</div>}
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting} type='submit' onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} {t('submit')}
          </button>
        </form>
        {t('login.goRegister')}<Link to='/register'>{t('login.registerActionCall')}</Link>
      </div>
    )
  }
}

LoginFormComponent.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

const LoginForm = reduxForm({
  form: 'login',
  validate,
  fields: ['username', 'password']
})(LoginFormComponent)

export default translate(['common'])(LoginForm)
