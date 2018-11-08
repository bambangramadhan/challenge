import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class Product extends Component {

  render() {
    return(
      <div>
        <h4 className="group card-title inner list-group-item-heading"><b>Product Title</b></h4>

        <span className="glyphicon glyphicon-star"></span>
        <span className="glyphicon glyphicon-star"></span>
        <span className="glyphicon glyphicon-star"></span>
        <span className="glyphicon glyphicon-star"></span>
        <span className="glyphicon glyphicon-star"></span>

        <p className="group inner list-group-item-text">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.</p>

        <div className="row">

        <div className="col-xs-12 col-md-6">
          <h3 className="group card-title inner list-group-item-heading">Rp.3.990.000</h3>
        </div>

        </div>

        <div className="row text-right"><hr />
        <div className="col-xs-12 col-md-12">
          <NavLink type="button" className="btn btn-success" to='/detail'>Detail Item</NavLink>
        </div>

        </div>
      </div>
    )
  }
}
