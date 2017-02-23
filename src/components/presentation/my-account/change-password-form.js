import React, { PropTypes, Component } from 'react'
import { reduxForm } from 'redux-form'
import { createValidator, required, samePassword } from 'core/validation'
import ConfirmationMessage from 'components/presentation/confirmation-message'
import Input from 'components/presentation/forms/input'
import { t } from 'core/i18n'

export const fields = ['currentPassword', 'password', 'passwordConfirmation']

const validate = createValidator({
  currentPassword: required,
  password: required,
  passwordConfirmation: samePassword.bind(samePassword, 'password')
})

class ChangePasswordForm extends Component {
  render() {
    const  { handleSubmit, success } = this.props
    return (
      <form onSubmit={handleSubmit} className='inline-form'>
        <div className='g row'>
          <div className='gi one-quarter'>
            <Input name='currentPassword' type='password'
              label={t('my-account.change-password.labels.currentPassword')} />
          </div>
          <div className='gi one-quarter'>
            <Input name='password' type='password'
              label={t('my-account.change-password.labels.password')} />
          </div>
          <div className='gi one-quarter'>
            <Input name='passwordConfirmation' type='password'
              label={t('my-account.change-password.labels.passwordConfirmation')} />
          </div>
          <div className='gi one-quarter'>
            <div className='field'>
              <input type='submit' className='button button-primary button-large' value='Update'/>
            </div>
          </div>
        </div>
        {success ? <ConfirmationMessage text={t('my-account.change-password.success')} /> : null}
        <p className='footnote'>{t('my-account.change-password.footnote')}</p>
      </form>
    )
  }
}

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  success: PropTypes.bool
}

ChangePasswordForm = reduxForm({
  form: 'changePassword',
  validate
})(ChangePasswordForm)

export default ChangePasswordForm
