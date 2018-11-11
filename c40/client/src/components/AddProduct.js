import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as AppActions from '../actions'
import { NavLink } from 'react-router-dom'

class AddProduct extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      title: '',
      rate:'1',
      description:'',
      price:'',
      brand:'',
      dproduct:''
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    var title = this.state.title.trim()
    var rate = this.state.rate.trim()
    var description = this.state.description.trim()
    var price = this.state.price.trim()
    var brand = this.state.brand.trim()
    var dproduct = this.state.dproduct.trim()
    if(!title || !rate || !description || !price || !brand || !dproduct){
      return;
    }
    this.props.actions.addAds(title, parseInt(rate), description, price, brand, dproduct);
    this.setState({title: '', rate:'1', description:'', price:'', brand:'', dproduct:''})
  }

  render(){
    return(
      <div className="panel panel-primary">

        <div className="panel-heading">
          Add Ads
        </div>

        <div className="panel-body">
          <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>

            <div className="form-group">
            <label className="col-sm-2 control-label">Title</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Rate</label>
              <div className="col-sm-10">
                <select className="form-control" name="rate" value={this.state.rate} onChange={this.handleChange.bind(this)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Description</label>
              <div className="col-sm-10">
                <textarea className="form-control" name="description" placeholder="Description" rows="2" value={this.state.description} onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Price</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="price" placeholder="Price" value={this.state.price} onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Brand</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="brand" placeholder="Brand" value={this.state.brand} onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Detail Product</label>
              <div className="col-sm-10">
                <textarea className="form-control" name="dproduct" placeholder="Using Markdown" rows="10" value={this.state.dproduct} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </form>

          <button type="submit" className="btn btn-success col-md-offset-2"> Add</button>&nbsp;
          <NavLink type="button" className="btn btn-warning" to='/'>Cancel</NavLink>

        </div>
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
)(AddProduct)
