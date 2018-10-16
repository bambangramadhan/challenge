import React, { Component } from 'react';
import Chats from './chats';

export default class ChatBox extends Component {
  state = {
    value: ''
  }

handleChange = e => {
  this.setState({ value: e.target.value });
}

sendMessage = () => {

}

  render() {
    return (
      <Chats
      key={}
      />
      <div className="container">
        <div className="timeline">
        <div className="line text-muted"></div>

          <article className="panel panel-primary">

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

                </FormGroup>
              </form>
              <FormGroup controlId="formControlsTextarea">
              <FormControl componentClass="textarea" placeholder="write your chat here..." />
              </FormGroup>

              <button className="btn btn-primary" onCLick={this.sendMessage}>Post</button>
            </div>
          </article>
        </div>
      </div>
    )
  }
}
