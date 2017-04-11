import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createValidator, required, email, samePassword } from 'utils/validation'
import ConfirmationMessage from 'components/presentation/confirmation-message'
import Input from 'components/presentation/forms/input'
import Select from 'components/presentation/forms/select'
import { t } from 'core/i18n'

const roles = ['user', 'admin']

const validate = createValidator({
  name: required,
  surname: required,
  email: [required, email],
  passwordConfirmation: samePassword.bind(samePassword, 'password'),
  role: required
})

class UserForm extends Component {
  render() {
    const { mode, handleSubmit, success } = this.props
    return (
      <form className='short-form' onSubmit={handleSubmit}>
        <div className='g row'>
          <div className='gi one-half'>
            <Input name='name' label={t('my-account.info.labels.name')} />
          </div>
          <div className='gi one-half'>
            <Input name='surname' label={t('my-account.info.labels.surname')} />
          </div>
          <div className='gi one-half'>
            <Input name='email' label={t('my-account.info.labels.email')} readOnly={mode === 'edit'} />
          </div>
          {mode === 'edit' ? (
            <div className='gi one-half'>
              <Input name='currentPassword' type='password' label={t('my-account.info.labels.currentPassword')} readOnly />
            </div>
          ) : null}
          <div className='gi one-half'>
            <Input name='password' type='password' label={t('my-account.info.labels.password')} />
          </div>
          {mode === 'edit' ? (
            <div className='gi one-half'>
              <Input name='passwordConfirmation' type='password' label={t('my-account.info.labels.passwordConfirmation')} />
            </div>
          ) : null}
          <div className='gi one-half'>
            <Select name='role' options={roles} defaultOption={false} label={t('my-account.info.labels.role')} />
          </div>
        </div>
        {success ? <ConfirmationMessage text={t(`my-account.users.${mode}.success`)} /> : null}
        <div className='actions'>
          <a href='/my-account/users' className='button button-flat dark button-large'>
            {t('common.labels.cancel')}
          </a>
          <button type='submit' className='button button-primary button-large'>
            {t(`my-account.users.${mode}.confirm`)}
          </button>
        </div>
      </form>
    )
  }
}

UserForm.propTypes = {
  mode: PropTypes.oneOf(['edit', 'new']).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  success: PropTypes.bool
}

UserForm = reduxForm({ form: 'user', validate })(UserForm)

export default UserForm
