import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class AddProduct extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      title: '',
      rate:'',
      description:'',
      price:'',
      brand:'',
      detailproduct:''
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render(){
    return(
      <div className="panel panel-primary">

        <div className="panel-heading">
          Add Ads
        </div>

        <div className="panel-body">
          <form className="form-horizontal">

            <div className="form-group">
            <label className="col-sm-2 control-label">Title</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="title" placeholder="Title" onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Rate</label>
              <div className="col-sm-10">
                <select className="form-control" name="rate" onChange={this.handleChange.bind(this)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Description</label>
              <div className="col-sm-10">
                <textarea className="form-control" name="description" placeholder="Description" rows="2" onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Price</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="price" placeholder="Price" onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Brand</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="brand" placeholder="Brand" onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="form-group">
            <label className="col-sm-2 control-label">Detail Product</label>
              <div className="col-sm-10">
                <textarea className="form-control" name="detailproduct" placeholder="Using Markdown" rows="10" onChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </form>

          <button type="button" className="btn btn-success col-md-offset-2"> Add</button>&nbsp;
          <NavLink type="button" className="btn btn-warning" to='/'>Cancel</NavLink>

        </div>
      </div>
    )
  }
}
