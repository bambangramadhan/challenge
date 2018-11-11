import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class ProductCard extends Component {
  constructor(props, context) {
    super(props);
    this.handleStar = this.handleStar.bind(this)
  }

  handleStar(rate) {
    if(rate === 1){
      return(
        <div className="star">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
        </div>
      )
    } else if (rate === 2) {
      return(
        <div className="star">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
        </div>
      )
    } else if (rate === 3) {
      return(
        <div className="star">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
        </div>
      )
    } else if (rate === 4) {
      return(
        <div className="star">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star-empty"></span>
        </div>
      )
    } else if (rate === 5) {
      return(
        <div className="star">
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
          <span className="glyphicon glyphicon-star"></span>
        </div>
      )
    }
  }

  render() {
    console.log(this.props.data);
    return(
      <div className="col-lg-3">
      <div className="row view-group">

        <div className="thumbnail card">

        <div className="img-event" >
          <img className="card-img-top" style={{height: 200, width: 276}} src={require('../../img/card.png')} alt="Product" />
        </div>

        <div className="caption card-body">
        <div>
        <h4 className="group card-title inner list-group-item-heading"><b>{this.props.data.title}</b></h4>

        {this.handleStar(this.props.data.rate)}

        <p className="group inner list-group-item-text">{this.props.data.description}</p>
        <br />

        <div className="row">

        <div className="col-xs-12">
          <h3 className="group card-title inner list-group-item-heading">{this.props.data.price},-</h3>
        </div>

        </div>

        <div className="row text-right"><hr />
        <div className="col-xs-12 col-md-12">
          <NavLink type="button" className="btn btn-success" to='/detail'>Detail Item</NavLink>
        </div>

        </div>
        </div>
        </div>

        </div>
        </div>

      </div>

    )
  }
}
