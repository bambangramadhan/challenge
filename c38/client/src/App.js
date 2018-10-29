import React, { Component } from 'react';
import './App.css';
import {Well} from 'react-bootstrap';
import ChatBox from './components/chatBox';

class App extends Component {

  render() {
    return (
      <div className="container">
      <div className="timeline">
        <Well><h1><center>React Chat</center></h1></Well>
        <ChatBox />
      </div>
      </div>
    );
  }
}



export default App;
