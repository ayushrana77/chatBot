import React, { Component } from "react";
import Avatar from "./Avatar";

export default class ChatItem extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.2s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
        </div>
        <Avatar image={this.props.image} />
      </div>
    );
  }
}
