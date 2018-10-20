import React, { Component } from 'react';
import Chats from './chats';

class ChatList extends Component {

  render() {
    return (
      <div className="timeline">
      {this.props.message.map(item => (
        <Chats
        key={item.id}
        name={item.name}
        chat={item.chat}
        message={this.props.message}
        />
      ))}
      </div>
    );
  }
}



export default ChatList;
