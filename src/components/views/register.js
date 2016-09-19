import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import { createValidator, required, maxLength, minLength } from '../../utils/validation'
import { translate } from 'react-i18next'

const validate = createValidator({
  username: [required, minLength(2), maxLength(10)],
  password: [required, minLength(2), maxLength(10)]
})

export class RegisterFormComponent extends Component {
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
        <p>{t('register.title')}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{t('username')}</label>
            <input type='text' placeholder={t('username')} {...username}/>
            {username.touched && username.error && <div>{username.error}</div>}
          </div>
          <div>
            <label>{t('password')}</label>
            <input type='password' placeholder={t('password')} {...password}/>
            {password.touched && password.error && <div>{password.error}</div>}
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting} type='submit' onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} {t('submit')}
          </button>
        </form>
        {t('register.goLogin')}<Link to='/Login'>{t('register.loginActionCall')}</Link>
      </div>
    )
  }
}

RegisterFormComponent.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

const RegisterForm = reduxForm({
  form: 'register',
  validate,
  fields: ['username', 'password']
})(RegisterFormComponent)

export default translate(['common'])(RegisterForm)
