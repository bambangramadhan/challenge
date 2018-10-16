import React, { Component } from 'react';

export default class Chats extends Component {

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

            {this.props.forms.map(form => {
              <div className="timeline-heading">
                  <h4 className="timeline-title">{form.name}</h4>
              </div>

              <div className="timeline-body">
                  {form.text}
              </div>

            })}


        </article>
        </div>
        </div>
    )
  }
}
