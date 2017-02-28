import React, { PropTypes, Component } from 'react'
import Heading from 'components/presentation/heading'
import Button from 'components/presentation/button'
import Icon from 'components/presentation/icon'
import { t } from 'core/i18n'

class Popup extends Component {
  render() {
    const { title, message, confirmLabel, cancelLabel, icon,
            onConfirm, onCancel } = this.props
    return (
      <div className='popup popup-clipped is-shown has-actions left'>
        <Heading type='gamma'>
          {icon ? <Icon type={icon} /> : null}
          {title}
        </Heading>
        <p>{message}</p>
        <div className='actions'>
          <Button type='secondary' styling='flat' size='small' onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type='primary' styling='flat' size='small' onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    )
  }
}

Popup.defaultProps = {
  confirmLabel: t('common.labels.confirm'),
  cancelLabel: t('common.labels.cancel')
}

Popup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default Popup
