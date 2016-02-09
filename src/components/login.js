import {createValidator, required} from '../utils/validation'
import { Link } from 'react-router'
import {reduxForm} from 'redux-form'
import React, { PropTypes, Component } from 'react'
import { translate, Interpolate } from 'react-i18next/lib';


const validate = createValidator({
  username: [required],
  password: [required]
});

class LoginForm extends Component {
  render() {
    const {
          fields: {username, password},
          handleSubmit,
          submitting,
          error,
          t
        } = this.props
    const registerComponent = <Link to='/register'>{t('login.registerActionCall')}</Link>
    return (
      <div>
        <p>{t('login.title')}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{t('username')}</label>
            <input type="text" placeholder="username" {...username} ref="username"/>
            {username.touched && username.error && <div>{username.error}</div>}
          </div>
          <div>
            <label>{t('password')}</label>
            <input type="password" placeholder="password" {...password} ref="password"/>
            {password.touched && password.error && <div>{password.error}</div>}
          </div>
          {error && <div>{error}</div>}
          <button disabled={submitting} type="submit" onClick={handleSubmit}>
            {submitting ? <i/> : <i/>} {t('submit')}
          </button>
        </form>
        {/*<Interpolate parent='p' i18nKey='login.goRegister' component={registerComponent} />*/}
      </div>
    )
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

LoginForm = reduxForm({
  form: 'login',
  validate,
  fields: ['username', 'password']
})(LoginForm)

//export default translate(['common'])(LoginForm);
export default LoginForm;
