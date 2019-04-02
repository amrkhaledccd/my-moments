import React, { Component } from "react";

class NewsFeed extends Component {
  state = {};

  componentDidMount = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  };

  render() {
    return <h1>This is NewsFeed</h1>;
  }
}

export default NewsFeed;
