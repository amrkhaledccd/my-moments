import React, { Component } from "react";
import { Empty, List } from "antd";

class PostGrid extends Component {
  state = {};

  componentDidMount = () => {
    this.props.onGetUserPosts();
  };

  render() {
    let content;

    if (this.props.posts === null) {
      content = (
        <Empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          description={<span>No Posts Yet</span>}
        />
      );
    } else {
      content = (
        <List
          grid={{ gutter: 9, column: 3 }}
          dataSource={this.props.posts}
          renderItem={item => (
            <List.Item>
              <img width="293" height="293" alt={item.id} src={item.imageUrl} />
            </List.Item>
          )}
        />
      );
    }
    return content;
  }
}

export default PostGrid;
