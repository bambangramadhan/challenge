import React, { Component } from 'react'
import ProductCard from './ProductCard'
import { NavLink } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../../actions'

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.loadProducts();
  }


  render() {
    
    let dataNodes = this.props.data.map(function(data){
      return(
        <ProductCard key={data.id} data={data} />
      )
    });

    return(
      <div className="container">
      <br />
      <NavLink to='/add' type="button" className="btn btn-primary">Add Ads</NavLink>
      <br /><br />

      {dataNodes}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    data: state.data
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
