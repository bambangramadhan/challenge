import React, { Component } from 'react'

export default class DetailImage extends Component {

  render() {
    return(
      <img style={{height: 500, width: 650}} src={require('../../img/samsung.jpeg')} alt="product" />
    )
  }
}
