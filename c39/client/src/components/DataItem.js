import React, { Component } from 'react'


export default class DataItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      name: this.props.data.name || '',
      phone: this.props.data.phone || ''
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleEditClick(){
    this.setState({editing: true})
  }

  handleSave(){
    var name = this.state.name.trim()
    var phone = this.state.phone.trim()
    if(!name || !phone){
      return;
    }
    this.props.editPHoneBook(this.props.data.id, name, phone)
    this.setState({editing: false})
  }

  render(){
    if(this.state.editing){
      return(
        <tr>
        <td>{this.props.data.id}</td>
        <td><input type="text" name="name" className="form-control" placeholder="name" value={this.state.name} onChange={this.handleChange.bind(this)} /></td>
        <td><input type="text" name="phone" className="form-control" placeholder="phone" value={this.state.phone} onChange={this.handleChange.bind(this)} /></td>
        <td><button type="button" className="btn btn-primary" onClick={this.handleSave.bind(this)}><span className="glyphicon glyphicon-folder"></span> save</button></td>
        </tr>
      )
    }else {
      return(
        <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.phone}</td>
        <td>
        <button type="button" className="btn btn-success" onClick={this.handleEditClick.bind(this)}><span className="glyphicon glyphicon-pencil"></span> edit</button>&nbsp;
        <button type="button" className="btn btn-danger" onClick={() => this.props.deletePHoneBook(this.props.data.id)}><span className="glyphicon glyphicon-trash"></span> delete</button>
        </td>
        </tr>
      )
    }
  }

}
