import React, { PropTypes, Component } from 'react'

export default class ListDishes extends Component {
  render() {
    const { isFetching, list} = this.props
    return (
      <div>
        <span>
          <h1>Lista de platos</h1>

        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching && list.length == 0 && <p>Empty</p>}
          {!isFetching && list.length > 0 && list.map((d, index) =>
            <li key={index}>
              <Link to={`/dishes/${d.id}/show`}>{d.name}</Link>
              {' '}
              <Link to={`/dishes/${d.id}/edit`}>Edit</Link>
              {' '}
              <button onClick={this.props.removeDish.bind(this, d)}>Remove</button>
            </li>)
          }
        </ul>
      </div>
    )  
  }  
}
