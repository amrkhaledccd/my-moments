import React, { Component } from "react";
import { Empty, List } from "antd";

class PostGrid extends Component {
  state = {};

  componentDidMount = () => {
    this.props.onGetUserPosts();
  };

  render() {
    if (!Array.isArray(this.props.posts) || !this.props.posts.length) {
      return (
        <Empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          description={<span>No Posts Yet</span>}
        />
      );
    }

    return (
      <div>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={this.props.posts}
          renderItem={item => (
            <List.Item>
              <img width="293" height="293" alt={item.id} src={item.imageUrl} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default PostGrid;
