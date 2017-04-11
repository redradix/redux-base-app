import React, { Component, PropTypes } from 'react'
import BackButton from 'components/presentation/back-button'
import Heading from 'components/presentation/heading'
import UserForm from 'components/presentation/my-account/user-form'
import { t } from 'core/i18n'

class UserFormLayout extends Component {
  handleSubmit = data => {
    const { mode, createUser, updateUser } = this.props
    mode === 'edit' ? updateUser(data) : createUser(data)
  }
  render() {
    const { mode, initialValues, isUserCreated } = this.props
    // NOTE: Hack to get disabled password input to display some dots
    if (mode === 'edit') initialValues.currentPassword = 'xxxxxxxx'
    return (
      <div className='account-contents wrapper'>
        <BackButton href='/my-account/users' label={t('my-account.users.back')} />
        <Heading type='gamma'>{t(`my-account.users.${mode}.title`)}</Heading>
        <UserForm onSubmit={this.handleSubmit} success={isUserCreated}
          initialValues={initialValues} mode={mode} />
      </div>
    )
  }
}

UserFormLayout.propTypes = {
  mode: PropTypes.oneOf(['edit', 'new']).isRequired,
  isUserCreated: PropTypes.bool,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  })
}

export default UserFormLayout
