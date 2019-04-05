import React, { Component } from "react";

class NewsFeed extends Component {
  state = {};

  componentDidMount = () => {
    console.log("inside newsfeed: " + this.props.isAuthenticated);
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  };

  render() {
    return <h1>NewsFeed: </h1>;
  }
}

export default NewsFeed;
