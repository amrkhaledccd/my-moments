import React, { Component } from "react";
import "./newpost.css";
import { Drawer } from "antd";

class NewPost extends Component {
  state = {};
  render() {
    return (
      <Drawer
        title="Create a new post"
        width={500}
        onClose={this.props.onClose}
        visible={this.props.visible}
      >
        Hello
      </Drawer>
    );
  }
}

export default NewPost;
