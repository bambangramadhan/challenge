import React, { Component } from 'react'
import Product from './Product'


export default class ProductCard extends Component {

  render() {
    return(
      <div className="row view-group">

        <div className="item col-lg-3">
        <div className="thumbnail card">

        <div className="img-event" >
          <img className="card-img-top" style={{height: 200, width: 252}} src={require('../../img/card.png')} alt="Product" />
        </div>

        <div className="caption card-body">
          <Product />
        </div>

        </div>
        </div>

      </div>

    )
  }
}
