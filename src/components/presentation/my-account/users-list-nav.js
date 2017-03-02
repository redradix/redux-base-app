import React, { Component, PropTypes } from 'react'
import Button from 'components/presentation/button'

class UsersListNav extends Component {
  handleNext = () => this.props.fetchPage(this.props.pageNumber - 1)
  handlePrev = () => this.props.fetchPage(this.props.pageNumber + 1)
  render() {
    const { pageNumber, total } = this.props
    // FIXME: This should not go here
    const lastPage = Math.ceil(total / 3) - 1
    return (
      <div className='users-list-nav'>
        <Button className='soft-button highlight' icon='arrow-right'
          onClick={this.handleNext} disabled={!pageNumber} />
        <span>{`Page ${pageNumber + 1}`}</span>
        <Button className='soft-button highlight' icon='arrow-left'
          onClick={this.handlePrev} disabled={pageNumber === lastPage} />
      </div>
    )
  }
}

UsersListNav.defaultProps = {
  pageNumber: 0,
  total: 0
}

UsersListNav.propTypes = {
  fetchPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default UsersListNav
