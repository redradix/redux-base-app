import React, { Component, PropTypes } from 'react'
import Heading from 'components/presentation/heading'
import InfoField from 'components/presentation/my-account/info-field'
import ChangePasswordForm from 'components/presentation/my-account/change-password-form'
import { t } from 'core/i18n'

class Info extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(password) {
    const { email, setPassword } = this.props
    return setPassword({ ...password, email })
  }
  render() {
    const { name, surname, email, role, isPasswordChanged } = this.props
    return (
      <div className='account-contents wrapper'>
        <Heading type='gamma'>{t('my-account.title')}</Heading>
        <div className='data-list account g row'>
          <InfoField label={t('my-account.info.labels.name')} value={name} />
          <InfoField label={t('my-account.info.labels.surname')} value={surname} />
          <InfoField label={t('my-account.info.labels.email')} value={email} />
          <InfoField label={t('my-account.info.labels.role')} value={role} />
        </div>
        <Heading type='gamma'>{t('my-account.change-password.title')}</Heading>
        <ChangePasswordForm onSubmit={this.handleSubmit} success={isPasswordChanged}/>
      </div>
    )
  }
}

Info.defaultProps = {
  isPasswordChanged: false
}

Info.propTypes = {
  setPassword: PropTypes.func.isRequired,
  isPasswordChanged: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
}

export default Info
