import React, { Component } from 'react';
import Remarkable from 'remarkable'

export default class Chats extends Component {

  getBadgeClasses() {
    let classes = "panel panel-";
    if(this.props.message.length === 1 || this.props.message.length === 4 || this.props.message.length === 7 || this.props.message.length === 10){classes += "primary"}
    if(this.props.message.length === 2 || this.props.message.length === 5 || this.props.message.length === 8 || this.props.message.length === 11){classes += "success"}
    if(this.props.message.length === 3 || this.props.message.length === 6 || this.props.message.length === 9 || this.props.message.length === 12){classes += "warning"}
    if(this.props.message.length >= 13){classes += "danger"}
    return classes;
  }

  getRawMarkup(msg) {
   const md = new Remarkable();
   return { __html: md.render(msg) };
 }

  render() {

    return (
        <div className="timeline">

        <article className={this.getBadgeClasses()}>

              <div className="panel-heading icon">
                  <i className="glyphicon glyphicon-minus"></i>
              </div>

              <div className="panel-heading">
                  <h4 className="panel-title">{this.props.name}</h4>
              </div>

              <div className="panel-body">
                  <p dangerouslySetInnerHTML={this.getRawMarkup(this.props.chat)}></p>
              </div>

          </article>

        </div>

    )
  }
}
