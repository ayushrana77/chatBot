import React, { Component } from "react";

export default class Avatar extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={this.props.image} alt="#" />
        </div>
      </div>
    );
  }
}
