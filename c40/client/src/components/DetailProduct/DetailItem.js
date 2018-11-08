import React, { Component } from 'react'

export default class DetailItem extends Component {

  render() {
    return(
        <div className="panel panel-default">
          <div className="panel-body">

            <h2><b>Samsung Galaxy S4</b></h2>
            <p style={{color: 'blue'}}><b>Brand Samsung</b> · <small>(2332 votes)</small></p><br />
            <p><small>PRICE</small></p>
            <h2><b>Rp.3.990.000,-</b></h2>
          </div>

          <div className="panel-footer">
            <p><small>COLOR</small></p>

            <p><small>CAPACITY</small></p>
            <div className="attr2">16 GB</div>
            <div className="attr2">32 GB</div>

            <p><small>QTY</small></p>
            <div className="btn-minus"><span className="glyphicon glyphicon-minus"></span></div>
            <input value="1" />
            <div className="btn-plus"><span className="glyphicon glyphicon-plus"></span></div>

            <button className="btn btn-success btn-lg btn-block"><span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Buy</button>
            <h6 style={{color: 'blue'}}><span className="glyphicon glyphicon-heart-empty"></span> Like</h6>
            </div>
        </div>
    )
  }
}
