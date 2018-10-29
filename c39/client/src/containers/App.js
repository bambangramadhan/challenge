import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import InputData from '../components/InputData'
import ListItem from '../components/ListItem'
import * as AppActions from '../actions'

class App extends Component {
  componentDidMount(){
    this.props.actions.loadPHoneBooks();
  }

  render(){
    const {data, actions} = this.props
    return(
      <div className="container">
      <div className="row">
      <div className="well text-center"><h1>Phone Book Apps</h1></div>
      </div>
      <div className="row">
      <InputData name="" phone="" onSave={actions.addPHoneBook} />
      </div>
      <ListItem data={data} actions={actions} />
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
)(App)
