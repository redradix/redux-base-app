import React from 'react'

const SpinnerOverlay = () => {
  return (
    <div className='overlay'>
      <div className='loading-container is-shown'>
        <div className='loading'>
          <img alt='loading' src='/images/loading.gif'/>
        </div>
      </div>
    </div>
  )
}

export default SpinnerOverlay

