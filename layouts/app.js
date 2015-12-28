import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DevTools from '../containers/DevTools'


function Header({title}) {
  return (
    <div>
      <header>
        <h1>{title}</h1>
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/ingredients">Ingredients</Link>
        {' '}
        <Link to="/dishes">Dishes</Link>
        {' '}
        <Link to="/orders">Orders</Link>
      </header>
    </div>
  );  
}

Header.propTypes = {
  title: PropTypes.string  
}

function App({children}) {
  return (
    <div>
      <Header title={"DAH"} >
      </Header>
      <div style={{marginTop: '1.5em'}}>{children}</div>
      <DevTools/>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element  
}

export default App 

