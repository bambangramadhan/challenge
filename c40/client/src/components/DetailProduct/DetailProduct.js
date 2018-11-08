import React, { Component } from 'react'
import DetailImage from './DetailImage'
import DetailItem from './DetailItem'
import DetailSpec from './DetailSpec'

export default class DetailProduct extends Component {

  render() {
    return(
      <div className="container">

        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <DetailImage />
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <DetailItem />
              </div>
            </div>
          </div>

        </div>
        <br /><br />


        <DetailSpec />
      </div>
    )
  }
}
