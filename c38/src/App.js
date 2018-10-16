import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Panel, Button, Jumbotron, Well, FormGroup, FormControl} from 'react-bootstrap';
import Remarkable from 'remarkable';

class App extends React.Component {
  state = {
    value: ''
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  }


  render() {
    return (


      <div className="container">


      <Well><h1><center>React Chat</center></h1></Well>
      <div className="timeline">
      <div className="line text-muted"></div>

      <article className="panel panel-primary">


            <div className="panel-heading icon">
                <i className="glyphicon glyphicon-minus"></i>
            </div>

            <div className="timeline-heading">
                <h4 className="timeline-title">Bambang</h4>
            </div>

            <div className="timeline-body">
                Some new content has been added.
            </div>

        </article>
        <article className="panel panel-default">

            <div className="panel-heading icon">
                <i className="glyphicon glyphicon-plus"></i>
            </div>

            <div className="panel-body">
            <form>
              <FormGroup
                controlId="formBasicText"
              >
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="your name"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              </FormGroup>
            </form>
            <FormGroup controlId="formControlsTextarea">
              <FormControl componentClass="textarea" placeholder="write your chat here..." />
            </FormGroup>

            <button className="btn btn-primary">Post</button>
            </div>

        </article>

      </div>
      </div>
    );
  }
}


export default App;
