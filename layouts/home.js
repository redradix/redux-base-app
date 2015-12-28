import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <div>
      <h3>Home</h3>
      <p><Link to="/ingredients">Ingredients</Link>
      {' '}
      <Link to="/ingredients/create">Create ingredient</Link></p>

      <p><Link to="/dishes">Dishes</Link>
      {' '}
      <Link to="/dishes/create">Create dish</Link></p>

      <p><Link to="/orders">Orders</Link>
      {' '}
      <Link to="/orders/create">Create order</Link></p>
    </div>
  );
}

export default Home
