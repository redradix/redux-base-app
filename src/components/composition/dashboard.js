import React, { Component, PropTypes } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <main className='main'/>
    )
  }
}

Dashboard.defaultProps = {
  isFixed: false
}

Dashboard.propTypes = {
  isFixed: PropTypes.bool.isRequired
}

export default Dashboard
