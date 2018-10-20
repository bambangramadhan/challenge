import React, { Component } from 'react';
import ChatList from './chatList';
import ChatForm from './chatForm';
import superagent from 'superagent';
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3001");

export default class ChatBox extends Component {

  state = {
    message: []
  }

  componentDidMount() {
    socket.on("updateList", data => {
      console.log("message baru", data);
      this.setState({ message : data})
    });
  }

  componentWillMount() {
    superagent
    .get('http://localhost:3001/')
    .query(null)
    .set('Accept', 'application/json')
    .end ((error, response)=>{
      const data=response.body
      console.log(JSON.stringify(data));

      this.setState({
        message:data
      })
    })
  }

  addMessage = newItem => {
    superagent
    .post('http://localhost:3001/')
    .send(newItem)
    .set('Accept', 'application/json')
    .end ((error, response)=>{
      socket.emit("addData", newItem);
      this.setState({ message : [...this.state.message, newItem]

      })
    })
  }

  render() {
    return (
      <div className="timeline">
      <div className="line text-muted"></div>
        <ChatList message={this.state.message} />
        <ChatForm addMessage={this.addMessage} />
      </div>
    )
  }
}
