import React, { Component } from 'react'
import ProductCard from './ProductCard'
import { NavLink } from 'react-router-dom'

export default class ProductList extends Component {

  render() {
    return(
      <div className="container">
      <br />
      <NavLink to='/add' type="button" className="btn btn-primary">Add Ads</NavLink>
      <br /><br />

      <ProductCard />

      </div>
    )
  }
}
