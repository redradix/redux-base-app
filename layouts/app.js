import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { pushPath } from 'redux-simple-router'


class App extends Component {
  render() {
    return (
      <div>
        <header>
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/ingredients">Ingredients</Link>
          {' '}
          <Link to="/dishes">Dishes</Link>
          {' '}
          <Link to="/orders">Orders</Link>
        </header>
        <div>
          <button onClick={() => pushPath('/dishes')}>Go to /dishes</button>
        </div>
        <div style={{marginTop: '1.5em'}}>{this.props.children}</div>
      </div>
    );
    
  }
}

export default App 

