import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'
import { createValidator, required, email} from 'core/validation'
import { t } from 'core/i18n'
import { hasLocalStorage } from 'core/utils'
import Input from 'components/presentation/forms/input'
import HeaderMin from 'components/presentation/header-min'
import Footer from 'components/presentation/footer'

const validate = createValidator({
  email: [required, email],
  password: [required]
})

const localStorage = hasLocalStorage()

export class LoginFormComponent extends Component {
  render() {
    const {
          handleSubmit,
          submitting,
          error
        } = this.props
    return (
      <div className='outer-wrapper login'>
        <HeaderMin />
        <main className='main'>
          <div className='login-form-box'>
            <h1 className='title'>{t('app.title')}</h1>
            <form className='login-form' onSubmit={handleSubmit}>
              {error && <p className='global-error'>{error}</p>}
              {!localStorage && <p className='global-error'>{t('noLocalStorage')}</p>}
              <Input name='email' type='email' placeholder='email' label='email' autoFocus/>
              <Input name='password' type='password' placeholder='password' label='password'/>
              <input disabled={!localStorage || submitting} className='submit button button-primary' type='submit' value='SIGN IN' onClick={handleSubmit} />
            </form>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

LoginFormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
}

const LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginFormComponent)

export default LoginForm
