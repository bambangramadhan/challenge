import React, { Component } from 'react'
import DataItem from './DataItem'

export default class ListItem extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      name: '',
      phone: ''
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
  }

  render(){
    const {data, actions} = this.props

    var name = this.state.name.trim().toLowerCase()
    var phone = this.state.phone.trim().toLowerCase()

    var filteredData = data
    //si data berasal dari props nya, jika diluar return tidak pake kurawal seperti javascript biasa, tapi kalau di dalam return maka harus pake kurawal
    //kalau tidak pake startwith maka harus mengisikan secara complete

    if(name !== '' && phone !== ''){
      filteredData = data.filter(item => item.name.toLowerCase().startsWith(name) && item.phone.toLowerCase().startsWith(phone))
    }else if (name !== '') {
      filteredData =  data.filter(item => item.name.toLowerCase().startsWith(name))
    }else if (phone !== '') {
      filteredData =  data.filter(item => item.phone.toLowerCase().startsWith(phone))
    }

    let dataNodes = filteredData.map(function(data){
      return(
        <DataItem key={data.id} data={data} {...actions} />
      )
    });

    return(
      <div className="row">
      <div className="panel panel-default">
      <div className="panel-heading">Search Form</div>
      <div className="panel-body">
      <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
      <div className="form-group">
      <label>Name</label>
      <input type="text" className="form-control" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange.bind(this)} />
      </div>
      <div className="form-group">
      <label>Phone</label>
      <input type="text" className="form-control" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange.bind(this)} />
      </div>
      </form>
      </div>
      </div>
      <table className="table table-striped">
      <thead>
      <tr>
      <th>#</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {dataNodes}
      </tbody>
      </table>
      </div>
    )
  }
}
