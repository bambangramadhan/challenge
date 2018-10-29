import React, { Component } from 'react';


export default class InputData extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      adding: false,
      name: this.props.name || '',
      phone: this.props.phone || ''
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleAddClick(){
    this.setState({adding: true})
  }

  handleCancelClick(){
    this.setState({adding: false})
  }

  handleSubmit(e){
    e.preventDefault();
    var name = this.state.name.trim();
    var phone = this.state.phone.trim();
    if(!name || !phone){
      return;
    }
    this.props.onSave(name, phone);
    this.setState({name: '', phone: '', adding: false})
  }

  render(){
    if(this.state.adding){
      return(
        <div className="panel panel-default">
        <div className="panel-heading">Adding Form</div>
        <div className="panel-body">
        <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="form-group">
        <label>Phone</label>
        <input type="text" className="form-control" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange.bind(this)} />&nbsp;
        </div>
        <button type="submit" className="btn btn-success"><span className="glyphicon glyphicon-ok-circle"> save</span></button>&nbsp;
        <button type="button" className="btn btn-warning" onClick={this.handleCancelClick.bind(this)}><span className="glyphicon glyphicon-ban-circle"> cancel</span></button>
        </form>
        </div>
        </div>
      )
    }else {
      return(
        <button type="button" style={{'marginTop': '15px', 'marginBottom': '25px'}} className="btn btn-primary" onClick={this.handleAddClick.bind(this)}><span className="glyphicon glyphicon-plus"></span> add</button>
      )
    }
  }
}
