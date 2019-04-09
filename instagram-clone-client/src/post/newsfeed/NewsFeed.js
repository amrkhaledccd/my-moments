import React, { Component } from "react";

class NewsFeed extends Component {
  state = { currentUser: { ...this.props.currentUser } };

  componentDidMount = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div>
        <h1>NewsFeed: {this.state.currentUser.username} </h1>
      </div>
    );
  }
}

export default NewsFeed;
