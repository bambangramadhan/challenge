import React, { Component } from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';


class ChatForm extends Component {
  state = {
    name: "",
    chat: ""
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name.length && !this.state.chat.length) {
      return;
    }
    const newItem = {
      name: this.state.name,
      chat: this.state.chat,
      id: Date.now()
    };
    this.props.addMessage(newItem)
    this.setState(state => ({
      name: "",
      chat: ""
    }));
  }

  render() {
    return (
      <article className="panel panel-primary">

        <div className="panel-heading icon">
          <i className="glyphicon glyphicon-plus"></i>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              controlId="formBasicText"
            >
            <FormControl
              name="name"
              type="text"
              value={this.state.name}
              placeholder="your name"
              onChange={e => this.handleChange(e)}
            />

            </FormGroup>

          <FormGroup controlId="formControlsTextarea">
          <FormControl
            name="chat"
            componentClass="textarea"
            value={this.state.chat}
            onChange={e => this.handleChange(e)}
            placeholder="write your chat here..."
          />
          </FormGroup>

          <button className="btn btn-primary">Post</button>
          </form>
        </div>
      </article>
    );
  }
}



export default ChatForm;
