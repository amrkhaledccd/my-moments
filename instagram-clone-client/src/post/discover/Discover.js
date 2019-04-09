import React, { Component } from "react";

class Discover extends Component {
  state = { currentUser: { ...this.props.currentUser } };
  render() {
    return <h1>Discover: {this.state.currentUser.username}</h1>;
  }
}

export default Discover;
