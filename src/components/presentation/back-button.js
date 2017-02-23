import React, { PropTypes } from 'react'
import Icon from 'components/presentation/icon'

const BackButton = ({ label, href }) => (
  <a href={href} className='back-button'>
    <Icon type='right' />
    <span>{label}</span>
  </a>
)

BackButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default BackButton
