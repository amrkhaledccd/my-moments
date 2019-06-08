import React, { Component } from "react";
import { Avatar, Card, Icon, Input, List } from "antd";
import "./postlist.css";

class PostList extends Component {
  state = { currentUser: { ...this.props.currentUser } };

  getPostRender = item => {
    return (
      <List.Item className="post-list-item ">
        <Card bodyStyle={{ padding: 0 }} className="post-card">
          <div className="post-user-container">
            <Avatar src={item.userPic} className="post-user-avatar-circle" />
            <span className="post-username">{item.username}</span>
          </div>
          <div>
            <img alt="postId" className="post-img" src={item.imageUrl} />
          </div>
          <div className="post-actions">
            <Icon type="heart" />
            <Icon type="message" />
            <Icon type="upload" />
            <Icon type="book" className="post-action-book" />
          </div>
          <div className="comment-input-container">
            <Input placeholder="Add comment" />
          </div>
        </Card>
      </List.Item>
    );
  };

  render() {
    const data = [
      {
        username: "mosalah",
        imageUrl:
          "http://amr-hp-probook-450-g2:8000/images/amrkhaled/ed03dc30-26fa-4298-bfff-c3557ac32523.jpg",
        userPic:
          "http://amr-hp-probook-450-g2:8000/images/mosalah/7935f63b-d2b5-430e-9f7c-9cfd9a33f49e.jpg"
      },
      {
        username: "nicole",
        imageUrl:
          "http://amr-hp-probook-450-g2:8000/images/nicole/3a9aaeb4-0266-473a-a10c-399fcde6da0c.jpg",
        userPic:
          "http://amr-hp-probook-450-g2:8000/images/nicole/18baff93-6511-470c-852e-e39cd0d900ae.png"
      },
      {
        username: "josefrakich",
        imageUrl:
          "http://amr-hp-probook-450-g2:8000/images/josefrakich/2fdf2d8a-89ff-4f92-8adf-b2f79366e161.jpg",
        userPic:
          "http://amr-hp-probook-450-g2:8000/images/josefrakich/7f164a1f-4afa-4814-84b7-43b1578d071b.jpg"
      }
    ];

    return (
      <List
        dataSource={data}
        renderItem={item => this.getPostRender(item)}
        split={false}
      />
    );
  }
}

export default PostList;
