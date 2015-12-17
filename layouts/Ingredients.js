import React, { Component, PropTypes } from 'react'

class Ingredients extends Component {
  componentWillReceiveProps() {
    
  }
  componentDidMount() {
    const {dispatch} = this.props
    this.props.fetchIngredients()
  }
  render() {
    console.log("props: ", this.props)
    const { isFetching, list} = this.props
    return (
      <div>
        <span>
          <h1>Lista de productos</h1>

        </span>
        <ul>
          {isFetching && <p>Loading...</p>}
          {!isFetching && list.length == 0 && <p>Empty</p>}
          {!isFetching && list.length > 0 && list.map((p, i) =>
            <li key={i}><a href="#">{p.name}</a></li>)
          }
        </ul>
      </div>
    )
  }
}

Ingredients.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  list: PropTypes.array.isRequired
}

export default Ingredients
