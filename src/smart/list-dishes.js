import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeDish, fetchDishes } from '../modules/dishes'
import { Link } from 'react-router'

// Components
import ListDishes from '../components/list-dishes'


function mapStateToProps(state) {
  return {
    isFetching: state.dishes.isFetching,
    list: state.dishes.list
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeDish, fetchDishes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDishes)
